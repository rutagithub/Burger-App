import React from "react";
import './DrawerToggle.css';

// Interfaces:
// Properties interface
interface Props {
  clicked?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const drawerToggle = (props: Props) => (
  <div
    className="DrawerToggle"
    onClick={props.clicked}
  >
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;