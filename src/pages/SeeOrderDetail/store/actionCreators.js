import {constants} from './index';
// import axios from 'axios';
// import {fromJS} from 'immutable';

// 从props.location.state中拿到order对象，请注意：此处order为immutable对象
const loadOrderFromLocationState = (order) => ({
    type: constants.LOAD_ORDER_FROM_LOCATION_STATE,
    order: order
});

export {
    loadOrderFromLocationState
};