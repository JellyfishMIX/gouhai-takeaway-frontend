import React, {Component} from "react";
import {connect} from 'react-redux';
import {actionCreators} from './store';
import {Redirect} from 'react-router-dom';
import {
    Container,
    ComponentTitle,
    OrderCommodityList,
    OrderCommodityListCrown,
    OrderCommodityItem,
    OrderOverview,
    OrderInfo
} from './style';

class SeeOrderDetail extends Component {
    render() {
        if (!this.props.isLogin) {
            return <Redirect to="/management/login"/>
        } else {
            return (
                <Container>
                    <ComponentTitle>
                        订单详情
                        <div className="line"/>
                    </ComponentTitle>
                    <OrderCommodityList>
                        <OrderCommodityListCrown>
                            <div className="commodity-name">商品名称</div>
                            <div className="unit-price">单价</div>
                            <div className="quantity">数量</div>
                            <div className="total-price">金额</div>
                        </OrderCommodityListCrown>
                        {
                            this.props.order.get('orderCommodityList') ? this.props.order.get('orderCommodityList').map((item) => {
                                return (
                                    <OrderCommodityItem key={item.get('orderCommodityId')}>
                                        <div className="commodity-name">{item.get('commodityName')}</div>
                                        <div className="unit-price">{item.get('unitPrice')}</div>
                                        <div className="quantity">{item.get('quantity')}</div>
                                        <div className="total-price">{item.get('totalPrice')}</div>
                                    </OrderCommodityItem>
                                )
                            }) : ''
                        }
                    </OrderCommodityList>
                    <OrderOverview>
                        <OrderInfo>姓名：{this.props.order.get('customerName')}</OrderInfo>
                        <OrderInfo>电话：{this.props.order.get('customerPhone')}</OrderInfo>
                        <OrderInfo className="datetime">日期：{this.props.order.get('createTime')}</OrderInfo>
                        <OrderInfo>地址：{this.props.order.get('customerAddr')}</OrderInfo>
                        <OrderInfo>总价：¥{this.props.order.get('totalPrice')}</OrderInfo>
                        <OrderInfo>送达：{this.props.order.get('isArrived') ? <div className="isArrivedTrue">是</div> : <div className="isArrivedFalse">否</div>}</OrderInfo>
                    </OrderOverview>
                </Container>
            )
        }
    }
    componentDidMount() {
        // 从props.location.state中拿到order对象，请注意：此处order为immutable对象
        this.props.loadOrderFromLocationState(this.props.location.state);
    }
}

const mapStateToProps = (state) => ({
    isLogin: state.getIn(['login', 'isLogin']),
    order: state.getIn(['seeOrderDetail', 'order'])
});

const mapDispatchToProps = (dispatch) => ({
    // 从props.location.state中拿到order对象，请注意：此处order为immutable对象
    loadOrderFromLocationState(order) {
        dispatch(actionCreators.loadOrderFromLocationState(order));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SeeOrderDetail);