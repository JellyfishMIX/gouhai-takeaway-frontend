import React, {Component} from "react";
import {connect} from 'react-redux';
import {actionCreators} from './store';
import {
    Container,
    ComponentTitle,
    OrderCommodityList,
    OrderCommodity
} from './style';

class SeeOrderDetail extends Component {
    render() {
        return (
            <Container>
                <ComponentTitle>
                    订单详情
                    <div className="line"/>
                </ComponentTitle>
                <OrderCommodityList>
                    {
                        this.props.order.get('orderCommodityList') ? this.props.order.get('orderCommodityList').map((item) => {
                            return (
                                <div>hello, world!</div>
                            )
                        }) : ''
                    }
                </OrderCommodityList>
            </Container>
        )
    }
    componentDidMount() {
        // 从props.location.state中拿到order对象，请注意：此处order为immutable对象
        this.props.loadOrderFromLocationState(this.props.location.state);
    }
}

const mapStateToProps = (state) => ({
    order: state.getIn(['seeOrderDetail', 'order'])
});

const mapDispatchToProps = (dispatch) => ({
    // 从props.location.state中拿到order对象，请注意：此处order为immutable对象
    loadOrderFromLocationState(order) {
        dispatch(actionCreators.loadOrderFromLocationState(order));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SeeOrderDetail);