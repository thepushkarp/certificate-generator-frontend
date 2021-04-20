import React, { useEffect, useState } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import styles from '../css/FrontCertificate.module.css';
import clsx from 'clsx';

const Certificate = ({ match, location }) => {
  const [state, setstate] = useState({
    certificate: {
      id: '',
      cert_id: '',
      rollno: '',
      event: '',
      year: '',
      name: '',
      file: '',
      date: '',
    },
  });

  useEffect(() => {
    // console.log(match);
    const fetchData = async () => {
      const test = new FormData();
      test.append('id', match.params.id.split('-').join('/').split('_').join('-'));
      const res = await fetch('https://cert-iiit.ml/get', {
        method: 'POST',
        body: test,
      });
      const json = await res.json();
      setstate(json);
    };
    fetchData();
  }, [match]);

  return (
    <Jumbotron>
      {!state?.message ? (
        <>
          <p className={clsx(styles.message, styles.success)}>Found Successfully</p>
          <hr />
          <div className={styles.details}>Name: {state.certificate.name}</div>
          <div className={styles.details}>Roll: {state.certificate.rollno}</div>
          <div className={styles.details}>Event: {state.certificate.event}</div>
          <div className={styles.details}>Year: {state.certificate.year}</div>
          <div className={styles.details}>Issued on: {state.certificate.date}</div>
          <div className={styles.details}>
            Certificate ID: {state.certificate.cert_id}
          </div>
          {state.certificate.file ? (
            <>
              <hr />
              <p className={styles.details}>Certificate:</p>
              <div style={{ height: 1240 }}>
                <object
                  data={`https://cert-iiit.ml${state.certificate.file}`}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                >
                  <p>
                    {'Link '}
                    <a href={`https://cert-iiit.ml${state.certificate.file}`}>
                      {' to the PDF'}
                    </a>
                  </p>
                </object>
              </div>
            </>
          ) : null}
        </>
      ) : (
        <p className={clsx(styles.message, styles.fail)}>
          Sorry This ID does not exist!
        </p>
      )}
      <hr />
      <div>
        <p>Click here to go back home</p>
        <a href="/">
          <Button variant="primary" size="lg" type="submit" className="ml-3">
            Home
          </Button>
        </a>
      </div>
    </Jumbotron>
  );
};

export default Certificate;
