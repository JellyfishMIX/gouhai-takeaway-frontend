import {actionTypes} from './index';
import dayjs from 'dayjs';
import axios from 'axios';

export const changeSum = (operate, id) => { //传送至shoppingTab的reducer
    if (operate === actionTypes.ADD_SUM) {
        const addSumAction = {
            type: actionTypes.ADD_SUM,
            id,
        };
        return (dispatch) => {
            dispatch(addSumAction);
        }
    }
    if (operate === actionTypes.LESS_SUM) {
        const lessSumAction = {
            type: actionTypes.LESS_SUM,
            id,
        };
        return (dispatch) => {
            dispatch(lessSumAction)
        }
    }

};

export const selectSchoolAndMealTime = (SchoolAndMealTime) => {

    const addSchoolAndMealTimeAction = {
        type: actionTypes.SELECT_SCHOOLANDMEALTIME,
        school: SchoolAndMealTime[1],
        mealTime: SchoolAndMealTime[2],
    };
    return (dispatch) => {
        dispatch(addSchoolAndMealTimeAction);
    }
};

export const changeInputName = (name) => {
    const changeInputNameAction = {
        type: actionTypes.CHANGE_INPUTNAME,
        name,
    };
    return (dispatch) => {
        dispatch(changeInputNameAction);
    }
};

export const changeInputCellphoneNumber = (cellphoneNumber) => {
    const changeInputCellphoneNumberAction = {
        type: actionTypes.CHANGE_INPUTCELLPHONENUMBER,
        cellphoneNumber: cellphoneNumber,
    };
    return (dispatch) => {
        dispatch(changeInputCellphoneNumberAction);
    }
};

export const changeShowTransition = () => {
    const changeShowTransitionAction = {
        type: actionTypes.CHANGE_SHOWTRANSITION,
    };
    return (dispatch) => {
        dispatch(changeShowTransitionAction);
    };
};

// 课设 ! 用 axios 发送订单信息至 服务器
export const checkout = (List) => {
    const list = List.toJS();
    console.log(list);

    const time = dayjs(new Date());
    const createTime = `${time.$y}-${time.$M + 1}-${time.$D}   ${time.$H}:${time.$m}:${time.$s}`;

    let submitList = {
        customerName: list.personName, // 顾客姓名
        customerPhone: list.cellphoneNumber,    // 顾客手机号，请注意，该属性的值的数据类型为字符串
        customerAddr: list.school, // 顾客地址
        totalPrice: list.totalPrice,  // 总价
        createTime: createTime, // 下单时间
        isArrived: false, // 是否送达
        // 订单已购商品列表
        orderCommodityList: []
    };

    for (let i = 0; i < list.ChoosedList.length; i++) {
        submitList.orderCommodityList.push({
            commodityName: list.ChoosedList[i].name,  // 商品名字
            originalPrice: list.ChoosedList[i].originalPrice, // 原价
            unitPrice: list.ChoosedList[i].currentPrice, // 单价，即现价
            quantity: list.ChoosedList[i].sum,  // 数量
            totalPrice: list.ChoosedList[i].currentPrice * list.ChoosedList[i].sum,    // 单项合计
        })
    }

    console.log(submitList); // 该句留下，测试用

    axios.post('http://39.97.254.25:8080/gouhai-takeaway/api/order/addorder', submitList).then(res => {
        console.log(res);
        alert('下单成功！');
    }).catch(err => {
        console.log(err);
        alert('抱歉，下单失败！');
    });
};


