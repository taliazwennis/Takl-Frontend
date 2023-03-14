import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function NavBar() {
  const token = cookies.get("TOKEN");

  const logout = () => {
    cookies.remove("TOKEN", { path: "/" });
    window.location.href = "/";
  };

  return (
    <Navbar className="navbar" variant="light" expand="lg">
      <Container fluid>
        <Navbar.Brand className="navbar-title">TAKL</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {/* <Nav.Link href="#action1">Home</Nav.Link> */}
            {/* <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
          </Nav>

          <Button type="submit" className="logout-button" variant="outline-success" onClick={() => logout()}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
