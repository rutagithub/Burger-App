import React, { Component } from "react";
// import Input from "../../components/UI/Input/Input";
// import Button from "../../components/UI/Button/Button";


// // Interfaces:
// // auth form data interface
// interface AuthForm {
//     email: string;
//     password: string;
// }

// // State interface 
// // interface State {
// //     orderForm: {};
// // }

// // Code
// class Auth extends Component {
//     state = {
//         controls: {
//             email: {
//                 elementType: 'input',
//                 elementConfig: {
//                     type: 'email',
//                     placeholder: 'Email',
//                 },
//                 value: '',
//                 validation: {
//                     required: true,
//                     isEmail: true
//                 },
//                 valid: false,
//                 touched: false,
//             },

//             password: {
//                 elementType: 'input',
//                 elementConfig: {
//                     type: 'password',
//                     placeholder: 'Password',
//                 },
//                 value: '',
//                 validation: {
//                     required: true,
//                     minLength: 6
//                 },
//                 valid: false,
//                 touched: false,
//             },
//         }
//     }

//     render() {
//         const formElementsArray = [];

//         for (let key in this.state.controls) {
//             formElementsArray.push({
//                 id: key,
//                 config: this.state.controls[key as keyof AuthForm],
//             });
//         }

//         const form = formElementsArray.map(formElement => (
//             <Input
//                 key={formElement.id}
//                 elementType={formElement.config.elementType}
//                 elementConfig={formElement.config.elementConfig}
//                 value={formElement.config.value}
//                 invalid={!formElement.config.valid}
//                 shouldValidate={formElement.config.validation}
//                 touched={formElement.config.touched}
//                 changed={(event: React.ChangeEvent<HTMLInputElement>) =>
//                     this.inputChangedHandler(event, formElement.id)} />
//         ));
//         return (
//             <div>
//                 <form>

//                 </form>
//             </div>
//         );
//     }
// }

// export default Auth;