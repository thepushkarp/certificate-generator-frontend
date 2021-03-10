import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron } from 'react-bootstrap';
import {
  Footer,
  Navigation,
  Home,
  Generate,
  VerifyPortal,
  Certificate,
  Login,
} from './components';
import styles from './App.module.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      certificateData: null,
      loginToken: null,
      islogedIn: null,
    };
    this.handler = this.handler.bind(this);
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    const time = localStorage.getItem('time') | '';
    const loginToken = token === '' ? null : token;
    if (!!token && time < Date.now())
      this.setState({ ...this.state, loginToken, islogedIn: true });
  }
  componentDidMount() {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    const time = localStorage.getItem('time') | '';
    const loginToken = token === '' ? null : token;
    if (loginToken === null) {
      this.setState({
        ...this.state,
        islogedIn: false,
      });
    } else if (time < Date.now())
      this.setState({ ...this.state, loginToken, islogedIn: true });
  }
  handler(token, cTime) {
    this.setState({
      ...this.state,
      loginToken: token,
      time: cTime,
      islogedIn: true,
    });
    localStorage.setItem('token', token);
    localStorage.setItem('time', cTime);
  }

  render() {
    const x = () => {
      const token = localStorage.getItem('token')
        ? localStorage.getItem('token')
        : '';
      const time = localStorage.getItem('time') | '';
      // const loginToken = token === '' ? null : token;
      if (!!token && time < Date.now()) return true;
      return false;
    };
    return (
      <>
        <Navigation islogedIn={this.state.islogedIn} />
        <Jumbotron align="center" className={styles.contentMobile}>
          <h1 className="display-4">Generate Certificates</h1>
          <p className="lead">
            This is the certificate generation site for Indian Institute of
            Information Technology, Vadodara.
          </p>
          <p className="lead">You need to be on a computer to use this generator.</p>
        </Jumbotron>
        <div className={styles.contentDesktop}>
          <Router>
            <Switch>
              <Route path="/generate">
                {x() === false ? (
                  <Redirect to="/login" />
                ) : (
                  <Generate loginToken={this.state.loginToken} />
                )}
              </Route>
              <Route
                path="/verify"
                exact
                component={() => (
                  <VerifyPortal setCertiState={this.setState.bind(this)} />
                )}
              />
              <Route path="/certificate/:id" exact component={Certificate} />
              <Route path="/login">
                <Login handler={this.handler} islogedIn={this.state.islogedIn} />
              </Route>
              <Route
                path="/"
                exact
                component={() => <Home islogedIn={this.state.islogedIn} />}
              />
            </Switch>
          </Router>
        </div>
        <Footer />
      </>
    );
  }
}

export default App;
