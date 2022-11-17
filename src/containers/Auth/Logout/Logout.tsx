import { useEffect } from 'react';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Interfaces:
// Properties interface
interface Props {
  onLogout: Function;
}

const Logout = (props: Props) => {
  const { onLogout } = props;

  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Redirect to='/' />;
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(null, mapDispatchToProps)(Logout);