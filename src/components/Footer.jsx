import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer-copyright text-center py-3">
        Made with &hearts; by&nbsp;
        <a
          href="https:/github.com/thepushkarp/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Pushkar Patel&nbsp;
        </a>
        and&nbsp;
        <a
          href="https:/github.com/TanmayAmbadkar/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Tanmay Ambadkar
        </a>
      </footer>
    );
  }
}

export default Footer;
