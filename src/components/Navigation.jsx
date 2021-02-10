import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import logo from '../assets/logo.jpg';
class Navigation extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand
          href="http://iiitvadodara.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
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
            <Nav.Link href="/generate">Generate Certificates</Nav.Link>
            <Nav.Link href="/verify">Verify Certificates</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
