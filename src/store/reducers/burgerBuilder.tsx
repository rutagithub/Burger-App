import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { Action } from '../actions/actionTypes';
import { Ingredients } from '../../containers/BurgerBuilder/BurgerBuilder';

// interfaces:
// state props interface
interface StateProps {
  totalPrice: number;
  ingredients: any;
  error: boolean;
}

// action props interface
interface ActionProps {
  ingredients: Ingredients;
}

// actions props interface
interface ActionsProps {
  ingredientName: string;
}

// fetch failed action props interface
interface ActionFailed {}

// Code
const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES: Ingredients = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7,
};

// Add ingredient
const addIngredient = (state: StateProps, action: ActionsProps) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedState);
};

// Remove ingredient
const removeIngredient = (state: StateProps, action: ActionsProps) => {
  const updatedIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedSt);
};

// Set ingredients
const setIngredients = (state: StateProps, action: ActionProps) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: false,
    building: false,
  });
};

// Fetch ingredients failed
const fetchIngredientsFailed = (state: StateProps, action: ActionFailed) => {
  return updateObject(state, { error: true });
};

// Reducer
const reducer = (state: StateProps = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);

    default:
      return state;
  }
};

export default reducer;
