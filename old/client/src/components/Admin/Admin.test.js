import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Admin from './Admin';

import RoomsCrud from './tables/RoomsCrud';

// import GameModal from '../GameModal';


configure({ adapter: new Adapter() });

describe('<Admin />', () => {
    it('should', () => {
        const wrapper = shallow(<Admin />);
        expect(wrapper.find(RoomsCrud));
    });
});