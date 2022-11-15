import React, { ReactNode } from 'react';
import './Modal.css';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Backdrop from '../Backdrop/Backdrop';

interface Props {
  // show?: { message?: null } | (() => void) | null | boolean;
  show?: { message: string } | string | boolean;
  modalClosed: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children: ReactNode;
}
const Modal = (props: Props) => {

  return (
    <Aux>
      <Backdrop
        show={props.show}
        clicked={props.modalClosed}
      />
      <div
        className='Modal'
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}>
        {props.children}
      </div>
    </Aux>
  );
}


export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
