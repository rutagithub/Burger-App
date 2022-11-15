// import React from "react";
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { Ingredients } from '../../containers/BurgerBuilder/BurgerBuilder';

// Interfaces:
// Burger Properties interface
interface Props {
  ingredients: Ingredients;
}

const burger = (props: Props) => {

  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = [<p key={"1"}>Please start adding ingredients!</p>];
  }

  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;