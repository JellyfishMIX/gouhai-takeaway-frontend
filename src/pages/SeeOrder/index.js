import React, {Component, Fragment} from "react";
import {connect} from 'react-redux';
import {actionCreators} from './store';
import {Link} from "react-router-dom";
import {
    Container,
    ComponentTitle,
    Navigation,
    NavigationIsArrived,
    Order,
    OrderInfo,
    ButtonArea,
    SeeMore
} from './style';

class SeeOrder extends Component {
    render() {
        return (
            <Container>
                <ComponentTitle>
                    订单
                    <div className="line"/>
                </ComponentTitle>
                <Navigation>
                    <NavigationIsArrived onClick={() => {this.props.selectedArrivedFalse()}}><div className={this.props.isSelectedArrivedTrue ? '' : 'active'}>待派送</div></NavigationIsArrived>
                    <div className="column" />
                    <NavigationIsArrived onClick={() => {this.props.selectedArrivedTrue()}}><div className={this.props.isSelectedArrivedTrue ? 'active' : ''}>已送达</div></NavigationIsArrived>
                </Navigation>
                {
                    this.props.isSelectedArrivedFalse ? this.props.orderList.map((item) => {
                        if (!item.get('isArrived')) {
                            return (
                                <Order key={item.get('orderId')}>
                                    <OrderInfo>姓名：{item.get('customerName')}</OrderInfo>
                                    <OrderInfo>电话：{item.get('customerPhone')}</OrderInfo>
                                    <OrderInfo className="datetime">日期：{item.get('createTime')}</OrderInfo>
                                    <OrderInfo>地址：{item.get('customerAddr')}</OrderInfo>
                                    <OrderInfo>总价：¥{item.get('totalPrice')}</OrderInfo>
                                    <ButtonArea>
                                        <Link to={'/management/seeorderdetail'}>
                                            <SeeMore onClick={() => {this.pushOrderToSeeOrderDetail(item)}}>查看详情</SeeMore>
                                        </Link>
                                    </ButtonArea>
                                </Order>
                            )
                        } else {
                            return null;
                        }
                    }) : null
                }
                {
                    this.props.isSelectedArrivedTrue ? this.props.orderList.map((item) => {
                        if (item.get('isArrived')) {
                            return (
                                <Order key={item.get('orderId')}>
                                    <OrderInfo>姓名：{item.get('customerName')}</OrderInfo>
                                    <OrderInfo>电话：{item.get('customerPhone')}</OrderInfo>
                                    <OrderInfo className="datetime">日期：{item.get('createTime')}</OrderInfo>
                                    <OrderInfo>地址：{item.get('customerAddr')}</OrderInfo>
                                    <OrderInfo>总价：¥{item.get('totalPrice')}</OrderInfo>
                                    <ButtonArea>
                                        <Link to={'/management/seeorderdetail'}>
                                            <SeeMore onClick={() => {this.pushOrderToSeeOrderDetail(item)}}>查看详情</SeeMore>
                                        </Link>
                                    </ButtonArea>
                                </Order>
                            )
                        } else {
                            return null;
                        }
                    }) : null
                }
            </Container>
        )
    }
    componentDidMount() {
        // 从服务器加载订单列表
        this.props.loadOrderList();
    }

    // 把选中的order进行页面间传参
    pushOrderToSeeOrderDetail(item) {
        this.props.history.push({
            pathname: '/management/seeorderdetail',
            state: item
        })
    }
}

const mapStateToProps = (state) => ({
    orderList: state.getIn(['seeOrder', 'orderList']),
    isSelectedArrivedFalse: state.getIn(['seeOrder', 'isSelectedArrivedFalse']),
    isSelectedArrivedTrue: state.getIn(['seeOrder', 'isSelectedArrivedTrue'])
});

const mapDispatchToProps = (dispatch) => ({
    // 从服务器加载订单列表
    loadOrderList() {
        dispatch(actionCreators.loadOrderList());
    },

    // 选中"待派送"
    selectedArrivedFalse() {
        dispatch(actionCreators.selectedArrivedFalse());
    },

    // 选中"已送达"
    selectedArrivedTrue() {
        dispatch(actionCreators.selectedArrivedTrue());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SeeOrder);