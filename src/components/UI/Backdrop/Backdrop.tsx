import React from "react";
import './Backdrop.css';

// Interfaces:
// Properties interface
interface Props {
  show:{ message: string } | string | boolean;
  clicked?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

// Code
const backdrop = (props: Props) => (
  props.show ? <div className="Backdrop" onClick={props.clicked}></div> : null
);

export default backdrop;