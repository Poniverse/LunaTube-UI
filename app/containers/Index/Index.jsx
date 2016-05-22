import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Index extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/messages">Messages</Link>
          </li>
          <li>
            <Link to="/channel">Video</Link>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(Index);
