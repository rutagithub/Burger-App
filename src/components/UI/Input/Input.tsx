import React, { ReactNode } from 'react';
import './Input.css';

// Interfaces:
// input properties interface
interface InputProps {
  elementConfig: any;
  value: string | number;
  label?: string;
  elementType: string | number;
  changed: any;
  invalid: boolean;
  shouldValidate: boolean;
  touched: boolean;
}

// input option  interface
interface InputOption {
  value: string | number;
  displayValue: ReactNode;
}

// code
const input = (props: InputProps) => {
  let inputElement = null;
  const inputClasses = ["InputElement"];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push('Invalid');
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case ('textarea'):
      inputElement = (
        <textarea
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case ('select'):
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option: InputOption) => (
            <option
              key={option.value}
              value={option.value}
              onChange={props.changed}
            >
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
        <input
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
