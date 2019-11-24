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

        // 选中"待派送"navigation
        case constants.SELECTED_ARRIVED_FALSE:
            return state.set('isSelectedArrivedFalse', true).set('isSelectedArrivedTrue', false);

        // 选中"已送达"navigation
        case constants.SELECTED_ARRIVED_TRUE:
            return state.set('isSelectedArrivedFalse', false).set('isSelectedArrivedTrue', true);

        // 点击"确认送达"按钮时触发
        case constants.ON_ARRIVED_TO_LOCAL:
            return state.update('orderList', ($temList) => {
                const index = $temList.findIndex(($obj) => {
                    return $obj.get('orderId') === action.orderId;
                });
                if (index === -1) {
                    return $temList;
                } else {
                    return $temList.update(index, ($obj) => {
                        return $obj.set('isArrived', true);
                    });
                }
            });

        // 从本地删除订单
        case constants.DELETE_ORDER_ON_LOCAL:
            return state.update('orderList', ($temList) => {
                const index = $temList.findIndex(($obj) => {
                    return $obj.get('orderId') === action.orderId;
                });
                if (index === -1) {
                    return $temList;
                } else {
                    return $temList.delete(index);
                }
            });

        default:
            return state;
    }
};