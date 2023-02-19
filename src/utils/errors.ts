export const errors = {
    FILTER_INVALID: {
        detail: '{{filter.inValid}}',
        code: 1,
    },
    ORDER_INVALID: {
        detail: '{{order.inValid}}',
        code: 2,
    },
    INVALIDATION_FAIL: {
        code: 3,
    },

    LOGIN_ERROR_UNAUTHORIZE: {
        detail: '{{token.unAuthorize}}',
        code: 4,
    },
    OTP_EXPIRED: {
        detail: '{{otp.isExpired}}',
        code: 10,
    },
    INCORRECT_INFO: {
        detail: '{{user.incorrectInfo}}',
        code: 9,
    },

    USER_NOT_ACTIVE: {
        detail: '{{user.notActive}}',
        code: 8,
    },

    USER_EXITS: {
        code: 5,
        detail: '{{user.isAlreadyExist}}',
    },
    LOGIN_ERROR_MISSING: {
        detail: '{{token.isMissing}}',
        code: 6,
    },
    SEQUELIZE_ERROR: {
        code: 7,
        detail: '{{sequelize.error}}',
    },
    NOT_FOUND: {
        detail: '{{notFound}}',
        code: 44,
    },
};
