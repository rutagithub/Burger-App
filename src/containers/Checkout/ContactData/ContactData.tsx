import React, { Component } from "react";
import './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';


class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    // console.log(this.props.ingredients);
    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.state.price,
      customer: {
        name: "Ruta",
        address: {
          street: 'Test 1',
          zipCode: '454545',
          country: 'Lithuania'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      });

  }

  render() {
    return (
      <div className="ContactData">
        <h4>Enter Your Contact Data:</h4>
        <form>
          <input className="Input" type="text" name="name" placeholder="Your Name" />
          <input className="Input" type="email" name="email" placeholder="Your Email" />
          <input className="Input" type="text" name="street" placeholder="Street" />
          <input className="Input" type="text" name="postal" placeholder="Postal Code" />
          <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;