/*//websocket试验！ 试验成功！
export const checkout = (list) => {
    const readyList = list.toJS();
    const time = new Date();
    const pay_time = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time
        .getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
    let flagzhifu = false;

    console.log("准备处理的数据为" , readyList);

    let myjson = {
        "type": "xie",
        "food_time": readyList.mealTime,
        "food_qunlia": readyList.school,
        "food_name": readyList.ChoosedList[0].name,
        "personmessage_name": readyList.personName,
        "personmessage_phone": readyList.cellphoneNumber,
        "pay_money": readyList.totalPrice * 1000,
        "pay_time": pay_time
    };
    console.log("传输给服务器的数据是" , JSON.stringify(myjson));



    //校验送餐时间 与 下单时间
    console.log("选中的送餐时间为" + readyList.mealTime);
    console.log("现在的时间为" + pay_time);

    let minutesDelete = parseInt(parseInt(readyList.mealTime.slice(0, 2)) * 60 + parseInt(readyList.mealTime.slice(3, 5)))
        - (time.getHours() * 60 + time.getMinutes());
    console.log("距离送餐时间" + minutesDelete + "分钟");
    //计算下班时间
    let offWorkTime = (17 * 60 + 10) - (time.getHours() * 60 + time.getMinutes());
    console.log("当前时间距离下班时间" + offWorkTime);

    if (readyList.mealTime === '') {
        alert("请选择送餐时间");
        return null;
    } else if (offWorkTime < 0) {
        alert("抱歉！订餐系统开放时间为0:00-17:10");
        return null;
    } else if (minutesDelete < 60) {
        alert("我们目前只接受提前一个小时订餐~");
        return null;
    }
    //校验选择菜品数
    if (readyList.ChoosedList.length === 0) {
        alert("请选择菜品");
        return null;
    }
    //校验取餐人姓名
    if (readyList.personName === '') {
        alert("请输入取餐人姓名");
        return null;
    }
    //校验手机号
    if (readyList.cellphoneNumber === '') {
        alert("请输入取餐人电话");
        return null;
    } else if (readyList.cellphoneNumber.length > 11 || readyList.cellphoneNumber.length < 11) {
        alert("请核实电话号位数是否正确");
        return null;
    }
    //校验送餐地点
    if (readyList.school === '') {
        alert("请选择送餐地点");
        return null;
    } else if (readyList.school === '_forbidden') {
        alert("对不起，您选择的送餐地点不在服务区");
        return null;
    }
    //校验总付款钱数
    if(readyList.totalPrice !== readyList.ChoosedList[0].sum * readyList.ChoosedList[0].currentPrice){
        alert("请选择菜品！");
        return null;
    }


    document.cookie = "you_paymoney=" + String(readyList.totalPrice);
    const myqueren = {
        "type": "querenfukuan",
        "food_time": readyList.mealTime,
        "food_qunlia": readyList.school,
        "food_name": readyList.ChoosedList[0].name,
        "personmessage_name": readyList.personName,
        "personmessage_phone": readyList.cellphoneNumber,
        "pay_money": readyList.totalPrice,
        "pay_time": pay_time
    };

    localStorage.removeItem('tempqueren');
    localStorage.removeItem('mypaymoney');
    localStorage.setItem("tempqueren", JSON.stringify(myqueren));
    localStorage.setItem("mypaymoney", String(readyList.totalPrice));


    let ws = new WebSocket("ws://hxsmallgame.cn:3002");

    ws.onerror = (evt) => { //指定报错时的回调
        alert("网络错误，请稍后重试");
        flagzhifu = false;
        return null;
    };

    ws.onopen = (evt) => {  //服务器连接成功后的回调
        console.log("Connect success");
        flagzhifu = true;
        ws.send(JSON.stringify(myjson));
        _locationToDianCanIndex();
        console.log("websocket发送完毕了！");
        ws.close()
    };

    ws.onmessage = (cb) => { //收到服务器数据 后的回调
        console.log("Received Message" + JSON.parse(cb.data));
    };

    ws.onclose = (evt) => { //连接关闭后的回调
        console.log("Connect closed")
    }
};

const _locationToDianCanIndex = () => {
    window.location.href = '../diancan.html';
};*/

/*//localStorage试验！
export const checkoutLocalStorage = () => {

};*/


/*

export const submit = () => {
    const time = new Date();
    const submitAction = {
        type: actionTypes.SUBMIT_INFO,
        name:
        money:

    }
};*/
