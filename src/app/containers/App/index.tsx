import appConfig from '../../../../config/main';
import * as React from 'react';
import * as Helmet from 'react-helmet';
import { Header, AuthModal } from '../../components';
import { IUserState, IUser, IUserAction } from '../../models/user';
import { bindActionCreators } from 'redux';
const { connect } = require('react-redux');
import { startAuth, finishAuth, setUser, logout }  from '../../redux/modules/user';

interface IProps {
  user: IUserState;
  startAuth: Redux.ActionCreator<IUserAction>;
  finishAuth: Redux.ActionCreator<IUserAction>;
  setUser: Redux.ActionCreator<IUserAction>;
  logout: Redux.ActionCreator<IUserAction>;
}

@connect(
  state => ({ user: state.user }),
  dispatch => bindActionCreators({
    startAuth,
    finishAuth,
    setUser,
    logout,
  }, dispatch)
)
class App extends React.Component<IProps, void> {
  public render() {
    const { user, startAuth, logout } = this.props;
    const s = require('./style.css');

    return (
      <section className={s.appContainer}>
        <Helmet {...appConfig.app} {...appConfig.app.head}/>
        <Header user={user} onLoginClick={startAuth} onLogoutClick={logout}/>
        {this.props.children}
        <AuthModal
          show={user.isAuthenticating}
          onClose={this.onClose.bind(this)}
          onAuthComplete={this.handleAuthComplete.bind(this)}
          />
      </section>
    );
  }

  public handleAuthComplete(user?: IUser) {
    const { finishAuth, setUser } = this.props;

    setUser(user);
    finishAuth();
  }

  public onClose() {
    this.props.finishAuth();
  }
}

export { App }
