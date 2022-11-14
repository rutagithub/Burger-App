import React from "react";
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";


// Interfaces:
// Properties interface
interface Props {
  drawerToggleClicked: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isAuth: boolean;
 
}
const toolbar = (props: Props) => (
  <header className="Toolbar">
    <DrawerToggle clicked={props.drawerToggleClicked}/>
    <div className="LogoTool">
      <Logo />
    </div>

    <nav className="DesktopOnly">
      <NavigationItems isAuthenticated={props.isAuth}/>
    </nav>
  </header>
);

export default toolbar;
