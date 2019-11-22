import React, {Component} from "react";
import {connect} from 'react-redux';
import {actionCreators} from './store';
import {Link} from "react-router-dom";
import {
    Container,
    ComponentTitle,
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
                {
                    this.props.orderList.map((item) => {
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
                    })
                }
            </Container>
        )
    }
    componentDidMount() {
        // 从服务器加载订单列表
        this.props.loadOrderList();
    }

    pushOrderToSeeOrderDetail(item) {
        this.props.history.push({
            pathname: '/management/seeorderdetail',
            state: item
        })
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