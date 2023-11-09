"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBool = exports.getEmailFromSms = exports.isEmpty = void 0;
/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
const isEmpty = (value) => {
    if (value === null) {
        return true;
    }
    else if (typeof value !== 'number' && value === '') {
        return true;
    }
    else if (typeof value === 'undefined' || value === undefined) {
        return true;
    }
    else if (value !== null &&
        typeof value === 'object' &&
        !Object.keys(value).length) {
        return true;
    }
    else {
        return false;
    }
};
exports.isEmpty = isEmpty;
function getMailFromSmsVCB(data) {
    try {
        const one = data.split('.CT')[0];
        const two = one.split('.');
        if (two.length == 6) {
            return `${two[3]}.${two[4].replace(' ', '@')}.${two[5]}`;
        }
        return `${two[3].replace(' ', '@')}.${two[4]}`;
    }
    catch (error) {
        return null;
    }
}
function getMailFromSmsMBB(data) {
    try {
        const one = data.split('; tai Napas')[0];
        const two = one.split(' ');
        if (two.length == 6) {
            return `${two[2]}.${two[3]}@${two[4]}.${two[5]}`;
        }
        return `${two[2]}@${two[3]}.${two[4]}`;
    }
    catch (error) {
        return null;
    }
}
function getMailForm3(data) {
    try {
        const emailRegex = /\S+@\S+/;
        const email = data.match(emailRegex);
        return email[0];
    }
    catch (error) {
        return null;
    }
}
const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
function getEmailFromSms(data) {
    switch (true) {
        case regexEmail.test(getMailFromSmsVCB(data)):
            return getMailFromSmsVCB(data);
        case regexEmail.test(getMailFromSmsMBB(data)):
            return getMailFromSmsMBB(data);
        case regexEmail.test(getMailForm3(data)):
            return getMailForm3(data);
        default:
            return null;
    }
}
exports.getEmailFromSms = getEmailFromSms;
/**
 * @method parseBool
 * @param {any} data
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
const parseBool = (data) => {
    return data == 'true' ? true : false;
};
exports.parseBool = parseBool;
//# sourceMappingURL=util.js.map