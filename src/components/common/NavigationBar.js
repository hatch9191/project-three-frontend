import React from 'react'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import { isAuthenticated, removeToken } from '../../lib/auth'

function NavigationBar() {

  const history = useHistory()
  const isAuth = isAuthenticated()

  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="title">
          <img
            alt="AirStudio Logo"
            src="https://res.cloudinary.com/dn11uqgux/image/upload/v1629385735/sei_project_3_studio_images/image_r9tq7i.png"
            width="45"
            height="45"
            className="d-inline-block align-top navlogo"
          />{' '}
          AirStudio
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="links">
            {isAuth && (
              <>
                <Nav.Link href="/">Favorites<Button variant="secondary">0</Button></Nav.Link>
                <Nav.Link href="/profile" className="no-button">Profile</Nav.Link>
                <Nav.Link href="/"><Button variant="secondary" onClick={handleLogout}>Log Out</Button></Nav.Link>
              </>
            )}
            {!isAuth && (
              <>
                <Nav.Link href="/login" className="no-button">Login</Nav.Link>
                <Nav.Link href="/registration" className="no-button">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar