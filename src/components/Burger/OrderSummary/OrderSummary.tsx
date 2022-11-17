import React from 'react';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';
import { Ingredients } from '../../../containers/BurgerBuilder/BurgerBuilder';

// Properties interface
interface Props {
  ingredients: Ingredients;
  price: number;
  purchaseCancelled: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  purchaseContinued: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const OrderSummary = (props: Props) => {

  const ingredientSummary = Object.keys(props.ingredients).map(
    (igKey) => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
          {props.ingredients[igKey]}
        </li>
      );
    }
  );

  return (
    <Aux>
      <h3>Your Order</h3>

      <p>A delicious burger with the following ingredients: </p>

      <ul>{ingredientSummary}</ul>

      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>

      <p>Continue to Checkout?</p>

      <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>

      <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </Aux>
  );
}

export default OrderSummary;
