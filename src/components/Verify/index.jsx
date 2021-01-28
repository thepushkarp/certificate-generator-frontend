import React from 'react';
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
    console.log(this.state);
    return (
      <div className={styles.root}>
        {this.state.toBeVerified ? (
          <Verify />
        ) : (
          <React.Fragment>
            <h1>Verify Certificates</h1>
            <p>
              This is the certificate verification site for Indian Institute of
              Information Technology, Vadodara
            </p>
            <hr />
            <p>Click here to verify the certificates!</p>
            <div
              className={styles.btn}
              onClick={() => {
                this.setState({
                  toBeVerified: true,
                });
              }}
            >
              Verify !
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default VerifyPortal;
