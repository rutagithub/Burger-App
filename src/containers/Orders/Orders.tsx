import React, { Component } from "react";
import { connect } from 'react-redux';
import Order from "../../components/Order/Order";
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { Ingredients } from '../BurgerBuilder/BurgerBuilder';
import * as actions from '../../store/actions/index';
import Spinner from "../../components/UI/Spinner/Spinner";


// Interfaces:
// Properties interface 
interface Props {
  orders: [
    {
      id: number;
      ingredients: Ingredients;
      price: number;
    }
  ];
  loading: boolean;
  onFetchOrders: Function;
  token: string;
  userId: string;
}

// Order Interface
interface Order {
  id: number;
  ingredients: Ingredients;
  price: any;
}

// orders interface
interface Orders {
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
class Orders extends Component<Props> {

  componentDidMount(): void {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders: any = <Spinner />;

    if (!this.props.loading) {
      orders = this.props.orders.map((order: Order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
    return (<div>{orders}</div>);
  }
}

const mapStateToProps = (state: Orders) => {
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