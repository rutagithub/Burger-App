import { ReactNode, useState } from 'react';
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
const Layout = (props: Props) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible}
        closed={sideDrawerClosedHandler}
      />
      <main className="Content">{props.children}</main>
    </Aux>
  );
}

const mapStateToProps = (state: State) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
