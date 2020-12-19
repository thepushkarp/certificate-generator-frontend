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
        <hr class="my-4"></hr>
        <p>Click here to generate the certificates!</p>
        <Link to="/generate">
          <Button variant="primary" size="lg" href="/generate/">
            Generate!
          </Button>
        </Link>
      </Jumbotron>
    );
  }
}

export default Home;
