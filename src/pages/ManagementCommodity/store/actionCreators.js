import {constants} from './index';
import axios from 'axios';
import {fromJS} from 'immutable';

// 从服务器加载商品列表
const loadCommodityList = () => {
    return (dispatch) => {
        axios.get('http://localhost:8080/gouhai_takeaway_backend_ssm_war_exploded/api/commodity/getcommoditylist').then((res) => {
            // console.log(res);
            dispatch(_loadCommodityListToLocal(res.data.commodityList));
        }).catch((err) => {
            console.log('errMsg: ' + err);
        });
    }
};

// 把从服务器接收到的商品列表加载到本地
const _loadCommodityListToLocal = (commodityList) => ({
    type: constants.LOAD_COMMODITY_LIST_TO_LOCAL,
    commodityList:  fromJS(commodityList)
});

// 点击Switch开关时，切换enable
const switchTrigger = (id, newIsTurnOn) => ({
    type: constants.CHANGE_COMMODITY_ENABLE,
    id,
    enable: newIsTurnOn
});

// 点击Switch开关时，向服务器发送enable更改信息。注意，这里的item是immutable对象，immutable.set是异步方法
const switchTriggerPost = (item) => {
    return (dispatch) => {
        let temObject = item.toJS();
        temObject.enable = !item.get('enable');
        axios.post('http://localhost:8080/gouhai_takeaway_backend_ssm_war_exploded/api/commodity/updatecommodity', temObject).then(() => {
            console.log("axios.post success");
        }).catch((err) => {
            console.log("errMsg: " + err.toString());
        });
    }
};

// 点击CommodityInfo时，进入编辑模式。注意：此处参数item为immutable对象
const underRevision = (id, item) => ({
    type: constants.UNDER_REVISION,
    id,
    item,
});

// 编辑模式下，CommodityTitleInput的value改变时
const commodityTitleInputChange = (value) => ({
    type: constants.COMMODITY_TITLE_INPUT_CHANGE,
    value,
});

// 编辑模式下，OriginalPriceInput改变时
const originalPriceInputChange = (value) => ({
    type: constants.ORIGINAL_PRICE_INPUT_CHANGE,
    value,
});

// 编辑模式下，CurrentPriceInput改变时
const currentPriceInputChange = (value) => ({
    type: constants.CURRENT_PRICE_INPUT_CHANGE,
    value,
});

// 点击"保存"触发，保存编辑数据至本地store，同时post给服务器，并退出编辑模式
const onSave = (id, temCommodity) => {
    return (dispatch) => {
        axios.post('http://localhost:8080/gouhai_takeaway_backend_ssm_war_exploded/api/commodity/updatecommodity', temCommodity.toJS()).then(() => {
            console.log("axios.post success");
        }).catch((err) => {
            console.log("errMsg: " + err.toString());
        });
        dispatch(_SaveTemCommodityToLocal(id));
    }
};

// redux-thunk私有方法，保存编辑数据至本地store，并退出编辑模式
const _SaveTemCommodityToLocal = (id) => ({
    type: constants.SAVE_TEM_COMMODITY_TO_LOCAL,
    id,
});

//  点击"取消"触发，退出编辑模式
const onCancel = (id) => ({
    type: constants.ON_CANCEL,
    id,
});

// 点击seeMore触发，弹出气泡，打开Mask遮罩
const onSeeMore = (id) => ({
    type: constants.ON_SEE_MORE,
    id,
});

// 点击"删除商品"触发，本地删当前商品，关闭Mask遮罩，并向服务器发送删除指令
const onDeleteCommodity = (id) => {
    return (dispatch) => {
        const isConfirm = window.confirm('确认删除？');
        if (isConfirm) {
            axios.post('http://localhost:8080/gouhai_takeaway_backend_ssm_war_exploded/api/commodity/deletecommodity', {
                id: id
            }).then(() => {
                console.log("axios.post success");
            }).catch((err) => {
                console.log("errMsg: " + err.toString());
            });
            dispatch(_deleteLocalCommodity(id));
        }
    }
};

// redux-thunk私有方法，本地删当前商品，关闭Mask遮罩
const _deleteLocalCommodity = (id) => ({
    type: constants.DELETE_LOCAL_COMMODITY,
    id,
});

// 点击Mask遮罩触发，隐藏气泡，关闭Mask遮罩
const onMask = (id) => ({
    type: constants.ON_MASK,
    id
});

export {
    loadCommodityList,
    switchTrigger,
    switchTriggerPost,
    underRevision,
    commodityTitleInputChange,
    originalPriceInputChange,
    currentPriceInputChange,
    onSave,
    onCancel,
    onSeeMore,
    onMask,
    onDeleteCommodity,
};