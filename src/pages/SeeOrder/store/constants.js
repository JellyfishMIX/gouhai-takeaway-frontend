const LOAD_ORDER_LIST_TO_LOCAL = 'seeOrder/LOAD_ORDER_LIST_TO_LOCAL';   // 把从服务器接收到的订单列表加载到本地
const SELECTED_ARRIVED_FALSE = 'seeOrder/SELECTED_ARRIVED_FALSE';   // 选中"待派送"navigation
const SELECTED_ARRIVED_TRUE = 'seeOrder/SELECTED_ARRIVED_TRUE';   // 选中"待派送"navigation
const ON_ARRIVED_TO_LOCAL = 'seeOrder/ON_ARRIVED';   // 点击"确认送达"按钮时触发
const DELETE_ORDER_ON_LOCAL = 'seeOrder/DELETE_ORDER_ON_LOCAL'; // 从本地删除订单

export {
    LOAD_ORDER_LIST_TO_LOCAL,
    SELECTED_ARRIVED_FALSE,
    SELECTED_ARRIVED_TRUE,
    ON_ARRIVED_TO_LOCAL,
    DELETE_ORDER_ON_LOCAL
};