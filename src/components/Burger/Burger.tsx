import React from "react";
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { Ingredients } from '../../containers/BurgerBuilder/BurgerBuilder';

interface BurgerProps {
  ingredients: Ingredients;
}

const burger = (props: BurgerProps) => {

  console.log(props);
  
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);
  
  // console.log(transformedIngredients);

  if (transformedIngredients.length === 0) {
    (transformedIngredients as any) = <p>Please start adding ingredients!</p>;
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