import clsx from 'clsx';
import React, { Component } from 'react';
import styles from '../../css/Verify.module.css';

export class Verify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  render() {
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
                {this.state.data.certificates.map((ele) => {
                  return (
                    <tr>
                      <th className={styles.table_data}>{ele.name}</th>
                      <td className={styles.table_data}>{ele.event}</td>
                      <td className={styles.table_data}>{ele.year}</td>
                      <a href={`https://cert-iiit.tk/front/certificate/${ele.id}`}>
                        <td className={styles.table_data}>{ele.cert_id}</td>
                      </a>
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
                const test = new FormData(event.target);
                const res = await fetch('https://cert-iiit.tk/get', {
                  method: 'POST',
                  body: test,
                });
                const json = await res.json();
                this.setState({ data: json });
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

export default Verify;
