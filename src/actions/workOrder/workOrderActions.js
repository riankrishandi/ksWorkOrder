import {
    GET_WORK_ORDERS_BEGIN,
    GET_WORK_ORDERS_SUCCESS,
    SET_WORK_ORDERS_ALL,
    FILTER_WORK_ORDERS_BEGIN,
    SET_WORK_ORDERS_OPEN,
    SET_WORK_ORDERS_IN_PROGRESS,
    SET_WORK_ORDERS_CLOSED,
    SET_WORK_ORDERS_CANCELLED,
    SET_WORK_ORDERS_FINALIZED,
    FILTER_WORK_ORDERS_SUCCESS,
    ERROR_GET_AND_FILTER_WORK_ORDERS,
} from '../index';

export const getWorkOrdersBegin = () => ({
    type: GET_WORK_ORDERS_BEGIN
});

export const getWorkOrdersSuccess = () => ({
    type: GET_WORK_ORDERS_SUCCESS
});

export const setWorkOrdersAll = (workOrders) => ({
    type: SET_WORK_ORDERS_ALL,
    workOrders
});

export const filterWorkOrdersBegin = () => ({
    type: FILTER_WORK_ORDERS_BEGIN
});

export const setWorkOrdersOpen = (workOrder) => ({
    type: SET_WORK_ORDERS_OPEN,
    workOrder
});

export const setWorkOrdersInProgress = (workOrder) => ({
    type: SET_WORK_ORDERS_IN_PROGRESS,
    workOrder
});

export const setWorkOrdersClosed = (workOrder) => ({
    type: SET_WORK_ORDERS_CLOSED,
    workOrder
});

export const setWorkOrdersCancelled = (workOrder) => ({
    type: SET_WORK_ORDERS_CANCELLED,
    workOrder
});

export const setWorkOrdersFinalized = (workOrder) => ({
    type: SET_WORK_ORDERS_FINALIZED,
    workOrder
});

export const filterWorkOrdersSuccess = () => ({
    type: FILTER_WORK_ORDERS_SUCCESS
})

export const errorGetAndFilterWorkOrders = (error) => ({
    type: ERROR_GET_AND_FILTER_WORK_ORDERS,
    error
});