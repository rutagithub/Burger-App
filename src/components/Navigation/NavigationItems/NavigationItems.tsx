import React from "react";
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

// Interfaces:
// Properties interface
interface Props {
  isAuthenticated?: boolean;
}

const navigationItems = (props: Props) => (
  <ul className="NavigationItems">
    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
    {!props.isAuthenticated
      ? <NavigationItem link="/auth">Authenticate</NavigationItem>
      : <NavigationItem link="/logout">Log Out</NavigationItem>}
  </ul>
);

export default navigationItems;