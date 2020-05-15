import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import {
    getProcessWorkOrderBegin,
    setProcessWorkOrder,
    syncProcessWorkOrderComments,
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

var moment = require('moment');

var dateVisitAttendance = moment(new Date()).format('YYYY-MM-DD');

export const setSyncProcessWorkOrderComments = async (idWorkOrder, value) => {
    try {
        var key = "workOrderId:" + idWorkOrder;
        await AsyncStorage.setItem(key, value);
    } catch (e) {

    }
}

export const deleteSyncProcessWorkOrderComments = async (idWorkOrder) => {
    try {
        var key = "workOrderId:" + idWorkOrder;
        await AsyncStorage.removeItem(key);
    } catch (error) {

    }
}

export function getProcessWorkOrder(workOrder, navigation, idEmployee) {
    var idWorkOrder = workOrder.id_work_order;
    let body = {idWorkOrder: idWorkOrder};
    let address = "http://localhost:3000/api/workOrder/getWorkOrderByIdWorkOrder";
    
    return async dispatch => {
        dispatch(getProcessWorkOrderBegin());
        
        var key = "workOrderId:" + idWorkOrder;
        var comments = await AsyncStorage.getItem(key);
        
        return axios
            .post(address, body)
            .then((res) => {
                if (res.data.success == 1) {
                    let resWorkOrder = res.data.data;
                    dispatch(setProcessWorkOrder(resWorkOrder));
                    if (resWorkOrder.finalized == 1) {
                        if (resWorkOrder.work_order_comments == null || resWorkOrder.work_order_comments == '') {
                            dispatch(syncProcessWorkOrderComments('No comments.'));
                        }
                    } else {
                        if (comments != null) {
                            dispatch(syncProcessWorkOrderComments(comments));
                        }
                    }
                    dispatch(getProcessWorkOrderSuccess());
                } else {
                    dispatch(errorGetProcessWorkOrder(res.data.message));
                    let message = res.data.message;
                    alert(message);
                    dispatch(getAndFilterWorkOrders(idEmployee, dateVisitAttendance));
                    navigation.navigate("WorkOrder");
                }
            })
            .catch((err) => {
                dispatch(setProcessWorkOrder(workOrder));
                if (workOrder.finalized == 1) {
                    if (workOrder.work_order_comments == null) {
                        dispatch(syncProcessWorkOrderComments('No comments.'));
                    }
                } else if (comments != null) {
                    dispatch(syncProcessWorkOrderComments(comments));
                }

                dispatch(errorGetProcessWorkOrder(err));
                let message = "Network error."

                return message;
            });
    }
}

export function doCheckIn(idWorkOrder, time, latitudeIn, longitudeIn, photoIn, descriptionIn, navigation, idEmployee) {
    var timeIn = moment(time).format('HH:mm:ss')
    let body = {
        idWorkOrder: idWorkOrder,
        dateVisitAttendance: dateVisitAttendance,
        timeIn: timeIn,
        latitudeIn: latitudeIn,
        longitudeIn: longitudeIn,
        photoIn: photoIn,
        descriptionIn: descriptionIn
    };
    let address = "http://localhost:3000/api/visitAttendance/";
    return dispatch => {
        dispatch(doCheckInBegin());
        return axios.post(address, body).then(
            (res) => {
                if (res.data.success == 1) {
                    dispatch(doCheckInSuccess(
                        dateVisitAttendance,
                        timeIn,
                        latitudeIn,
                        longitudeIn,
                        photoIn,
                        descriptionIn
                    ));
                    navigation.navigate("ProcessWorkOrder");
                    alert("Check-in success.");
                    dispatch(getAndFilterWorkOrders(idEmployee, dateVisitAttendance));
                } else {
                    dispatch(errorDoCheckIn(res.data.message));
                    alert(res.data.message);
                }
            }, (err) => {
                console.log(err);
                dispatch(errorDoCheckIn(err));
                alert(err);
            }
        );
    }
}

export function doCheckOut(idWorkOrder, time, latitudeOut, longitudeOut, photoOut, signature, descriptionOut, navigation, idEmployee) {
    var timeOut = moment(time).format('HH:mm:ss')
    let body = {
        idWorkOrder: idWorkOrder,
        timeOut: timeOut,
        latitudeOut: latitudeOut,
        longitudeOut: longitudeOut,
        photoOut: photoOut,
        signature: signature,
        descriptionOut: descriptionOut
    };
    let address = "http://localhost:3000/api/visitAttendance/updateVisitAttendanceCheckOutByIdWorkOrder";
    return dispatch => {
        dispatch(doCheckOutBegin());
        return axios.patch(address, body).then(
            (res) => {
                if (res.data.success == 1) {
                    dispatch(doCheckOutSuccess(
                        timeOut,
                        latitudeOut,
                        longitudeOut,
                        photoOut,
                        signature,
                        descriptionOut
                    ));
                    navigation.navigate("ProcessWorkOrder");
                    alert("Check-out success.");
                    dispatch(getAndFilterWorkOrders(idEmployee, dateVisitAttendance));
                } else {
                    dispatch(errorDoCheckOut(res.data.message));
                    alert(res.data.message);
                }
            }, (err) => {
                console.log(err);
                dispatch(errorDoCheckOut(err));
                alert(err);
            }
        );
    }
}

export function cancelWorkOrder(idWorkOrder, idEmployee) {
    let body = {
        idWorkOrder: idWorkOrder
    };
    let address = "http://localhost:3000/api/workOrder/updateWorkOrderCancelByIdWorkOrder";
    return dispatch => {
        dispatch(cancelWorkOrderBegin());
        return axios.patch(address, body).then(
            (res) => {
                if (res.data.success = 1) {
                    dispatch(cancelWorkOrderSuccess());
                    alert("Cancellation success.");
                    dispatch(getAndFilterWorkOrders(idEmployee, dateVisitAttendance));
                } else {
                    dispatch(errorCancelWorkOrder(res.data.message));
                    alert(res.data.message);
                }
            }, (err) => {
                console.log(err);
                dispatch(errorCancelWorkOrder(err));
                alert(err);
            }
        );
    }
}

export function finalizeWorkOrder(comments, idWorkOrder, idEmployee) {
    let body = {
        comments,
        idWorkOrder: idWorkOrder
    };
    let address = "http://localhost:3000/api/workOrder/updateWorkOrderFinalizeByIdWorkOrder";
    return dispatch => {
        dispatch(finalizeWorkOrderBegin());
        return axios.patch(address, body).then(
            (res) => {
                if (res.data.success = 1) {
                    dispatch(finalizeWorkOrderSuccess(comments));
                    dispatch(getAndFilterWorkOrders(idEmployee, dateVisitAttendance));
                    deleteSyncProcessWorkOrderComments(idWorkOrder);
                    alert("Finalization success.");
                } else {
                    dispatch(errorFinalizeWorkOrder(res.data.message));
                    alert(res.data.message);
                }
            }, (err) => {
                console.log(err);
                dispatch(errorFinalizeWorkOrder(err));
                alert(err);
            }
        );
    }
}