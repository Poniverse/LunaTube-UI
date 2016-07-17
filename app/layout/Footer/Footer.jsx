import React, { Component, PropTypes } from 'react';
import './Footer.scss';

class Footer extends Component {
  render() {
    return (
      <footer>
        <p className="text-muted credit">
          Copyright © 2013-2016 <a href="https://poniverse.net" target="_blank">Poniverse</a>
          &nbsp; &middot; &nbsp;
          <a href="https://github.com/Poniverse/LunaTube" target="_blank">
            GitHub
          </a>
        </p>
      </footer>
    )
  }
}

export default Footer;
