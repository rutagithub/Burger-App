import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { Ingredients } from '../BurgerBuilder/BurgerBuilder';
import { connect } from 'react-redux';

// Interfaces:
// checkout interface
interface CheckoutProps extends RouteComponentProps {
  ingredients?: Ingredients;
  ings: Ingredients;
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
const Checkout = (props: CheckoutProps) => {


  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  let summary = <Redirect to='/' />;

  if (props.ings) {
    const purchasedRedirect = props.purchased ? <Redirect to='/' /> : null;

    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Route
          path={props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
}

const mapStateToProps = (state: State) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
