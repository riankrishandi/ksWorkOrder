import {
    GET_PROCESS_WORK_ORDER_BEGIN,
    SET_PROCESS_WORK_ORDER,
    SYNC_PROCESS_WORK_ORDER_COMMENTS,
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
} from '../actions/index';

initialState = {
    workOrder: {},
    loading: false,
    error: null
};

const processWorkOrder = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROCESS_WORK_ORDER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
                workOrder: {},
            };

        case SET_PROCESS_WORK_ORDER:
            return {
                ...state,
                workOrder: action.workOrder
            };

        case SYNC_PROCESS_WORK_ORDER_COMMENTS:
            return {
                ...state,
                workOrder: {
                    ...state.workOrder,
                    work_order_comments: action.comments
                }
            };

        case GET_PROCESS_WORK_ORDER_SUCCESS:
            return {
                ...state,
                loading: false
            };

        case ERROR_GET_PROCESS_WORK_ORDER:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case DO_CHECK_IN_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case DO_CHECK_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                workOrder: {
                    ...state.workOrder,
                    date_visit_attendance: action.dateVisitAttendance,
                    time_in: action.timeIn,
                    latitude_in: action.latitudeIn,
                    longitude_in: action.longitudeIn,
                    photo_in: action.photoIn,
                    description_in: action.descriptionIn
                }
            };

        case ERROR_DO_CHECK_IN:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case DO_CHECK_OUT_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case DO_CHECK_OUT_SUCCESS:
            return {
                ...state,
                loading: false,
                workOrder: {
                    ...state.workOrder,
                    time_out: action.timeOut,
                    latitude_out: action.latitudeOut,
                    longitude_out: action.longitudeOut,
                    photo_out: action.photoOut,
                    signature: action.signature,
                    description_out: action.descriptionOut
                }
            };
        
        case ERROR_DO_CHECK_OUT:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case CANCEL_WORK_ORDER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case CANCEL_WORK_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                workOrder: {
                    ...state.workOrder,
                    cancelled: 1
                }
            };

        case ERROR_CANCEL_WORK_ORDER:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case FINALIZE_WORK_ORDER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FINALIZE_WORK_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                workOrder: {
                    ...state.workOrder,
                    work_order_comments: action.comments,
                    finalized: 1
                }
            };

        case ERROR_FINALIZE_WORK_ORDER:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        default:
            return state;
    }
}

export default processWorkOrder;