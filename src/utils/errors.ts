import { HttpException } from '@exceptions/HttpException';
export const errorHandler = (error: HttpException) => {
    try {
        const message: string = error.message || 'Something went wrong';
        const code: number = error.code || 999;
        const detail: string = error.detail || '';
        return { code, message, detail };
    } catch (error) {
        return { code: 999, message: 'Something went wrong', detail: '' };
    }
};

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
    LOGIN_ERROR: {
        code: 4,
    },
    EMAIL_EXIST: {
        code: 5,
        detail: '{{email.isAlreadeExist}}',
        message: 'Register Fail',
    },
};
