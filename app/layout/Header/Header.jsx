import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, NavbarBrand, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import classNames from 'classnames';
// Importing these because the export from the module doesn't contain
// the child components, which breaks the serverside rendering if
// used the way the documentation wants us to.
import NavbarHeader from 'react-bootstrap/lib/NavbarHeader';
import NavbarCollapse from 'react-bootstrap/lib/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/lib/NavbarToggle';

class Header extends Component {
  render() {
    const { user } = this.props;

    return (
      <header>
        <Navbar fixedTop>
          <NavbarHeader>
            <NavbarBrand>
              <IndexLink to="/">Equestria.tv</IndexLink>
            </NavbarBrand>
            <NavbarToggle />
          </NavbarHeader>
          <NavbarCollapse>
            <Nav>
              <LinkContainer to="/messages">
                <NavItem eventKey={1} href="#">Messages</NavItem>
              </LinkContainer>
              <LinkContainer to="/channel">
                <NavItem eventKey={2} href="#">Channel</NavItem>
              </LinkContainer>
            </Nav>
            {user ? this.renderLoggedIn(user) : this.renderGuest()}
          </NavbarCollapse>
        </Navbar>
      </header>
    );
  }

  renderLoggedIn(user) {
    const { onLogoutClick } = this.props;

    return (
      <Nav pullRight>
        <NavDropdown
          eventKey={1}
          title={
            <span>
              <i className="fa fa-user" /> {user.username}
            </span>
          }>
          <MenuItem eventKey={1.1}>Profile</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={1.2} onClick={onLogoutClick}>
            <i className="fa fa-sign-out" /> Logout
          </MenuItem>
        </NavDropdown>
      </Nav>
    );
  }

  renderGuest() {
    const { isAuthenticating , onLoginClick } = this.props;

    return (
      <Nav pullRight>
        <NavItem eventKey={1} onClick={onLoginClick}>
          <i className={classNames({
            fa: true,
            'fa-fw': true,
            'fa-sign-in': !isAuthenticating,
            'fa-spinner': isAuthenticating,
            'fa-pulse': isAuthenticating
          })} />
          Sign in
        </NavItem>
      </Nav>
    );
  }
}

export default Header;
