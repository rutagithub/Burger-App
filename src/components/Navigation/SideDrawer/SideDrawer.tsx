import React from "react";
import './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from '../../../hoc/Auxilliary/Auxilliary';

// Interfaces:
// Properties interface
interface Props {
  open: boolean;
  closed: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

// Code
const sideDrawer = (props: Props) => {

  let attachedClasses = ["SideDrawer", "Close"];
  
  if (props.open) {
    attachedClasses = ["SideDrawer", "Open"];
  }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className="LogoSide">
          <Logo />
        </div>

        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;