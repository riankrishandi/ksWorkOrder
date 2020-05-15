import axios from 'axios';

import {
    getWorkOrdersBegin,
    getWorkOrdersSuccess,
    setWorkOrdersAll,
    filterWorkOrdersBegin,
    setWorkOrdersOpen,
    setWorkOrdersInProgress,
    setWorkOrdersClosed,
    setWorkOrdersCancelled,
    setWorkOrdersFinalized,
    filterWorkOrdersSuccess,
    errorGetAndFilterWorkOrders,
} from './workOrderActions';

var moment = require('moment');

export const getAndFilterWorkOrders = (idEmployee, dateAssigned) => {
    let address = "http://localhost:3000/api/workOrder/getWorkOrdersByDateAssignedAndIdEmployee";
    let body = {
        dateAssigned: moment(dateAssigned).format('YYYY-MM-DD'),
        idEmployee: idEmployee,
    }

    return dispatch => {
        dispatch(getWorkOrdersBegin());

        return axios
            .post(address, body)
            .then((res) => {
                if (res.data.success == 1) {
                    dispatch(getWorkOrdersSuccess());

                    let workOrders = res.data.data

                    dispatch(setWorkOrdersAll(workOrders));

                    dispatch(filterWorkOrdersBegin());

                    workOrders
                        .map(workOrder => {
                            if (workOrder.finalized == 1) {
                                dispatch(setWorkOrdersFinalized(workOrder));
                            } else if (workOrder.cancelled === 1) {
                                dispatch(setWorkOrdersCancelled(workOrder));
                            } else if (workOrder.id_visit_attendance === null) {
                                dispatch(setWorkOrdersOpen(workOrder));
                            } else if (workOrder.time_out === null) {
                                dispatch(setWorkOrdersInProgress(workOrder));
                            } else {
                                dispatch(setWorkOrdersClosed(workOrder));
                            }
                        });

                    dispatch(filterWorkOrdersSuccess());
                } else {
                    let message = "Error.";

                    dispatch(errorGetAndFilterWorkOrders(message));

                    return message;
                }
            })
            .catch((err) => {
                console.log(err);

                dispatch(errorGetAndFilterWorkOrders(err));
                
                let message = "No internet connection.";

                return message;
            });
    };
}