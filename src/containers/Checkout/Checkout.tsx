import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { Ingredients } from '../BurgerBuilder/BurgerBuilder';
import { connect } from 'react-redux';

// Interfaces:
// checkout interface
interface CheckoutProps {
  ingredients: Ingredients;
  ings: Ingredients;
  history: {
    replace: Function;
    goBack: Function;
  };
  location: Function;
  entries: Function;
  query: Function;
  match: { path: Function };
  onInitPurchase: Function;
  purchased: boolean;
}

// checkout interface
interface Checkout {
  ingredients: Ingredients;
  purchased: boolean;
}

// state interface

interface State {
  burgerBuilder: Checkout;
  order: Checkout;
}

// Code
class Checkout extends Component<CheckoutProps> {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    let summary = <Redirect to='/' />;

    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;

      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state: State) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};



export default connect(mapStateToProps)(Checkout);
