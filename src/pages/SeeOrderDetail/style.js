import styled from "styled-components";

const Container = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 92vh;
    background: #f2f2f2;
`;

const ComponentTitle = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 24px;
    color: #222;
    margin-bottom: 15px;
    .line {
        width: 100%;
        height: 2px;
        background: #f4c25b;
        border-radius: 1px;
    }
`;

const OrderCommodityList = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 355px;
    margin-top: 5px;
    margin-bottom: 5px;
    background: #fff;
    border-radius: 15px;
    padding: 15px;
    box-sizing: border-box;
    color: #222;
`;

const OrderCommodityListCrown = styled.div `
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 5px;
    .commodity-name {
        width: 140px;
        font-size: 18px;
    }
    .unit-price {
        width: 40px;
        font-size: 18px;
    }
    .quantity {
        width: 40px;
        font-size: 18px;
    }
    .total-price {
        width: 60px;
        font-size: 18px;
    }
`;

const OrderCommodityItem = styled.div `
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: 1px solid #777;
    border-radius: 10px;
    margin-top: 3px;
    margin-bottom: 3px;
    padding: 0 5px;
    .commodity-name {
        width: 140px;
        font-size: 18px;
    }
    .unit-price {
        width: 40px;
        font-size: 18px;
    }
    .quantity {
        width: 40px;
        font-size: 18px;
    }
    .total-price {
        width: 60px;
        font-size: 18px;
    }
`;

const OrderOverview = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 355px;
    margin-top: 5px;
    margin-bottom: 5px;
    background: #fff;
    border-radius: 15px;
    padding: 15px;
    box-sizing: border-box;
    color: #222;
    font-size: 18px;
`;

const OrderInfo = styled.div `
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 30px;
    font-size: 20px;
    color: #222;
    &.datetime {
        white-space: pre;
    }
`;

export {
    Container,
    ComponentTitle,
    OrderCommodityList,
    OrderCommodityListCrown,
    OrderCommodityItem,
    OrderOverview,
    OrderInfo
}