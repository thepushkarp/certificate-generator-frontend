import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import styles from '../../css/Verify.module.css';
import Verify from './Verify';

class VerifyPortal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toBeVerified: false,
    };
  }

  render() {
    return (
      <Jumbotron>
        {this.state.toBeVerified ? (
          <Verify setCertiState={this.props.setCertiState} />
        ) : (
          <div className="my-3" align="center">
            <h1>Verify Certificates</h1>
            <p>
              This is the certificate verification site for Indian Institute of
              Information Technology, Vadodara
            </p>
            <hr />
            <p>Click here to verify the certificates!</p>
            <Button
              variant="primary"
              size="lg"
              type="submit"
              onClick={() => {
                this.setState({
                  toBeVerified: true,
                });
              }}
            >
              Verify!
            </Button>
          </div>
        )}
      </Jumbotron>
    );
  }
}

export default VerifyPortal;
