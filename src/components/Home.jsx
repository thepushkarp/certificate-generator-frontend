import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Button } from 'react-bootstrap';

class Home extends React.Component {
  render() {
    return (
      <Jumbotron align="center">
        <h1 className="display-4">Generate Certificates</h1>
        <p className="lead">
          This is the certificate generation site for Indian Institute of Information
          Technology, Vadodara
        </p>
        <hr className="my-4"></hr>
        {this.props.islogedIn ? (
          <React.Fragment>
            <p>Click here to generate the certificates!</p>
            <Link to="/generate">
              <Button variant="primary" size="lg">
                Generate!
              </Button>
            </Link>
          </React.Fragment>
        ) : null}
      </Jumbotron>
    );
  }
}

export default Home;
