import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { Ingredients } from '../../containers/BurgerBuilder/BurgerBuilder';

export const addIngredient = (
    name: string
): actionTypes.Add => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name,
    };
};

export const removeIngredient = (name: string): actionTypes.Remove => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (ingredients: Ingredients): actionTypes.Set => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = (): actionTypes.Fetch => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients = () => {
    return (dispatch: Function) => {
        axios
            .get(
                'https://burger-app-ts-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json'
            )
            .then((response) => {
                dispatch(setIngredients(response.data));
            })
            .catch((error) => {
                dispatch(fetchIngredientsFailed());
            });
    };
};