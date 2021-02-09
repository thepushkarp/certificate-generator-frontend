import React from 'react';
import styles from '../../css/Login.module.css';
import { btn } from '../../css/Verify.module.css';

export class Login extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <h2>Must be superuser</h2>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            let formdata = new FormData(event.target);
            const res = await fetch('https://cert-iiit.tk/login', {
              method: 'POST',
              body: formdata,
            });
            const json = await res.json();
            console.log(json);
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
  }
}

export default Login;
