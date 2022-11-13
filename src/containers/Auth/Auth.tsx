import React, { ChangeEvent, Component, FormEvent } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import './Auth.css';
import { InputRules } from "../Checkout/ContactData/ContactData";
import * as actions from '../../store/actions/index';
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";


// Interfaces:
// auth form data interface
interface AuthForm {
    email: string;
    password: string;
}

// Properties interface
interface Props {
    isSignup: boolean;
    onAuth: Function;
    loading: boolean;
    error: any;
}

interface Data {
    loading: boolean;
    error: boolean;
}

// Auth State interface 
interface AuthState {
    // loading: boolean;
    auth: Data;

}

// state interface 
interface State {
    controls: {};
    isSignup: boolean;
    
}

// Code
class Auth extends Component<Props, State> {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },

            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

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

    inputChangedHandler = (event: ChangeEvent<HTMLInputElement>, controlName: string) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState((prevState) => {
            return {
                isSignup: !prevState.isSignup
            };
        });
    }

    render() {
        const formElementsArray = [];

        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key as keyof AuthForm]
            });
        }

        let form = (
            <form onSubmit={this.submitHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event: ChangeEvent<HTMLInputElement>) =>
                            this.inputChangedHandler(event, formElement.id)}
                    />

                ))}
                <Button btnType="Success">SUBMIT</Button>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        return (
            <div className="Auth">
                {errorMessage}
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state: AuthState) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        onAuth: (email: string, password: string, isSignup: boolean) => dispatch(actions.auth(email, password, isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);