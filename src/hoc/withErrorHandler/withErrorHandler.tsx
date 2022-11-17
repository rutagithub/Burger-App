import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilliary/Auxilliary';
import useHttpErrorHandler from '../../hooks/http-error-handler';
import { RouteComponentProps } from 'react-router-dom';
import { Interceptors } from '../../hooks/http-error-handler';

// Interfaces:
// Axios interface
interface Axios {
  interceptors: Interceptors;
}

// Properties interface
interface Props extends RouteComponentProps {
}

// Code
const withErrorHandler = (WrappedComponent: Function, axios: Axios) => {
  return (props: Props) => {

    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Aux>
        <Modal
          show={error}
          modalClosed={clearError as any}
        >
          {error ? (error as any).message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  }
};

export default withErrorHandler;
