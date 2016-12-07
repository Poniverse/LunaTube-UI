import { expect } from 'chai';
import { renderComponent } from '../../helpers/TestHelper';
import { Home } from './index';

describe('<Home />', () => {

  const component = renderComponent(Home);

  it('Renders with correct style', () => {
    const s = require('./style.css');
    expect(component.find(s.home)).to.exist;
  });

  it('Renders Logo', () => {
    expect(component.find('img')).to.exist;
  });

  it('Has a p element that says Equestria.tv!', () => {
    expect(component.find('p').first().text()).eql('Equestria.tv!');
  });

});
