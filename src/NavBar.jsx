import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
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

        <Button
          type="submit"
          className="logout-button"
          variant="outline-success"
          onClick={() => logout()}
        >
          Logout
        </Button>
      </Container>
    </Navbar>
  );
}
