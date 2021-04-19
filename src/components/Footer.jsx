import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer-copyright text-center py-3">
        {`Made with ❤ by `}
        <a
          href="https://github.com/TanmayAmbadkar/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Tanmay
        </a>
        {`, `}
        <a
          href="https://github.com/thepushkarp/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Pushkar
        </a>
        {`, `}
        <a
          href="https://github.com/paditya198/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Aditya
        </a>
        {` and `}
        <a
          href="https://github.com/anujpuri72/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Anuj
        </a>
      </footer>
    );
  }
}

export default Footer;
