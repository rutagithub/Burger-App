import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilliary/Auxilliary';


interface Functions {
  eject: Function;
  use: Function;
}

interface Interceptors {
  response: Functions;
  request: Functions;
}

interface Axios {
  interceptors: Interceptors;
}

interface Props {}

const withErrorHandler = (WrappedComponent: Function, axios: Axios) => {
  return class extends Component<Props> {
    state = {
      error: {
        message: 'Something went wrong',
      },
    };

    reqInterceptor?: Interceptors;
    resInterceptor?: Interceptors;

    componentWillMount(): void {
      this.reqInterceptor = axios.interceptors.request.use((req: Props) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res: Props) => res,
        (error: Props) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount(): void {
      console.log("Will Unmount", this.reqInterceptor, this.resInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
