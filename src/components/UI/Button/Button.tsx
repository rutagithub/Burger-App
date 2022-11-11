import React from "react";
import './Button.css';

// Interfaces:
// properties interface
interface Props {
  btnType: React.Key;
  clicked?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

// Code
const button = (props: Props) => (
  <button
    disabled={props.disabled}
    className={["Button", [props.btnType]].join(' ')}
    onClick={props.clicked}>{props.children}
  </button>
);

export default button;