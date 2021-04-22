import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Footer,
  Navigation,
  Home,
  Generate,
  Verify,
  Certificate,
  Login,
} from './components';

class App extends React.Component {
  constructor(props) {
    super(props);

    const loginToken = localStorage.getItem('token') ?? null;
    const time = localStorage.getItem('time') | '';
    const loginCheck = Boolean(!!loginToken && time < Date.now());

    this.state = {
      loginToken: loginToken,
      islogedIn: loginCheck,
    };

    this.handler = this.handler.bind(this);
  }

  componentDidMount() {
    const loginToken = localStorage.getItem('token') ?? null;
    const time = localStorage.getItem('time') | '';
    if (loginToken === null) {
      this.setState({
        islogedIn: false,
      });
    } else if (time < Date.now()) this.setState({ loginToken, islogedIn: true });
  }

  handler(token, cTime) {
    this.setState({
      loginToken: token,
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
      if (!!token && time < Date.now()) return true;
      return false;
    };

    return (
      <>
        <Navigation islogedIn={this.state.islogedIn} />
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
              component={() => <Verify setCertiState={this.setState.bind(this)} />}
            />
            <Route path="/certificate/:id" exact component={Certificate} />
            <Route path="/login">
              <Login handler={this.handler} islogedIn={this.state.islogedIn} />
            </Route>
            <Route path="/" exact component={() => <Home />} />
          </Switch>
        </Router>
        <Footer />
      </>
    );
  }
}

export default App;
