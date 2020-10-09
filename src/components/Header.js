import React, { useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { UserContext } from "../contexts/userContext";
import { signInWithGoogle } from "../firebase-utils/utils";
import { auth } from "../firebase-utils/utils";

const Header = () => {
  const { user } = useContext(UserContext);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <i className="fas fa-home"></i>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/new">
                <Nav.Link>
                  <i className="fas fa-plus-circle"></i>New Recipe
                </Nav.Link>
              </LinkContainer>
              {user ? (
                <NavDropdown title={user.displayName} id="username">
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link onClick={signInWithGoogle}>
                  <i className="fas fa-user"></i>Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
