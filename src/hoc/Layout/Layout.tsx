import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import Aux from '../Auxilliary/Auxilliary';
import './Layout.css';
import Toolbar from '../../components/Navigation/ToolBar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

// Interfaces:
// Properties interface
interface Props {
  showSideDrawer?: boolean;
  children: ReactNode;
  isAuthenticated: boolean;
}

// STate interface
interface State {
  isAuthenticated: boolean;
  auth: {
    token: string;
  }
}

// Code
class Layout extends Component<Props> {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState: Props) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar 
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className="Content">{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
