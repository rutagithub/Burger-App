import React, { Component } from "react"; 
import Order from "../../components/Order/Order";
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { Ingredients } from '../BurgerBuilder/BurgerBuilder';


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
}

// Order Interface
interface Order {
  id: number;
  ingredients: Ingredients;
  price: string;
}

class Orders extends Component<Props> {

  state = {
    orders: [],
    loading: true
  }

  componentDidMount(): void {
    axios.get('/orders.json')
      .then(res => {
        // console.log(res.data);
        const fetchedOrders = [];

        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        
        this.setState({loading: false, orders: fetchedOrders});
      })
      .catch(err => {
        this.setState({loading: false});
      });
  }

  render () {
    return (
      <div>
        {this.state.orders.map((order: Order) => (
          <Order 
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}/>
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);