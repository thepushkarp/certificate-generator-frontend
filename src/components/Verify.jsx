import clsx from 'clsx';
import React, { Component } from 'react';
import styles from '../css/Verify.module.css';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { message, fail } from '../css/FrontCertificate.module.css';
import { Jumbotron, Button } from 'react-bootstrap';

export class Verify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isRollno: true,
    };
  }

  render() {
    console.log(this.state);
    if (!this.state.isRollno) {
      return <Redirect to="/certificate/6534765453" />;
    } else {
      return (
        <React.Fragment>
          {!!this.state.data && !this.state.data?.message ? (
            <React.Fragment>
              <Jumbotron align="center">
                <h1 className="display-4">Certificates Found</h1>
                <table className={styles.table}>
                  <thead className={styles.table_header}>
                    <tr>
                      <th className={styles.table_data}>Name</th>
                      <th className={styles.table_data}>Event</th>
                      <th className={styles.table_data}>Year</th>
                      <th className={styles.table_data}>Certificate ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.certificates.map((ele, index) => {
                      return (
                        <tr key={index}>
                          <th className={styles.table_data}>{ele.name}</th>
                          <td className={styles.table_data}>{ele.event}</td>
                          <td className={styles.table_data}>{ele.year}</td>
                          <td className={styles.table_data}>
                            <a
                              href={`/certificate/${ele.cert_id
                                .toString()
                                .trim()
                                .split('-')
                                .join('_')
                                .split('/')
                                .join('-')}`}
                            >
                              {ele.cert_id}
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Jumbotron>
            </React.Fragment>
          ) : this.state.data?.message ? (
            <Jumbotron align="center">
              <p className={clsx(message, fail)}>Sorry, this ID does not exist</p>
            </Jumbotron>
          ) : (
            <Jumbotron align="center">
              <h1 className="display-5">
                Enter the Roll Number of the student or the Certificate ID of the
                certificate
              </h1>
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  if (event.target[0].value.toString().includes('/')) {
                    this.props.history.push(
                      `/certificate/${event.target[0].value
                        .toString()
                        .trim()
                        .split('-')
                        .join('_')
                        .split('/')
                        .join('-')}`
                    );
                  } else {
                    const test = new FormData();
                    test.append('id', `${event.target[0].value.toString().trim()}`);
                    const res = await fetch('https://cert-iiit.ml/get', {
                      method: 'POST',
                      body: test,
                    });
                    const json = await res.json();
                    this.setState({ data: json });
                  }
                }}
              >
                <label>Roll no: </label>
                <input className={styles.input} type="text" name="id" />
                <br />
                <Button variant="primary" size="lg" type="submit" className="ml-3">
                  Submit
                </Button>
              </form>
            </Jumbotron>
          )}
        </React.Fragment>
      );
    }
  }
}

export default withRouter(Verify);
