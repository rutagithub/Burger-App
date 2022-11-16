import React, { ReactNode } from "react";
import './BuildControl.css'

// Interfaces:
// Properties interface
interface Props {
  label: ReactNode;
  removed: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled: number | boolean;
  added: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const buildControl = (props: Props) => (
  <div className="BuildControl">
    <div className="Label">{props.label}</div>
    <button
      className="Less"
      onClick={props.removed}
      disabled={props.disabled === true ? props.disabled : false}>Less</button>
    <button
      className="More"
      onClick={props.added}>More</button>
  </div>
);

export default buildControl;
