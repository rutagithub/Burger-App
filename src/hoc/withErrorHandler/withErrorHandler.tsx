import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilliary/Auxilliary';
import useHttpErrorHandler from '../../hooks/http-error-handler';

// Interfaces:
// Functions interface
interface Functions {
  eject: Function;
  use: Function;
}

// Interceptors interface
interface Interceptors {
  response: Functions;
  request: Functions;
}

// Axios interface
interface Axios {
  interceptors: Interceptors;
}

// Properties interface
interface Props { }


// Code
const withErrorHandler = (WrappedComponent: Function, axios: Axios) => {
  return (props: Props) => {
    
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Aux>
        <Modal
          show={error}
          modalClosed={clearError}
        >
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  }
};

export default withErrorHandler;
