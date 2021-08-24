import { Nav, Navbar, Col, Row, Container } from 'react-bootstrap'

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
                <Nav.Link className="footer-text all" href="">About</Nav.Link>
                <Nav.Link className="footer-text all" href="/cookies">Cookies</Nav.Link>
                <Nav.Link className="footer-text all" href="">Become a Partner</Nav.Link>
              </Nav>
            </Col>
            <Col sm>
              <Nav defaultActiveKey="/" className="flex-column">
                <Nav.Link className="footer-text all" href="">Contact Us</Nav.Link>
                <Nav.Link className="footer-text all" href="">Privacy</Nav.Link>
                <Nav.Link className="footer-text all" href="/terms">Terms &amp; Conditions </Nav.Link>
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