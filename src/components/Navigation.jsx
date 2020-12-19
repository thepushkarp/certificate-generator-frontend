import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import logo from '../logo.jpg';

class Navigation extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
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
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="http://cert-iiit.tk/">Verify Certificates</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
