import React from 'react';
import Burger from '../../Burger/Burger';
import { Ingredients } from '../../../containers/BurgerBuilder/BurgerBuilder';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css';

// Interfaces:
// Properties interface
interface Props {
  checkoutContinued: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  checkoutCancelled: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  ingredients: Ingredients;
}

const checkoutSummary = (props: Props) => {
  return (
    <div className="CheckoutSummary">
      <h1>We hope it tastes well!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
