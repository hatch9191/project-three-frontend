import React from 'react'
import { Container, Navbar, Nav, Badge } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import { removeToken } from '../../lib/auth'

function NavigationBar({ loggedIn, user }) {

  const history = useHistory()

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
            {loggedIn && (
              <>
                <Navbar.Text className="text-info no-button username">Welcome, {user.username}!</Navbar.Text>
                <Navbar.Text className="no-button" href="">Favourites{!user.favouritedStudio.length >= 1 ? '' : <Badge pill className="counter" bg="info">{user.favouritedStudio.length}</Badge>}</Navbar.Text>
                <Nav.Link href="/profile" className="no-button">Profile</Nav.Link>
                <Nav.Link href="/" onClick={handleLogout}>Log Out</Nav.Link>
                {/* <Nav.Link href="/"><Button variant="secondary" onClick={handleLogout}>Log Out</Button></Nav.Link> */}
              </>
            )}
            {!loggedIn && (
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