import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions/actions';

// interface for ingredients
export interface Ingredients {
  salad: number;
  cheese: number;
  meat: number;
  bacon: number;
  [igKey: string]: number;
}

// interface for burger builder
interface Builder {
  ingredients: string;
  totalPrice: number;
  error: boolean;
}

// interface for state
interface State {
  ingredients: string;
  burgerBuilder: Builder;
  totalPrice: number;
}

// interface for state properties
interface StateProps {
  purchasing: boolean;
}

// interface for properties
interface Props {
  ings: Ingredients;
  price: number;
  error: boolean;
  history: { push: Function };
  onIngredientAdded: Function;
  onIngredientRemoved: Function;
}

class BurgerBuilder extends Component<Props> {
  state: any = {
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount(): void {
    console.log(this.props);

    // axios
    //   .get(
    //     'https://burger-app-ts-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json'
    //   )
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
  }

  updatePurchaseState(ingredients: Ingredients) {
    const sum: number = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo: { [key: string]: number | boolean } = {
      ...this.props.ings,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onIngredientAdded: (ingName: string) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName,
      }),
    onIngredientRemoved: (ingName: string) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
