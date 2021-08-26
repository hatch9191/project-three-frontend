import { Nav, Navbar, Col, Row, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {

  return (
    <>
      <Navbar className="footer" bg="light" variant="light">
        <Container fluid>
          <Row className="row">
            <Col className="footer-image" sm>
              <img
                alt="AirStudio Logo"
                src="https://www.airstudios.com/wp-content/uploads/2019/09/AIR_SPIRO_4.png"
                width="100"
                height="100"
                className="d-inline-block align-top navlogo"
                href="/"
              />           
            </Col>
            <Col className="footer-title" sm>
              <Navbar.Brand href="/" className="all">AirStudio</Navbar.Brand>
            </Col>
            <Col sm>
              <Nav defaultActiveKey="/" className="flex-column">
                <Nav.Link as={Link} to="/about" className="footer-text all">About</Nav.Link>
                <Nav.Link as={Link} to="/cookies" className="footer-text all">Cookies</Nav.Link>
                <Nav.Link as={Link} className="footer-text all">Become a Partner</Nav.Link>
              </Nav>
            </Col>
            <Col sm>
              <Nav defaultActiveKey="/" className="flex-column">
                <Nav.Link as={Link} to="/contact-us" className="footer-text all" >Contact Us</Nav.Link>
                <Nav.Link as={Link} className="footer-text all">Privacy</Nav.Link>
                <Nav.Link as={Link} to="terms" className="footer-text all">Terms &amp; Conditions</Nav.Link>
              </Nav>
            </Col>
          </Row>
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