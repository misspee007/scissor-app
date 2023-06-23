import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">Scissor App</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/register">Register</Nav.Link>
        <Nav.Link as={Link} to="/login">Login</Nav.Link>
        <Nav.Link as={Link} to="/shorten-url">Shorten URL</Nav.Link>
        <Nav.Link as={Link} to="/analytics">Analytics</Nav.Link>
        <Nav.Link as={Link} to="/user-urls">User URLs</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default AppNavbar;
