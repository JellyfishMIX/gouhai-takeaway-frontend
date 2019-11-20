import * as constants from './constants';
import {fromJS} from 'immutable';

const defaultState = fromJS({
    orderList: []
});

export default (state = defaultState, action) => {
    switch (action.type) {
        // 把从服务器接收到的订单列表加载到本地
        case constants.LOAD_ORDER_LIST_TO_LOCAL:
            return state.set('orderList', action.orderList);

        default:
            return state;
    }
};