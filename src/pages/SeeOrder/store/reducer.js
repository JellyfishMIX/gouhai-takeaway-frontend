import * as constants from './constants';
import {fromJS} from 'immutable';

const defaultState = fromJS({
    orderList: [],
    isSelectedArrivedFalse: true,
    isSelectedArrivedTrue: false
});

export default (state = defaultState, action) => {
    switch (action.type) {
        // 把从服务器接收到的订单列表加载到本地
        case constants.LOAD_ORDER_LIST_TO_LOCAL:
            return state.set('orderList', action.orderList);

        case constants.SELECTED_ARRIVED_FALSE:
            return state.set('isSelectedArrivedFalse', true).set('isSelectedArrivedTrue', false);

        case constants.SELECTED_ARRIVED_TRUE:
            return state.set('isSelectedArrivedFalse', false).set('isSelectedArrivedTrue', true);

        default:
            return state;
    }
};