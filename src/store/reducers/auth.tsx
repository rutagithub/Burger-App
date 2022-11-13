import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


// Interfaces:
// action interface
interface Action {
    userId: number;
    error: boolean;
    type: any;
    idToken: string;
}

// State interface
interface State {}

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const authStart = (state: State, action: Action) => {
    return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state: State, action: Action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
};

const authFail = (state: State, action: Action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state: State, action: Action) => {
    return updateObject(state, {
        token: null,
        userId: null
    });
};

const reducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);

        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);

        case actionTypes.AUTH_FAIL:
            return authFail(state, action);

        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);

        default:
            return state;
    }
};

export default reducer;