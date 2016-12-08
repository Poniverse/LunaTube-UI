import * as React from 'react';
import { /*Link,*/ IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, NavbarBrand, Nav, NavItem } from 'react-bootstrap';
import { IUserState } from '../../models/user';

interface IProps {
  user: IUserState;
  onLoginClick: Function;
  onLogoutClick: Function;
}

class Header extends React.Component<IProps, any> {
  public render() {
    const { user } = this.props;

    return (
      <header>
        <Navbar fixedTop>
          <Navbar.Header>
            <NavbarBrand>
              <IndexLink to="/">Equestria.tv</IndexLink>
            </NavbarBrand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/room">
                <NavItem>Room</NavItem>
              </LinkContainer>
            </Nav>
            {user.loggedInUser ? this.renderLoggedIn() : this.renderGuest()}
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }

  private renderLoggedIn() {
    const {user, onLogoutClick} = this.props;

    return (
      <Nav pullRight>
        <NavItem eventKey={1}>Welcome, {user.loggedInUser.name}</NavItem>
        <NavItem eventKey={2} onClick={onLogoutClick}>
          Logout
        </NavItem>
      </Nav>
    );
  }

  private renderGuest() {
    const { onLoginClick } = this.props;

    return (
      <Nav pullRight>
        <NavItem eventKey={1} href="#" onClick={onLoginClick}>Sign In</NavItem>
      </Nav>
    );
  }
}

export { Header }
