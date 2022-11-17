import { useEffect } from "react";
import { connect } from 'react-redux';
import Order from "../../components/Order/Order";
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { Ingredients } from '../BurgerBuilder/BurgerBuilder';
import * as actions from '../../store/actions/index';
import Spinner from "../../components/UI/Spinner/Spinner";

// Interfaces:
// Properties interface 
export interface OrderProps {
  orders: { map: Function; }
  id: number;
  ingredients: Ingredients;
  price: string;
  loading: boolean;
  onFetchOrders: Function;
  token: string;
  userId: string;
}

// State interface
interface State {
  order: {
    orders: string;
    loading: boolean;
  },
  auth: {
    token: string;
    userId: string;
  };
}

// Code
const Orders = (props: OrderProps) => {

  const { onFetchOrders } = props;

  useEffect(() => {
    onFetchOrders(props.token, props.userId);
  }, [onFetchOrders])


  let orders: any = <Spinner />;

  if (!props.loading) {
    orders = props.orders.map((order: OrderProps) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));
  }
  return (<div>{orders}</div>);
}


const mapStateToProps = (state: State) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onFetchOrders: (token: string, userId: string) => dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));