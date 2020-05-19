import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import {
    getProcessWorkOrderBegin,
    setProcessWorkOrder,
    getProcessWorkOrderTempReport,
    getProcessWorkOrderSuccess,
    errorGetProcessWorkOrder,
    doCheckInBegin,
    doCheckInSuccess,
    errorDoCheckIn,
    doCheckOutBegin,
    doCheckOutSuccess,
    errorDoCheckOut,
    cancelWorkOrderBegin,
    cancelWorkOrderSuccess,
    errorCancelWorkOrder,
    finalizeWorkOrderBegin,
    finalizeWorkOrderSuccess,
    errorFinalizeWorkOrder
} from './processWorkOrderActions';

import { getAndFilterWorkOrders } from '../workOrder/workOrderFunctions';
import { showAlertOk } from '../../GeneralFunction';

var moment = require('moment');
var dateVisitAttendance = moment(new Date()).format('YYYY-MM-DD');

let titleAlert = "Warning";


export const setProcessWorkOrderTempReport = async (idWorkOrder, value) => {
    try {
        var key = "workOrderId:" + idWorkOrder;

        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e);
    }
}


export const deleteProcessWorkOrderTempReport = async (idWorkOrder) => {
    try {
        var key = "workOrderId:" + idWorkOrder;

        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log(e);
    }
}


export const getProcessWorkOrder = (workOrder, navigation, idEmployee) => {
    var idWorkOrder = workOrder.id_work_order;
    
    let address = "http://localhost:3000/api/workOrder/getWorkOrderByIdWorkOrder";
    let body = { idWorkOrder: idWorkOrder };

    return async dispatch => {
        dispatch(getProcessWorkOrderBegin());

        var key = "workOrderId:" + idWorkOrder;
        var tempReport = await AsyncStorage.getItem(key);

        return axios
            .post(address, body)
            .then((res) => {
                if (res.data.success == 1) {
                    let resWorkOrder = res.data.data;
                    let finalized = resWorkOrder.finalized;
                    let report = resWorkOrder.report;

                    dispatch(setProcessWorkOrder(resWorkOrder));

                    if (finalized == 1) {
                        if (report == null || report == '') {
                            dispatch(getProcessWorkOrderTempReport('Report is empty.'));
                        }
                    } else {
                        if (tempReport != null) {
                            dispatch(getProcessWorkOrderTempReport(tempReport));
                        }
                    }
                    dispatch(getProcessWorkOrderSuccess());
                } else {
                    let message = res.data.message;

                    dispatch(errorGetProcessWorkOrder(message));

                    showAlertOk(titleAlert, message);

                    dispatch(getAndFilterWorkOrders(idEmployee, dateVisitAttendance))
                        .then(res => {
                            navigation.navigate("WorkOrder");

                            if (res) {
                                return res;
                            }
                        });
                }
            })
            .catch((err) => {
                dispatch(setProcessWorkOrder(workOrder));

                let finalized = workOrder.finalized;
                let report = workOrder.report;

                if (finalized == 1) {
                    if (report == null) {
                        dispatch(getProcessWorkOrderTempReport('Report is empty.'));
                    }
                } else if (tempReport != null) {
                    dispatch(getProcessWorkOrderTempReport(tempReport));
                }

                dispatch(errorGetProcessWorkOrder(err));

                let message = "No internet connection."

                return message;
            });
    }
}


export const doCheckIn = (
    idWorkOrder,
    time,
    latitudeIn,
    longitudeIn,
    photoIn,
    descriptionIn,
    idEmployee
) => {
    var timeIn = moment(time).format('HH:mm:ss')

    let address = "http://localhost:3000/api/visitAttendance/";
    let body = {
        idWorkOrder: idWorkOrder,
        dateVisitAttendance: dateVisitAttendance,
        timeIn: timeIn,
        latitudeIn: latitudeIn,
        longitudeIn: longitudeIn,
        photoIn: photoIn,
        descriptionIn: descriptionIn
    };

    return dispatch => {
        dispatch(doCheckInBegin());

        return axios
            .post(address, body)
            .then((res) => {
                if (res.data.success == 1) {
                    dispatch(doCheckInSuccess(
                        dateVisitAttendance,
                        timeIn,
                        latitudeIn,
                        longitudeIn,
                        photoIn,
                        descriptionIn
                    ));

                    dispatch(getAndFilterWorkOrders(idEmployee, dateVisitAttendance));

                    let message = "Check-in success.";

                    return message;
                } else {
                    let message = res.data.message;

                    dispatch(errorDoCheckIn(message));

                    showAlertOk(titleAlert, message);
                }
            })
            .catch((err) => {
                console.log(err);

                dispatch(errorDoCheckIn(err));

                let message = "No internet connection.";

                showAlertOk(titleAlert, message);
            });
    }
}


