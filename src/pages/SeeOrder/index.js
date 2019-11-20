import React, {Component} from "react";
import {connect} from 'react-redux';
import {actionCreators} from './store';
import {
    Container,
    ComponentTitle,
    Order,
    OrderInfo,
    ButtonArea,
    DeleteButton
} from './style';

class SeeOrder extends Component {
    render() {
        return (
            <Container>
                <ComponentTitle>
                    订单
                    <div className="line"/>
                </ComponentTitle>
                {
                    this.props.orderList.map((item) => {
                        return (
                            <Order key={item.get('orderId')}>
                                <OrderInfo>姓名: {item.get('customerName')}</OrderInfo>
                                <OrderInfo>电话: {item.get('customerPhone')}</OrderInfo>
                                <OrderInfo>日期: {item.get('createTime')}</OrderInfo>
                                <OrderInfo>地址：{item.get('customerAddr')}</OrderInfo>
                                <OrderInfo>总价：¥{item.get('totalPrice')}</OrderInfo>
                                <ButtonArea>
                                    <DeleteButton>删除记录</DeleteButton>
                                </ButtonArea>
                            </Order>
                        )
                    })
                }
            </Container>
        )
    }
    componentDidMount() {
        this.props.loadOrderList();
    }
}

const mapStateToProps = (state) => ({
    orderList: state.getIn(['seeOrder', 'orderList'])
});

const mapDispatchToProps = (dispatch) => ({
    // 从服务器加载订单列表
    loadOrderList() {
        dispatch(actionCreators.loadOrderList());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SeeOrder);