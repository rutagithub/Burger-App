import { Ingredients } from "../../containers/BurgerBuilder/BurgerBuilder";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const FETCH_INGREDIENTS_FAILED = "FETCH_INGREDIENTS_FAILED";

export const PURCHASE_BURGER_START = "PURCHASE_BURGER_START";
export const PURCHASE_BURGER_SUCCESS = "PURCHASE_BURGER_SUCCESS";
export const PURCHASE_BURGER_FAIL = "PURCHASE_BURGER_FAIL";
export const PURCHASE_INIT = "PURCHASE_INIT";

export const FETCH_ORDERS_START = "FETCH_ORDERS_START";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAIL = "FETCH_ORDERS_FAIL";

// Action interfaces

// Add ingredient action interface

export interface Add {
    type: typeof ADD_INGREDIENT;
    ingredientName: string;
}

// Remove Ingredient action interface

export interface Remove {
    type: typeof REMOVE_INGREDIENT;
    ingredientName: string;
}

// Set Ingredients action interface

export interface Set {
    type: typeof SET_INGREDIENTS;
    ingredients: Ingredients;
}

// Fetch Ingredients action interface

export interface Fetch {
    type: typeof FETCH_INGREDIENTS_FAILED
}

// All actions type

export type Action = Add | Remove | Set | Fetch;