import React, { MouseEventHandler } from "react";
import './Backdrop.css';

// Interfaces:
// Properties interface
interface Props {
  // show?:{ message?: null } | (() => void) | null;
  // show: { error: {message: string} } | string | boolean | (() => void) | null;
  // show: { error: {message: string} } | string | boolean;
  show: boolean | null | Function;


  clicked: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  // clicked: MouseEventHandler<HTMLDivElement> | undefined;
}

// Code
const backdrop = (props: Props) => (
  props.show ? <div className="Backdrop" onClick={props.clicked}></div> : null
);

export default backdrop;