import React, { Component } from 'react';
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

class OrderSummary extends Component<Props> {

  componentWillUpdate() {
    console.log('[OrderSummary] Will Update');
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients: </p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
