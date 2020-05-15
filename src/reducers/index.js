import { combineReducers } from 'redux';

import login from './login';
import workOrder from './workOrder';
import processWorkOrder from './processWorkOrder'

export default combineReducers({
    login,
    workOrder,
    processWorkOrder
});