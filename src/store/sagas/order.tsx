import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';

interface Response {
  data: any;
}



export function* purchaseBurgerSaga(action: any) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response: Response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
    yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData))
  } catch (error: any) {
    yield put(actions.purchaseBurgerFail(error));

  }
  
}

export function* fetchOrdersSaga(action: any) {
  
  yield put(actions.fetchOrdersStart());

  const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';

  try {
     const response: Response = yield axios.get('/orders.json' + queryParams);

     const fetchedOrders = [];

          for (let key in response.data) {
              fetchedOrders.push({
                  ...response.data[key],
                  id: key
              });
          }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
          
  } catch (error: any) {
    yield put(actions.fetchOrdersFail(error));
  }
}