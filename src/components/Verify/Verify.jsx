import clsx from 'clsx';
import React, { Component } from 'react';
import styles from '../../css/Verify.module.css';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

export class Verify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isRollno: true,
    };
  }

  render() {
    if (!this.state.isRollno) {
      return <Redirect to="/front/certificate/6534765453" />;
    } else {
      return (
        <React.Fragment>
          {!!this.state.data && !this.state.data.message ? (
            <React.Fragment>
              <h1>Certificates Found</h1>
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
                            href={`/front/certificate/${ele.cert_id
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
            </React.Fragment>
          ) : (
            <div>
              <h1>
                Enter the Roll Number of the student or the Certificate ID of the
                certificate
              </h1>
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  if (event.target[0].value.toString().includes('/')) {
                    this.props.history.push(
                      `/front/certificate/${event.target[0].value
                        .toString()
                        .trim()
                        .split('-')
                        .join('')
                        .split('/')
                        .join('-')}`
                    );
                  } else {
                    const test = new FormData();
                    test.append('id', `${event.target[0].value.toString().trim()}`);
                    const res = await fetch('https://cert-iiit.tk/get', {
                      method: 'POST',
                      body: test,
                    });
                    const json = await res.json();
                    this.setState({ data: json });
                  }
                }}
              >
                <label>Roll no : </label>
                <input className={styles.input} type="text" name="id" />
                <input
                  style={{ display: 'block' }}
                  className={clsx(styles.sub, styles.btn)}
                  type="submit"
                />
              </form>
            </div>
          )}
        </React.Fragment>
      );
    }
  }
}

export default withRouter(Verify);
