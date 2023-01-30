import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const NavBa = () => {

  const user = localStorage.getItem('user')
  const navigate = useNavigate()

  const logout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">e-comerce</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/purchase" >Favoritos</Nav.Link>
            <Nav.Link href="#">Carro</Nav.Link>
            {
              user ? <Nav.Link onClick={ logout }>Logout</Nav.Link>  : <Nav.Link  as={Link} to="/login" >Login</Nav.Link>
            }
          </Nav>
          {
            user && `Welcome ${user}`
          }
        </Container>
      </Navbar>

      
    </div>
  );
};

export default NavBa;