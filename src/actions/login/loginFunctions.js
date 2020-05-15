import axios from 'axios';
import DeviceInfo, { getUniqueId } from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';

import {
    getLoginBegin,
    getLoginFound,
    getLoginNotFound,
    errorGetLoginIn,
    errorGetLoginBlank,
    doLoginBegin,
    doLoginValid,
    doLoginNotValid,
    errorDoLogin,
    doLogoutBegin,
    doLogoutSuccess,
    errorDoLogout
} from './loginActions';
import {
    setLoginStatus,
    removeLoginStatus
} from '../../Auth';

let idDevice = DeviceInfo.getUniqueId();
const LOGIN_STATUS = 'LOGIN_STATUS';

export function getLogin() {
    let body = {
        idDevice: idDevice
    };
    let address = "http://localhost:3000/api/login/";
    return async dispatch => {
        dispatch(getLoginBegin());
        var loginStatus = await AsyncStorage.getItem(LOGIN_STATUS);
        return axios.post(address, body).then(
            (res) => {
                if (res.data.success == 1) {
                    if (loginStatus != null) {
                        let idEmployee = res.data.data.id_employee;
                        let levelAccess = res.data.data.level_access;
                        dispatch(getLoginFound(idEmployee, levelAccess));
                    } else {
                        deleteLogin();
                        dispatch(getLoginNotFound());
                        // alert('You have been logged out.');
                    }
                } else {
                    if (loginStatus != null) {
                        removeLoginStatus();
                        alert("You have been logged out.");
                    }
                    dispatch(getLoginNotFound());
                }
            }, (err) => {
                console.log(err);
                if (loginStatus != null) {
                    dispatch(errorGetLoginIn(err));
                    alert(err);
                } else {
                    dispatch(errorGetLoginBlank(err));
                }
            }
        );
        // } else {
        //     dispatch(getLoginNotFound());
        // }
    };
}

async function deleteLogin() {
    let body = {
        idDevice: idDevice
    }
    let address = "http://localhost:3000/api/login/";
    return await axios.delete(address, { data: body }).then(
        (res) => {
            if (res.data.success == 1) {
                console.log('Delete login record.')
            } else {
                alert("Error.");
            }
        }, (err) => {
            console.log(err);
        }
    );
}

export function doLogin(username, password) {
    let body = {
        username: username,
        password: password,
        idDevice: idDevice
    };
    let address = "http://localhost:3000/api/employee/login";
    return dispatch => {
        dispatch(doLoginBegin());
        return axios.post(address, body).then(
            (res) => {
                if (res.data.success == 1) {
                    setLoginStatus();
                    let idEmployee = res.data.id_employee;
                    let levelAccess = res.data.level_access;
                    dispatch(doLoginValid(idEmployee, levelAccess));
                } else {
                    dispatch(doLoginNotValid());
                    alert(res.data.message);
                }
            }, (err) => {
                console.log(err);
                dispatch(errorDoLogin(err));
                alert(err);
            }
        );
    };
};

export function doLogout() {
    let body = {
        idDevice: idDevice
    }
    let address = "http://localhost:3000/api/login/";
    return dispatch => {
        dispatch(doLogoutBegin());
        removeLoginStatus();
        return axios.delete(address, { data: body }).then(
            (res) => {
                if (res.data.success == 1) {
                    dispatch(doLogoutSuccess());
                } else {
                    dispatch(errorDoLogout('Record not found.'));
                    alert("Error.");
                }
            }, (err) => {
                console.log(err);
                dispatch(errorDoLogout(err));
            }
        );
    }
}