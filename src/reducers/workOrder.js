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
    ERROR
} from '../actions/index';

initialState = {
    allWorkOrders: [],
    openWorkOrders: [],
    inProgressWorkOrders: [],
    closedWorkOrders: [],
    cancelledWorkOrders: [],
    finalizedWorkOrders: [],
    currentLocation: {
        latitude: null,
        longitude: null
    },
    loading: false,
    error: null
};

const workOrder = (state = initialState, action) => {
    switch (action.type) {
        case GET_WORK_ORDERS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
                allWorkOrders: [],
                openWorkOrders: [],
                inProgressWorkOrders: [],
                closedWorkOrders: [],
                cancelledWorkOrders: [],
                finalizedWorkOrders: []
            };

        case GET_WORK_ORDERS_SUCCESS:
            return {
                ...state
            };

        case SET_WORK_ORDERS_ALL:
            return {
                ...state,
                allWorkOrders: action.workOrders
            };

        case FILTER_WORK_ORDERS_BEGIN:
            return {
                ...state
            };

        case SET_WORK_ORDERS_OPEN:
            return {
                ...state,
                openWorkOrders: [
                    ...state.openWorkOrders,
                    action.workOrder
                ]
            };

        case SET_WORK_ORDERS_IN_PROGRESS:
            return {
                ...state,
                inProgressWorkOrders: [
                    ...state.inProgressWorkOrders,
                    action.workOrder
                ]
            };

        case SET_WORK_ORDERS_CLOSED:
            return {
                ...state,
                closedWorkOrders: [
                    ...state.closedWorkOrders,
                    action.workOrder
                ]
            };

        case SET_WORK_ORDERS_CANCELLED:
            return {
                ...state,
                cancelledWorkOrders: [
                    ...state.cancelledWorkOrders,
                    action.workOrder
                ]
            };

        case SET_WORK_ORDERS_FINALIZED:
            return {
                ...state,
                finalizedWorkOrders: [
                    ...state.finalizedWorkOrders,
                    action.workOrder
                ]
            };

        case FILTER_WORK_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false
            };

        case ERROR_GET_AND_FILTER_WORK_ORDERS:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        default:
            return state;
    }
}

export default workOrder;