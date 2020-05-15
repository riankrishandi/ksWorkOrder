import {
    GET_LOGIN_BEGIN,
    GET_LOGIN_FOUND,
    GET_LOGIN_NOT_FOUND,
    ERROR_GET_LOGIN_IN,
    ERROR_GET_LOGIN_BLANK,
    DO_LOGIN_BEGIN,
    DO_LOGIN_VALID,
    DO_LOGIN_NOT_VALID,
    ERROR_DO_LOGIN,
    DO_LOGOUT_BEGIN,
    DO_LOGOUT_SUCCESS,
    ERROR_DO_LOGOUT
} from '../index';

export const getLoginBegin = () => ({
    type: GET_LOGIN_BEGIN
});

export const getLoginFound = (idEmployee, levelAccess) => ({
    type: GET_LOGIN_FOUND,
    idEmployee,
    levelAccess
});

export const getLoginNotFound = () => ({
    type: GET_LOGIN_NOT_FOUND
});

export const errorGetLoginIn = (error) => ({
    type: ERROR_GET_LOGIN_IN,
    error
});

export const errorGetLoginBlank = (error) => ({
    type: ERROR_GET_LOGIN_BLANK,
    error
});

export const doLoginBegin = () => ({
    type: DO_LOGIN_BEGIN
});

export const doLoginValid = (idEmployee, levelAccess) => ({
    type: DO_LOGIN_VALID,
    idEmployee,
    levelAccess
});

export const doLoginNotValid = () => ({
    type: DO_LOGIN_NOT_VALID
});

export const errorDoLogin = (error) => ({
    type: ERROR_DO_LOGIN,
    error
});

export const doLogoutBegin = () => ({
    type: DO_LOGOUT_BEGIN
});

export const doLogoutSuccess = () => ({
    type: DO_LOGOUT_SUCCESS
});

export const errorDoLogout = (error) => ({
    type: ERROR_DO_LOGOUT,
    error
});