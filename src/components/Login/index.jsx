import React, { useEffect } from 'react';
import styles from '../../css/Login.module.css';
import { btn } from '../../css/Verify.module.css';
import { useHistory } from 'react-router-dom';

const Login = (props) => {
  const history = useHistory();

  useEffect(() => {
    if (props.islogedIn) {
      history.push('/');
    }
  }, [props, history]);
  return (
    <div className={styles.root}>
      <h2>Must be superuser</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          let formdata = new FormData(event.target);
          try {
            const res = await fetch('https://cert-iiit.ml/login', {
              method: 'POST',
              body: formdata,
            });
            if (res.status !== 200) throw new Error('Exception message');
            const json = await res.json();
            console.log(json);
            props.handler(json.token, Date.parse(Date(json.expiry)));
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <div>
          <label>Username : </label>
          <input className={styles.input} type="text" name="username" />
        </div>
        <div>
          <label>Password : </label>
          <input className={styles.input} type="text" name="password" />
        </div>
        <input
          type="hidden"
          name="csrfmiddlewaretoken"
          value="SArEpnCEm8vzyjsV2UPWRU4qQvwyjTlaMQBAmuC5KqTM5GsKnPJX7qgDGONRNQFW"
        />
        <input type="submit" className={btn} />
      </form>
    </div>
  );
};

export default Login;
