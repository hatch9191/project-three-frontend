import { Nav, Navbar, Col, Container } from 'react-bootstrap'

function Footer() {
  return (
    <>
      <Navbar className="footer" bg="light" variant="light">
        <Container>
          <Col className="footer-image">
            <img
              alt="AirStudio Logo"
              src="https://www.airstudios.com/wp-content/uploads/2019/09/AIR_SPIRO_4.png"
              width="100"
              height="100"
              className="d-inline-block align-top navlogo"
            />
          </Col>
          <Col className="footer-title">
            <Navbar.Brand  href="/">AirStudio</Navbar.Brand>
          </Col>
          <Col>
            <Nav defaultActiveKey="/" className="flex-column">
              <Nav.Link className="footer-text" href="">About</Nav.Link>
              <Nav.Link className="footer-text" href="">Cookies</Nav.Link>
              <Nav.Link className="footer-text" href="">Become a Partner</Nav.Link>
            </Nav>
          </Col>
          <Col>
            <Nav defaultActiveKey="/" className="flex-column">
              <Nav.Link className="footer-text" href="">Contact Us</Nav.Link>
              <Nav.Link className="footer-text" href="">Privacy</Nav.Link>
              <Nav.Link className="footer-text" href="">Terms &amp; Conditions </Nav.Link>
            </Nav>
          </Col>
        </Container>
      </Navbar>
      <Navbar className="footer" bg="light" variant="light">
        <Container>
          <Navbar.Collapse className="justify-content-center">
            <Navbar.Text className="made-by">
              Built with 🖤 By <a href="https://github.com/Majoggy">Christian Baker</a>, <a  href="https://github.com/eoin-barr">Eoin Barr</a> &amp; <a href="https://github.com/hatch9191">Harry Evans</a>   
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Footer