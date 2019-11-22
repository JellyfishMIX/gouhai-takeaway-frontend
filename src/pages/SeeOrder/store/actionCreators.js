import {constants} from './index';
import axios from 'axios';
import {fromJS} from 'immutable';

// 从服务器加载订单列表
const loadOrderList = () => {
    return (dispatch) => {
        axios.get('http://39.97.254.25:8080/gouhai-takeaway/api/order/getorderlist').then((res) => {
            console.log(res);
            dispatch(_loadOrderListToLocal(res.data.orderList));
        }).catch((err) => {
            console.log('success: false');
            console.log('errMsg:' + err);
        });
    }
};

// 选中"待派送"
const selectedArrivedFalse = () => ({
    type: constants.SELECTED_ARRIVED_FALSE
});

// 选中"已送达"
const selectedArrivedTrue = () => ({
    type: constants.SELECTED_ARRIVED_TRUE
});

// 把从服务器接收到的订单列表加载到本地
const _loadOrderListToLocal = (orderList) => ({
    type: constants.LOAD_ORDER_LIST_TO_LOCAL,
    orderList: fromJS(orderList)
});

export {
    loadOrderList,
    selectedArrivedFalse,
    selectedArrivedTrue
};