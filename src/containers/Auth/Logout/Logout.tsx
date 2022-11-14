import React, { Component } from 'react';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Interfaces:
// Properties interface
interface Props {
  onLogout: Function;
}

class Logout extends Component<Props> {
  componentDidMount(): void {
    this.props.onLogout();
  }

  render () {
    return <Redirect to='/' />;
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(null, mapDispatchToProps)(Logout);