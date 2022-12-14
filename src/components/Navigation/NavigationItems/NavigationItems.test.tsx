import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'
import { Component } from 'react';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render two <NavigationItem /> elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three <NavigationItem /> elements if authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should render exact <NavigationItem /> elements if authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.contains(<NavigationItem link="/logout">Log Out</NavigationItem>)).toEqual(true);
  });
});