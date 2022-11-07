import React from 'react';
import './Modal.css';
import Aux from '../../../hoc/Auxilliary/Auxilliary';


// interface Props {
//   props: any,
//   children: any
// }

const modal = (props: any) => {
  return (
    <Aux>
      <div className='Modal'
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}>
        {props.children}
      </div>
      
    </Aux>
  );
};

export default modal;
