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
  }
}

// Code
class Orders extends Component<Props> {

  componentDidMount(): void {
    this.props.onFetchOrders();
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
    loading: state.order.loading
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));