import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

// Interfaces:
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
  ingredients: Ingredients;
  totalPrice: number;
  error: boolean;
}

// interface for state
interface State {
  ingredients: Ingredients;
  burgerBuilder: Builder;
  error: boolean;
  totalPrice: number;
  auth: {
    token: string;
  }
}

// interface for properties
interface Props {
  ings: Ingredients;
  price: number;
  error: boolean;
  history: { push: Function };
  onIngredientAdded: Function;
  onIngredientRemoved: Function;
  onInitIngredients: Function;
  onInitPurchase: Function;
  isAuthenticated: boolean;
  onSetAuthRedirectPath: Function;
}

// Code
const BurgerBuilder = (props: Props) => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const ings = useSelector((state: State) => state.burgerBuilder.ingredients);

  const price = useSelector((state: State) => state.burgerBuilder.totalPrice);

  const error = useSelector((state: State) => state.burgerBuilder.error);

  const isAuthenticated = useSelector((state: State) => state.auth.token !== null);

 const onIngredientAdded = (ingName: string) => dispatch(actions.addIngredient(ingName));
 const onIngredientRemoved = (ingName: string) => dispatch(actions.removeIngredient(ingName));
 const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
 const onInitPurchase = () => dispatch(actions.purchaseInit());
 const onSetAuthRedirectPath = (path: string) => dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);


  const updatePurchaseState = (ingredients: Ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo: { [key: string]: number | boolean } = {
    ...ings,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;

  let burger = error ? (
    <p>Ingredients can't be loaded!</p>
  ) : (
    <Spinner />
  );

  if (ings) {
    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
          price={price}
        />
      </Aux>
    );

    orderSummary = (
      <OrderSummary
        ingredients={ings}
        price={price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  return (
    <Aux>
      <Modal
        show={purchasing}
        modalClosed={purchaseCancelHandler}
      >
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
}

export default withErrorHandler(BurgerBuilder, axios);
