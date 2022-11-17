import { ReactNode } from 'react';
import './NavigationItem.css';
import { NavLink } from 'react-router-dom';

// Interfaces:
// properties interface
interface Props {
  link: string;
  children: ReactNode;
  exact?: boolean;
}

// Code
const navigationItem = (props: Props) => (
  <li className="NavigationItem">
    <NavLink
      to={props.link}
      exact={props.exact}
      activeClassName="active"
    >
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
