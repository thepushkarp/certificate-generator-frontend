import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron } from 'react-bootstrap';
import {
  Footer,
  Navigation,
  Home,
  Generate,
  VerifyPortal,
  Certificate,
} from './components';
import styles from './App.module.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      certificateData: null,
    };
  }

  render() {
    console.log(this.state);
    return (
      <>
        <Navigation />
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
              <Route path="/generate" exact component={() => <Generate />} />
              <Route
                path="/verify"
                exact
                component={() => (
                  <VerifyPortal setCertiState={this.setState.bind(this)} />
                )}
              />
              <Route path="/front/certificate/:id" exact component={Certificate} />
              <Route path="/" exact component={() => <Home />} />
            </Switch>
          </Router>
        </div>
        <Footer />
      </>
    );
  }
}

export default App;
