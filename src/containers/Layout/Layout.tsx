import React from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import './Layout.css';

const layout = (props: any) => (
  <Aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className='Content'>
      {props.children}
    </main>
  </Aux>
);

export default layout;