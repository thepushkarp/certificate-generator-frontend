import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Button } from 'react-bootstrap';

class Home extends React.Component {
  render() {
    return (
      <Jumbotron align="center">
        <h1 className="display-4">Verify Certificates</h1>
        <p className="lead">
          This is the certificate verification site for Indian Institute of
          Information Technology Vadodara
        </p>
        <hr className="my-4"></hr>
        <p>Click here to verify the certificates!</p>
        <Link to="/verify">
          <Button variant="primary" size="lg">
            Verify
          </Button>
        </Link>
      </Jumbotron>
    );
  }
}

export default Home;
