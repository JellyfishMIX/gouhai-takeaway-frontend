import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {
    Container,
    ButtonTitle,
    Commodity,
    CommodityButton,
    Order,
    OrderButton
} from "./style";

class Management extends Component{
    render() {
        if (!this.props.isLogin) {
            return <Redirect to="/management/login" />
        } else {
            return (
                <Container>
                    <Commodity>
                        <ButtonTitle>商品控制</ButtonTitle>
                        <Link to="/management/commodity">
                            <CommodityButton>商品管理</CommodityButton>
                        </Link>
                        <Link to="/management/addcommodity">
                            <CommodityButton>添加商品</CommodityButton>
                        </Link>
                    </Commodity>
                    <Order>
                        <ButtonTitle>订单管理</ButtonTitle>
                        <Link to="/management/seeorder">
                            <OrderButton>查看订单</OrderButton>
                        </Link>
                    </Order>
                </Container>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    isLogin: state.getIn(['login', 'isLogin'])
});

export default connect(mapStateToProps, null)(Management);