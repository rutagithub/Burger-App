import React from "react";
import burgerLogo from '../../assets/images/burger-logo.png';
import './Logo.css';

// Interfaces:
// Logo properties interface
interface Props {}

const logo = (props: Props) => (
  <div className="Logo">
    <img src={burgerLogo} alt="BurgerLogo" />
  </div>
);

export default logo;