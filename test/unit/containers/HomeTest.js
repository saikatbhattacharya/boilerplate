import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Body from '../../../src/containers/Body';
import { store } from '../stores/defaultMockStore';


describe('Home', () => {
  describe('render', () => {
    it('selectedKey must be equal to 0', () => {
      const storeProp = store({ navReducer: { selectedKey: 0 } });
      const wrapper = shallow(<Body store={storeProp} />);
      expect(wrapper.props().selectedKey).to.eql(0);
    });
    it('dispatch must be an function', () => {
      const storeProp = store({ navReducer: { selectedKey: 0, dispatch: () => {} } }, () => {});
      const wrapper = shallow(<Body store={storeProp} />);
      // console.log(wrapper.props());
      expect(wrapper.props().dispatch).to.eql(() => {});
    });
  });
});
