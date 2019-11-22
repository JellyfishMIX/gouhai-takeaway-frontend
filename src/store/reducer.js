import {combineReducers} from 'redux-immutable';
import {reducer as headerReducer} from '../common/Header/store/index';
import {reducer as orderReducer} from '../pages/Order/store/index';
import {reducer as loginReducer} from '../pages/Login/store';
import {reducer as managementCommodityReducer} from '../pages/ManagementCommodity/store';
import {reducer as checkoutReducer} from '../pages/Checkout/store/index';
import {reducer as addCommodityReducer} from '../pages/AddCommodity/store';
import {reducer as seeOrderReducer} from '../pages/SeeOrder/store';
import {reducer as seeOrderDetailReducer} from '../pages/SeeOrderDetail/store';

const reducer = combineReducers({
    header: headerReducer,
    order: orderReducer,
    login: loginReducer,
    managementCommodity: managementCommodityReducer,
    checkout: checkoutReducer,
    addCommodity: addCommodityReducer,
    seeOrder: seeOrderReducer,
    seeOrderDetail: seeOrderDetailReducer
});

export default reducer;
