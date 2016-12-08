import * as React from 'react';
const s = require('./style.css');

class Home extends React.Component<any, any> {
  public render() {
    return (
      <div className={s.home}>
        <img src={require('./logo.svg')} />
        <p>Equestria.tv!</p>
      </div>
    );
  }
}

export { Home }
