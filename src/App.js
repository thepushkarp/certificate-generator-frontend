import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron } from 'react-bootstrap';
import { UserAgentProvider, UserAgent } from '@quentin-sommer/react-useragent';
import { Footer, Navigation, Home, Generate } from './components';

class App extends React.Component {
  render() {
    return (
      <>
        <Navigation />

        <UserAgentProvider ua={window.navigator.userAgent}>
          <div>
            <UserAgent mobile tablet>
              <Jumbotron align="center">
                <h1 className="display-4">Generate Certificates</h1>
                <p className="lead">
                  This is the certificate generation site for Indian Institute of
                  Information Technology, Vadodara.
                </p>
                <p className="lead">
                  You need to be on a computer to use this generator.
                </p>
              </Jumbotron>
            </UserAgent>
            <UserAgent computer>
              <Router>
                <Switch>
                  <Route path="/" exact component={() => <Home />} />
                  <Route path="/generate" exact component={() => <Generate />} />
                </Switch>
              </Router>
            </UserAgent>
          </div>
        </UserAgentProvider>

        <Footer />
      </>
    );
  }
}

export default App;
