import React, { FC } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import FeatherIcon from 'feather-icons-react';
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

// import { Logo } from "../../../helper/importHelper/image"


interface HeaderProps { }

export const Header: FC<HeaderProps> = ({ }) => {

  const router = useRouter()
  const handleLogout = () => {
    signOut({
      redirect: false
    }).then(() => {
      router.push('/')
    })
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/dashboard">
            Next Js with Next Auth
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <NavDropdown title={<FeatherIcon icon="user" />} id="collasible-nav-dropdown">
                <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#">Change Password</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header;
