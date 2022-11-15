import React from "react";
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

// Interfaces
// Properties interface
interface Props {
  price: number;
  ingredientAdded: Function;
  ingredientRemoved: Function;
  disabled: { [key: string]: boolean };
  purchasable: boolean;
  ordered: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isAuth: boolean;
}

// Code
const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = (props: Props) => (
  <div className="BuildControls">
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]} />
    ))}
    <button
      className="OrderButton"
      disabled={!props.purchasable}
      onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
  </div>
);

export default buildControls;