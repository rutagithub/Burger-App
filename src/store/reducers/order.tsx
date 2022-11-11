import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

// Interfaces:
// action Interface
interface Action {
    type: Concat;
    orders: number;
    orderData: number;
    orderId: number;
}

// concat interface
interface Concat {
    concat: Function;
}

// orders state interface
interface State {
    orders: Concat;
}

// code
const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

// Purchase Init
const purchaseInit = (state: State, action: Action) => {
    return updateObject(state, {purchased: false});
};

// Purchase start
const purchaseBurgerStart = (state: State, action: Action) => {
    return updateObject(state, {loading: true});
};

// Purchase success
const purchaseBurgerSuccess = (state: State, action: Action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId});
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
};

// Purchase fail
const purchaseBurgerFail = (state: State, action: Action) => {
    return updateObject(state, {loading: false});
};

// Fetch start
const fetchOrdersStart = (state: State, action: Action) => {
    return updateObject(state, {loading: true});
};

// Fetch success
const fetchOrdersSuccess = (state: State, action: Action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
};

// Fetch fail
const fetchOrdersFail = (state: State, action: Action) => {
    return updateObject(state, {loading: false});
};

// Reducer
const reducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return purchaseInit (state, action);

        case actionTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStart (state, action);

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess (state, action);

        case actionTypes.PURCHASE_BURGER_FAIL:
            return purchaseBurgerFail (state, action);

        case actionTypes.FETCH_ORDERS_START:
            return fetchOrdersStart (state, action);

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccess (state, action);
            
        case actionTypes.FETCH_ORDERS_FAIL:
            return fetchOrdersFail (state, action);
            
        default:
            return state;
    }
};

export default reducer;