export const doCheckOut = (
    idWorkOrder,
    time,
    latitudeOut,
    longitudeOut,
    photoOut,
    signature,
    descriptionOut,
    idEmployee
) => {
    var timeOut = moment(time).format('HH:mm:ss')

    let address = "http://localhost:3000/api/visitAttendance/updateVisitAttendanceCheckOutByIdWorkOrder";
    let body = {
        idWorkOrder: idWorkOrder,
        timeOut: timeOut,
        latitudeOut: latitudeOut,
        longitudeOut: longitudeOut,
        photoOut: photoOut,
        signature: signature,
        descriptionOut: descriptionOut
    };

    return dispatch => {
        dispatch(doCheckOutBegin());

        return axios
            .patch(address, body)
            .then((res) => {
                if (res.data.success == 1) {
                    dispatch(doCheckOutSuccess(
                        timeOut,
                        latitudeOut,
                        longitudeOut,
                        photoOut,
                        signature,
                        descriptionOut
                    ));

                    dispatch(getAndFilterWorkOrders(idEmployee, dateVisitAttendance));

                    let message = "Check-out success.";

                    return message;
                } else {
                    let message = "Error.";

                    dispatch(errorDoCheckOut(message));

                    showAlertOk(titleAlert, message);
                }
            })
            .catch((err) => {
                console.log(err);

                dispatch(errorDoCheckOut(err));

                let message = "No internet connection."

                showAlertOk(titleAlert, message);
            });
    }
}


export const cancelWorkOrder = (idWorkOrder, idEmployee) => {
    let address = "http://localhost:3000/api/workOrder/updateWorkOrderCancelByIdWorkOrder";
    let body = {
        idWorkOrder: idWorkOrder
    };

    return dispatch => {
        dispatch(cancelWorkOrderBegin());

        return axios
            .patch(address, body)
            .then((res) => {
                if (res.data.success = 1) {
                    dispatch(cancelWorkOrderSuccess());

                    dispatch(getAndFilterWorkOrders(idEmployee, dateVisitAttendance));

                    let message = "Cancellation success.";

                    return message;
                } else {
                    let message = "Error";

                    dispatch(errorCancelWorkOrder(message));

                    showAlertOk(titleAlert, message);
                }
            })
            .catch((err) => {
                console.log(err);

                dispatch(errorCancelWorkOrder(err));

                let message = "No internet connection.";

                showAlertOk(titleAlert, message);
            });
    }
}


export const finalizeWorkOrder = (report, idWorkOrder, idEmployee) => {
    let address = "http://localhost:3000/api/workOrder/updateWorkOrderFinalizeByIdWorkOrder";
    let body = {
        report,
        idWorkOrder: idWorkOrder
    };

    return dispatch => {
        dispatch(finalizeWorkOrderBegin());

        return axios
            .patch(address, body)
            .then((res) => {
                if (res.data.success = 1) {
                    dispatch(finalizeWorkOrderSuccess(report));

                    dispatch(getAndFilterWorkOrders(idEmployee, dateVisitAttendance));

                    deleteProcessWorkOrderTempReport(idWorkOrder);

                    let message = "Finalization success.";

                    return message;
                } else {
                    let message = "Error.";

                    dispatch(errorFinalizeWorkOrder(message));

                    showAlertOk(titleAlert, message);
                }
            })
            .catch((err) => {
                console.log(err);

                dispatch(errorFinalizeWorkOrder(err));

                let message = "No internet connection.";

                showAlertOk(titleAlert, message);
            });
    }
}