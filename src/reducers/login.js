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
} from '../actions/index';

initialState = {
    idEmployee: null,
    levelAccess: null,
    loading: false,
    error: null
};

const login = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOGIN_BEGIN:
            return {
                ...state,
                loading: true
            };

        case GET_LOGIN_FOUND:
            return {
                ...state,
                loading: false,
                idEmployee: action.idEmployee,
                levelAccess: action.levelAccess
            };

        case GET_LOGIN_NOT_FOUND:
            return {
                ...state,
                loading: false,
                idEmployee: null,
                levelAccess: null
            };

        case ERROR_GET_LOGIN_IN:
            return {
                ...state,
                loading: false,
                idEmployee: '',
                levelAccess: null,
                error: action.error
            };

        case ERROR_GET_LOGIN_BLANK:
            return {
                ...state,
                loading: false,
                idEmployee: null,
                levelAccess: null,
                error: action.error
            };

        case DO_LOGIN_BEGIN:
            return {
                ...state,
                loading: true
            };

        case DO_LOGIN_VALID:
            return {
                ...state,
                loading: false,
                idEmployee: action.idEmployee,
                levelAccess: action.levelAccess
            };

        case DO_LOGIN_NOT_VALID:
            return {
                ...state,
                loading: false,
                idEmployee: null,
                levelAccess: null
            };

        case ERROR_DO_LOGIN:
            return {
                ...state,
                loading: false,
                idEmployee: null,
                levelAccess: null,
                error: action.error
            };

        case DO_LOGOUT_BEGIN:
            return {
                ...state,
                loading: true
            };

        case DO_LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                idEmployee: null,
                levelAccess: null
            };

        case ERROR_DO_LOGOUT:
            return {
                ...state,
                loading: false,
                idEmployee: null,
                levelAccess: null,
                error: action.error
            };

        default:
            return state;
    }
};

export default login;