import {actionTypes} from './index';
import {fromJS} from 'immutable';
import axios from "axios";

const _getOrderList = (commodityList) => {
    return {
        type: actionTypes.GET_ORDERLIST,
        foodList: commodityList
    }
};

export const getOrderList = () => {
    return (dispatch) => {
    axios.get('http://39.97.254.25:8080/gouhai-takeaway/api/commodity/getcommoditylist')
        .then((res) => {
            console.log(res.data);
            const receiveList = res.data.commodityList;
            dispatch(_getOrderList(receiveList))
        }).catch((err) => {
            console.log('菜单数据请求失败',err);
        });
    }
};



const _addShoppingCart = (item, currentPrice) => ({
    type: actionTypes.ADD_FOOD,
    item,
    currentPrice,
});

export const addShoppingCart = (foodList, id) => { //dispatch到ShoppingTab的reducer组件
    return (dispatch) => {
        const item = foodList.filter((value, index, array) =>
            value.get('id') === id
        );//这个item为 filter后返回的数组！！ 需要将其中[0]再筛出来
        const currentPrice = (item.toJS()[0]).currentPrice;
        dispatch(_addShoppingCart(fromJS(item.get(0)), currentPrice));
    }
};