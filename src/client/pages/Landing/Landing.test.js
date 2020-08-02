import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Landing from './Landing';
import JoinForm from './JoinForm';

configure({ adapter: new Adapter() })

describe('<Landingd>', () => {
    it('should render <JoinForm>', () => {
        const wrapper = shallow(<Landing />);
        expect(wrapper.find(JoinForm)).toHaveLength(1);
    });

    // it('', {

    // })
})