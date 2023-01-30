import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link } from 'react-router-dom'

const NavBa = () => {

  

  return (
    
      <Navbar className='navbar-all' bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className='navbar-title' as={Link} to="/">E-commerce <i class='bx bxs-shopping-bags navbar-bags'></i></Navbar.Brand>
        </Container>
          <Nav className="me-auto content-detail-navbar">
            <section className='link-login'  >
               <Nav.Link as={Link} to="/login" className='login-navbar' ><i class='bx bx-user icon-user-navbar'></i></Nav.Link>
            </section>
            <section className='link-purchase'>
              <Nav.Link className='purchase-navbar' as={Link}  to="/purchase"  >Favoritos</Nav.Link>
            </section>
            <section className='link-car' > 
              <Nav.Link className='car-navbar' as={Link} to="/" ><i class='bx bxs-cart icon-car-navbar'></i></Nav.Link>
            </section>
          
          </Nav>
      </Navbar>

      
    
  );
};

export default NavBa;