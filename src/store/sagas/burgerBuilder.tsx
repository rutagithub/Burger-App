import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import { Ingredients } from '../../containers/BurgerBuilder/BurgerBuilder';

// Interface
interface Response {
  data: Ingredients;
}

// Code
export function* initIngredientsSaga() {
  try {
    const response: Response = yield axios.get('https://burger-app-ts-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json');
    yield put(actions.setIngredients(response.data));
  } catch (error) {
    yield put(actions.fetchIngredientsFailed());
  }
}