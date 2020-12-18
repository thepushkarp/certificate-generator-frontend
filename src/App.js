import React from 'react';
import styles from './App.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.jpg';
import { Nav, Navbar, Jumbotron, Button } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.App}>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="60"
              height="60"
              className="d-inline-block align-top"
              alt="IIIT Vadodara"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="http://cert-iiit.tk/">Verify Certificates</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Jumbotron>
          <h1 className="display-4">Generate Certificates</h1>
          <p className="lead">
            This is the certificate generation site for Indian Institute of
            Information Technology, Vadodara
          </p>
          <hr class="my-4"></hr>
          <p>Click here to generate the certificates!</p>
          <Button variant="primary" size="lg" href="/generate/">
            Generate!
          </Button>
        </Jumbotron>

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
      </div>
    );
  }
}

export default App;
