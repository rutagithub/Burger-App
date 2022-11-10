import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { Ingredients } from '../BurgerBuilder/BurgerBuilder';
import { connect } from 'react-redux';

// checkout interface
interface checkoutProps {
  ingredients: Ingredients;
  ings: Ingredients;
  history: {
    replace: Function;
    goBack: Function;
  };
  location: {
    search: string;
  };
  entries: Function;
  query: Function;
  match: { path: Function };
}

// state interface

interface State {
  totalPrice: number;
  ingredients: Ingredients;
  price: number;
  purchased: boolean;
}

class Checkout extends Component<checkoutProps> {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData} />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};


export default connect(mapStateToProps)(Checkout);
