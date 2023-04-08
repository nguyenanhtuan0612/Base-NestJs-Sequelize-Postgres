import { Injectable } from '@nestjs/common';
import { RegisterDto } from '@/dtos/users.dto';
import { UsersService } from './users.service';
import { errors } from '@/utils/errors';
import { User } from '@/entities/users.entity';
import { compare, genSalt, hash } from 'bcrypt';
import { ExceptionWithMessage } from '@/exceptions/HttpException';
import { LoginDto, LoginWithOTPDto } from '@/dtos/login.dto';
import { authConfigs } from '@/config';
import { pick } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import twilio from 'twilio';
import twilioConfigs from '@/config/twilio.configs';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto) {
        const check = await this.userService.findUserExits(registerDto);

        if (check)
            throw new ExceptionWithMessage(
                errors.USER_EXITS.detail,
                400,
                errors.USER_EXITS.code,
                'Register Fail',
            ); // error
        const user = new User();
        user.phoneNumber = registerDto.phoneNumber;
        const salt = await genSalt(10);
        user.password = await hash(registerDto.password, salt);
        const userData = await user.save();
        return userData;
    }

    async validateUser(loginDto: LoginDto) {
        try {
            const user = await this.userService.findUserExits(loginDto);
            if (user.active === false) {
                throw new ExceptionWithMessage(
                    errors.USER_NOT_ACTIVE.detail,
                    400,
                    errors.USER_NOT_ACTIVE.code,
                );
            }
            if (!user.password) {
                throw new ExceptionWithMessage(
                    errors.INCORRECT_INFO.detail,
                    400,
                    errors.INCORRECT_INFO.code,
                );
            }
            if (user) {
                const compareResult = await compare(
                    loginDto.password,
                    user.password,
                );
                if (compareResult) return user;
            }
        } catch (error) {
            throw error;
        }
    }

    async generateJwtToken(user: any) {
        const payload = {
            phoneNumber: user.phoneNumber,
            sub: user.id,
        };
        const tokenExpiresIn = authConfigs().jwtExpiresIn;

        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: tokenExpiresIn,
        });
        const _user = pick(user, ['id', 'phoneNumber', 'active']);
        const result = {
            ..._user,
            accessToken,
            expiresIn: tokenExpiresIn,
        };
        return result;
    }

    async generateOTP(body: { phoneNumber: string }) {
        try {
            let user = await User.findOne({
                where: {
                    phoneNumber: body.phoneNumber,
                },
            });
            if (!user) {
                user = new User();
                user.phoneNumber = body.phoneNumber;
            }
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpired = new Date();
            otpExpired.setMinutes(otpExpired.getMinutes() + 5);
            user.otp = otp;
            user.otpTime = otpExpired.getTime().toString();
            const twilioClient = twilio(
                twilioConfigs().twilioAccountSid,
                twilioConfigs().twilioAccountToken,
            );
            // replace first 0 with +84
            const phoneNumber = body.phoneNumber.replace(/^0/, '+84');
            await twilioClient.messages.create({
                body: `Your OTP is ${otp}`,
                from: twilioConfigs().twilioPhoneNumber,
                to: phoneNumber,
            });
            await user.save();

            return { suscess: true };
        } catch (error) {
            throw error;
        }
    }

    async loginNotPass(loginDto: LoginWithOTPDto) {
        try {
            const anonUser = await this.userService.findUserExits(loginDto);
            if (!anonUser) {
                new ExceptionWithMessage(
                    errors.FILTER_INVALID.detail,
                    400,
                    errors.FILTER_INVALID.code,
                );
            }
            if (anonUser.active === false) {
                throw new ExceptionWithMessage(
                    errors.USER_NOT_ACTIVE.detail,
                    400,
                    errors.USER_NOT_ACTIVE.code,
                );
            }
            if (loginDto.otp != anonUser.otp) {
                throw new ExceptionWithMessage(
                    errors.INCORRECT_INFO.detail,
                    400,
                    errors.INCORRECT_INFO.code,
                );
            }

            if (anonUser.otpTime < new Date().getTime().toString()) {
                throw new ExceptionWithMessage(
                    errors.OTP_EXPIRED.detail,
                    400,
                    errors.OTP_EXPIRED.code,
                );
            }
            anonUser.otp = null;
            anonUser.otpTime = null;
            await anonUser.save();
            return anonUser;
            // time now to compare with otp expired timestamp
        } catch (error) {
            throw error;
        }
    }
}
