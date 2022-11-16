import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';


// Interfaces:
// auth form data interface
interface AuthForm {
    email: string;
    password: string;
}

// Properties interface
interface AuthProps extends RouteComponentProps {
    isSignup?: boolean;
    onAuth: Function;
    loading: boolean;
    error: { message?: string };
    isAuthenticated: boolean;
    authRedirectPath: string;
    buildingBurger: boolean;
    onSetAuthRedirectPath: Function;
}

interface Data {
    loading: boolean;
    error: { message: string; }
    token: string;
    authRedirectPath: string;
}

// Auth State interface 
interface AuthState {
    auth: Data;
    burgerBuilder: {
        building: boolean;
    }
}

// Code
const Auth = (props: AuthProps) => {

    const [authForm, setAuthForm] = useState({
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
    })

    const [isSignup, setIsSignUp] = useState(true);

    const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

    const inputChangedHandler = (event: ChangeEvent<HTMLInputElement>, controlName: string) => {
        const updatedControls = updateObject(authForm, {
            [controlName]: updateObject((authForm as any)[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, (authForm as any)[controlName].validation),
                touched: true
            })
        });
        setAuthForm(updatedControls as any);
    }

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignup);
    }

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignup);
    }

    const formElementsArray = [];

    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key as keyof AuthForm]
        });
    }

    let form = (
        <form onSubmit={submitHandler}>
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
                        inputChangedHandler(event, formElement.id)}
                />

            ))}
            <Button btnType="Success">SUBMIT</Button>
            <Button
                clicked={switchAuthModeHandler}
                btnType="Danger">SWITCH TO {isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
        </form>
    );

    if (props.loading) {
        form = <Spinner />
    }

    let errorMessage = null;

    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className="Auth">
            {authRedirect}
            {errorMessage}
            {form}
        </div>
    );
}


const mapStateToProps = (state: AuthState) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        onAuth: (email: string, password: string, isSignup: boolean) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);