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

const Order = styled.div `
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

const ButtonArea = styled.div `
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    width: 100%;
    height: 30px;
`;

const SeeMore = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 34px;
    color: #fff;
    background: #f4c25b;
    border-radius: 8px;
`;

export {
    Container,
    ComponentTitle,
    Order,
    OrderInfo,
    ButtonArea,
    SeeMore
}