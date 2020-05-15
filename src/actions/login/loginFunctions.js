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
import { showAlertOk } from '../../GeneralFunction';

let idDevice = DeviceInfo.getUniqueId();
const LOGIN_STATUS = 'LOGIN_STATUS';

export const getLogin = () => {
    let address = "http://localhost:3000/api/login/";
    let body = {
        idDevice: idDevice
    };

    return async dispatch => {
        dispatch(getLoginBegin());

        let loginStatus = await AsyncStorage.getItem(LOGIN_STATUS);

        return axios
            .post(address, body)
            .then(
                (res) => {
                    if (res.data.success == 1) {
                        if (loginStatus != null) {
                            let idEmployee = res.data.data.id_employee;
                            let levelAccess = res.data.data.level_access;

                            dispatch(getLoginFound(idEmployee, levelAccess));
                        } else {
                            deleteLogin();

                            dispatch(getLoginNotFound());
                        }
                    } else {
                        if (loginStatus != null) {
                            removeLoginStatus();

                            let title = "Warning";
                            let message = "You have been logged out.";

                            showAlertOk(title, message);
                        }
                        dispatch(getLoginNotFound());
                    }
                })
            .catch((err) => {
                console.log(err);

                if (loginStatus != null) {
                    dispatch(errorGetLoginIn(err));

                    let message = "No internet connection.";

                    return message;
                } else {
                    dispatch(errorGetLoginBlank(err));
                }
            });
    };
}

const deleteLogin = async () => {
    let address = "http://localhost:3000/api/login/";
    let body = {
        idDevice: idDevice
    };

    return await axios
        .delete(address, { data: body })
        .then(
            (res) => {
                if (res.data.success == 1) {
                    console.log("Delete login record success.");
                } else {
                    console.log("Delete login record error");
                }
            })
        .catch(
            (err) => {
                console.log(err);
            }
        );
}

export const doLogin = (username, password) => {
    let address = "http://localhost:3000/api/employee/login";
    let body = {
        username: username,
        password: password,
        idDevice: idDevice
    };

    return dispatch => {
        dispatch(doLoginBegin());

        return axios
            .post(address, body)
            .then(
                (res) => {
                    if (res.data.success == 1) {
                        setLoginStatus();

                        let idEmployee = res.data.id_employee;
                        let levelAccess = res.data.level_access;

                        dispatch(doLoginValid(idEmployee, levelAccess));
                    } else {
                        dispatch(doLoginNotValid());

                        let title = "Warning";
                        let message = res.data.message;

                        showAlertOk(title, message);
                    }
                }).catch(
                    (err) => {
                        console.log(err);

                        dispatch(errorDoLogin(err));

                        let title = "Warning";
                        let message = "No internet connection.";

                        showAlertOk(title, message);
                    }
                );
    };
};

export const doLogout = () => {
    let address = "http://localhost:3000/api/login/";
    let body = {
        idDevice: idDevice
    }

    return dispatch => {

        dispatch(doLogoutBegin());

        removeLoginStatus();

        return axios
            .delete(address, { data: body })
            .then(
                (res) => {
                    if (res.data.success == 1) {
                        dispatch(doLogoutSuccess());
                    } else {
                        dispatch(errorDoLogout('Record not found.'));
                    }
                }, (err) => {
                    console.log(err);
                    
                    dispatch(errorDoLogout(err));
                }
            );
    }
}