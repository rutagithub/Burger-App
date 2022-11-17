import * as actionTypes from './actionTypes';
import { Ingredients } from '../../containers/BurgerBuilder/BurgerBuilder';

// Add ingredient
export const addIngredient = (
    name: string
): actionTypes.Add => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name,
    };
};

// Remove ingredient
export const removeIngredient = (name: string): actionTypes.Remove => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

// Set ingredients
export const setIngredients = (ingredients: Ingredients): actionTypes.Set => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

// Fetch failed
export const fetchIngredientsFailed = (): actionTypes.Fetch => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

// Initialize
export const initIngredients = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS
    }
};