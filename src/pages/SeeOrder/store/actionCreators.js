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
            console.log(err);
        });
    }
};

// 选中"待派送"navigation
const selectedArrivedFalse = () => ({
    type: constants.SELECTED_ARRIVED_FALSE
});

// 选中"已送达"navigation
const selectedArrivedTrue = () => ({
    type: constants.SELECTED_ARRIVED_TRUE
});

// 点击"确认送达"按钮时触发
const onArrived = (orderId) => {
    return (dispatch) => {
        const confirm = window.confirm('确认送达？');
        if (confirm) {
            axios.post('http://39.97.254.25:8080/gouhai-takeaway/api/order/modifyordertoarrived', {orderId: orderId}).then((res) => {
                console.log(res);
                dispatch(_onArrivedToLocal(orderId));
            }).catch((err) => {
                console.log(err);
            });
        }
    }
};

// 点击"删除订单"按钮时触发
const deleteOrder = (orderId) => {
    return (dispatch) => {
        const confirm = window.confirm('确认删除？');
        if (confirm) {
            axios.post('http://39.97.254.25:8080/gouhai-takeaway/api/order/deleteorder', {orderId: orderId}).then((res) => {
                console.log(res);
                dispatch(_deleteOrderOnLocal(orderId));
            }).catch((err) => {
                console.log(err);
            });
        }
    }
};

const _deleteOrderOnLocal = (orderId) => ({
    type: constants.DELETE_ORDER_ON_LOCAL,
    orderId
});

// 把从服务器接收到的订单列表加载到本地
const _loadOrderListToLocal = (orderList) => ({
    type: constants.LOAD_ORDER_LIST_TO_LOCAL,
    orderList: fromJS(orderList)
});

// 把本地orderId对应的订单状态改为已送达
const _onArrivedToLocal = (orderId) => ({
    type: constants.ON_ARRIVED_TO_LOCAL,
    orderId
});

export {
    loadOrderList,
    selectedArrivedFalse,
    selectedArrivedTrue,
    onArrived,
    deleteOrder
};