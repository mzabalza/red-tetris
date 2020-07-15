import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Home from './Home';

import Rooms from './Rooms';



configure({ adapter: new Adapter() });

describe('<Home />', () => {
    it('should', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.find(Rooms));
    });
});