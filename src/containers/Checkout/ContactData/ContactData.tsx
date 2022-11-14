import React, { ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';
import './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { Ingredients } from '../../BurgerBuilder/BurgerBuilder';
import * as actions from '../../../store/actions/index';
import { updateObject } from '../../../shared/utility';

// Interfaces:
//properties interface
interface Props {
  ingredients: Ingredients;
  ings: Ingredients;
  price: number;
  onOrderBurger: Function;
  loading: boolean;
  token: string;
  userId: string;
}

// contact form data interface
interface ContactForm {
  name: string;
  email: string;
  street: string;
  postalCode: string;
}

// contact form data state interface
interface State {
  orderForm: {};
  formIsValid: boolean;
}

// input rules interface
export interface InputRules {
  elementType: string;
  elementConfig: ElConfig;
  value: string;
  required: boolean;
  isValid: boolean;
  minLength: number;
  maxLength: number;
  validation: {
    required: boolean;
  };
}

// element configuration interface {
interface ElConfig {
  type: string;
  placeholder: string;
}

// event interface
interface Event {
  preventDefault: Function;
}

// data interface
interface Data {
  totalPrice: number;
  ings: Ingredients;
  ingredients: Ingredients;
  loading: boolean;
}

// data state interface 
interface DataState {
  burgerBuilder: Data;
  order: Data;
  auth: {
    token: string;
    userId: string;
  };
}

// Code
class ContactData extends Component<Props, State> {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },

      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      },
    },
    formIsValid: false
  };

  orderHandler = (event: Event) => {
    event.preventDefault();
    // console.log(this.props.ingredients);

    const formData: { [data: string]: string } = {};

    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier as keyof ContactForm] =
        this.state.orderForm[formElementIdentifier as keyof ContactForm].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId

    };

    this.props.onOrderBurger(order, this.props.token);
  };

  checkValidity(value: string, rules: InputRules) {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    return isValid;
  }

  inputChangedHandler = (
    event: ChangeEvent<HTMLInputElement>,
    inputIdentifier: string) => {
    // console.log(event.target.value);

    const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
      value: event.target.value,
      valid: this.checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
      touched: true
    });

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier] = updatedFormElement
    })

    let formIsValid = true;

    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    // console.log(formIsValid);
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key as keyof ContactForm]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event: React.ChangeEvent<HTMLInputElement>) =>
              this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className="ContactData">
        <h4>Enter Your Contact Data:</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state: DataState) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onOrderBurger: (orderData: number, token: string) => dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
