import appConfig from '../../../../config/main';
import * as React from 'react';
import * as Helmet from 'react-helmet';
import { Header, AuthModal } from '../../components';
import { IUserState, IUserAction } from '../../models/user';
import { bindActionCreators } from 'redux';
import { startAuth, finishAuth, setUser, logout, setJwt }  from '../../redux/modules/user';
import Socket from '../../redux/socket';
const { connect } = require('react-redux');

interface IProps {
  user: IUserState;
  startAuth: Redux.ActionCreator<IUserAction>;
  finishAuth: Redux.ActionCreator<IUserAction>;
  setUser: Redux.ActionCreator<IUserAction>;
  setJwt: Redux.ActionCreator<IUserAction>;
  logout: Redux.ActionCreator<IUserAction>;
}

@connect(
  state => ({ user: state.user }),
  dispatch => bindActionCreators({
    startAuth,
    finishAuth,
    setUser,
    setJwt,
    logout,
  }, dispatch)
)
class App extends React.Component<IProps, void> {
  public componentWillMount() {
    const { user } = this.props;

    Socket.connect(user.jwt);
  }

  public render() {
    const { user, startAuth } = this.props;
    const s = require('./style.css');

    return (
      <section className={s.appContainer}>
        <Helmet {...appConfig.app} {...appConfig.app.head}/>
        <Header user={user} onLoginClick={startAuth} onLogoutClick={this.handleLogout.bind(this)}/>
        {this.props.children}
        <AuthModal
          show={user.isAuthenticating}
          onClose={this.onClose.bind(this)}
          onAuthComplete={this.handleAuthComplete.bind(this)}
          />
      </section>
    );
  }

  public handleAuthComplete(data) {
    const { finishAuth, setUser, setJwt } = this.props;

    setUser(data.user);
    setJwt(data.jwt);
    finishAuth();

    Socket.reconnect(data.jwt);
  }

  public handleLogout() {
    const { logout } = this.props;

    logout();
    Socket.reconnect();
  }

  public onClose() {
    this.props.finishAuth();
  }
}

export { App }
