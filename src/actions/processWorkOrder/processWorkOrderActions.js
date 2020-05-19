import {
    GET_PROCESS_WORK_ORDER_BEGIN,
    SET_PROCESS_WORK_ORDER,
    GET_PROCESS_WORK_ORDER_TEMP_REPORT,
    GET_PROCESS_WORK_ORDER_SUCCESS,
    ERROR_GET_PROCESS_WORK_ORDER,
    DO_CHECK_IN_BEGIN,
    DO_CHECK_IN_SUCCESS,
    ERROR_DO_CHECK_IN,
    DO_CHECK_OUT_BEGIN,
    DO_CHECK_OUT_SUCCESS,
    ERROR_DO_CHECK_OUT,
    CANCEL_WORK_ORDER_BEGIN,
    CANCEL_WORK_ORDER_SUCCESS,
    ERROR_CANCEL_WORK_ORDER,
    FINALIZE_WORK_ORDER_BEGIN,
    FINALIZE_WORK_ORDER_SUCCESS,
    ERROR_FINALIZE_WORK_ORDER
} from '../index';

export const getProcessWorkOrderBegin = () => ({
    type: GET_PROCESS_WORK_ORDER_BEGIN
});

export const setProcessWorkOrder = (workOrder) => ({
    type: SET_PROCESS_WORK_ORDER,
    workOrder
});

export const getProcessWorkOrderTempReport = (report) => ({
    type: GET_PROCESS_WORK_ORDER_TEMP_REPORT,
    report
});

export const getProcessWorkOrderSuccess = () => ({
    type: GET_PROCESS_WORK_ORDER_SUCCESS
});

export const errorGetProcessWorkOrder = (error) => ({
    type: ERROR_GET_PROCESS_WORK_ORDER,
    error
});

export const doCheckInBegin = () => ({
    type: DO_CHECK_IN_BEGIN
});

export const doCheckInSuccess = (
    dateVisitAttendance,
    timeIn,
    latitudeIn,
    longitudeIn,
    photoIn,
    descriptionIn
) => ({
    type: DO_CHECK_IN_SUCCESS,
    dateVisitAttendance,
    timeIn,
    latitudeIn,
    longitudeIn,
    photoIn,
    descriptionIn
});

export const errorDoCheckIn = (error) => ({
    type: ERROR_DO_CHECK_IN,
    error
});

export const doCheckOutBegin = () => ({
    type: DO_CHECK_OUT_BEGIN
});

export const doCheckOutSuccess = (timeOut, latitudeOut, longitudeOut, photoOut, signature, descriptionOut) => ({
    type: DO_CHECK_OUT_SUCCESS,
    timeOut,
    latitudeOut,
    longitudeOut,
    photoOut,
    signature,
    descriptionOut
});

export const errorDoCheckOut = (error) => ({
    type: ERROR_DO_CHECK_OUT,
    error
});

export const cancelWorkOrderBegin = () => ({
    type: CANCEL_WORK_ORDER_BEGIN
});

export const cancelWorkOrderSuccess = () => ({
    type: CANCEL_WORK_ORDER_SUCCESS
});

export const errorCancelWorkOrder = (error) => ({
    type: ERROR_CANCEL_WORK_ORDER,
    error
});

export const finalizeWorkOrderBegin = () => ({
    type: FINALIZE_WORK_ORDER_BEGIN
});

export const finalizeWorkOrderSuccess = (report) => ({
    type: FINALIZE_WORK_ORDER_SUCCESS,
    report
});

export const errorFinalizeWorkOrder = (error) => ({
    type: ERROR_FINALIZE_WORK_ORDER,
    error
});