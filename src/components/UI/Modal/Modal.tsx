import React, { Component } from 'react';
import './Modal.css';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Backdrop from '../Backdrop/Backdrop';

interface Props {
  show: { message: string } | string | boolean;
  modalClosed:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
  children: React.ReactNode;
}
class Modal extends Component<Props> {

  shouldComponentUpdate(nextProps: Props, nextState: Props) {
      return nextProps.show !== this.props.show;
  }

  componentWillUpdate () {
    console.log("[Modal] Will Update")
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div className='Modal'
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.props.children}
        </div>

      </Aux>
    );
  }
} 

export default Modal;
