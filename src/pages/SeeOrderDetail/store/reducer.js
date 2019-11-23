import * as constants from './constants';
import {fromJS} from 'immutable';

const defaultState = fromJS({
    order: {}
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.LOAD_ORDER_FROM_LOCATION_STATE:
            return state.set('order', action.order);

        default:
            return state;
    }
};