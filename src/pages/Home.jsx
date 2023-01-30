import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk, filterCategoriesThunk, getFilterProducts } from '../store/slices/products.slice';

import { Row, Col, Button, Card } from 'react-bootstrap'

import {Row, Col, Button, Card} from 'react-bootstrap'

import { Link } from 'react-router-dom';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { setIsLoading } from '../store/slices/isLoading.slice';

const Home = () => {


  const dispatch = useDispatch()
  const products = useSelector(state => state.product)
  const [categorie, setCategorie] = useState([])



  useEffect(() => {

    const dispatch = useDispatch()
    const products = useSelector(state => state.product)
    const [categorie, setCategorie] =useState([])
    
      
  
    useEffect(() => {


    axios
      .get(`https://e-commerce-api.academlo.tech/api/v1/products/categories`)
      .then(resp => setCategorie(resp.data.data.categories))

      .then(error => console.log(error))

      .then (error => console.log(error))

      .finally(() => {
        setTimeout(() => {
          dispatch(setIsLoading(false))
        }, 1500)
      })


    dispatch(getProductsThunk())


  }, [])
  const hanledSubmit = (e) => {
    dispatch(getFilterProducts(e))

  }



      dispatch(getProductsThunk())
      

    },[])
    const hanledSubmit = (e) => {
        dispatch(getFilterProducts(e))
        
    }
  

  return (
    <div className='.content-home'>
      <h1>Home</h1>
      <Col xs={1} md={2} lg={3} className="navbar navbar-light border-0">

        <Form className="d-flex"
          onSubmit={(e) => hanledSubmit(e)}>

        <Form className="d-flex" 
        onSubmit={ (e) => hanledSubmit(e)}>

          <Form.Control
            onChange={(e) => hanledSubmit(e.target.value)}
            type="search"
            placeholder="What are you looking for?"
            className="me-2"
            aria-label="Search"

            style={{ heigth: '40px', width: '60vw' }}
          />
          <Button className="btn btn-outline-success my-2 my-sm-0 text-white border border-white bg-danger"
            type="submit" variant="outline-success"
            style={{ heigth: '40px', width: '80px' }}><i className="fa-solid fa-magnifying-glass"></i>

            style={{heigth: '40px', width: '60vw'}}
          />
          <Button className="btn btn-outline-success my-2 my-sm-0 text-white border border-white bg-danger" 
          type="submit" variant="outline-success"
          style={{heigth: '40px', width: '80px'}}><i className="fa-solid fa-magnifying-glass"></i>

          </Button>
        </Form>
      </Col>

      <Row xs={2} md={3} lg={4}>

        <Col>

          {/* Dezpliegue de las categorias */}
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header className='shadow mb-1 bg-white text-dark border-bottom-dark rounded' variant="success" id="dropdown-basic" style={{ width: '200px' }}>Category</Accordion.Header>
              <Accordion.Body className='border-0' show='onToggle' style={{ width: '200px' }}>
                {categorie.map((category, index) => (
                  <Col key={index}>
                    <Button
                      variant="ligth"
                      onClick={() => dispatch(filterCategoriesThunk(category.id))}>
                      {category.name}
                    </Button>
                  </Col>
                ))}
                <Button
                  variant="ligth"
                  onClick={() => dispatch(getProductsThunk())}>All Products
                </Button>
              </Accordion.Body>
            </Accordion.Item>

          </Accordion>


        </Col>
        {/* Listado completo de los productos */}
        {
          products.map((product, index) => (
            <Col key={index} >
              <Card className='Card' style={{ height: '500px', width: '280px' }}>
                <div className='homeImage'>
                  <Card.Img className='over'
                    variant="top"
                    // Imagen 1
                    src={product.productImgs[0]} />
                  <Card.Img
                    className='over1'
                    variant="top"
                    // Imagen 2
                    src={product.productImgs[1]} />
                </div>
                <Card.Body>
                  <div className='description'>
                    <Card.Text className='categorie'>{product.category.name}</Card.Text>
                    <Card.Title className='title'>{product.title}</Card.Title>
                    <Card.Text className='price'> <span>Price: </span> </Card.Text>
                    <Card.Text className='amount'>{product.price}</Card.Text>
                  </div>
                  <Link to={'/purchase'} ><Button className='btn-shopping' variant="primary">
                    <i className="fa-solid fa-cart-shopping"></i>
                  </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        }
      <Col>

{/* Dezpliegue de las categorias */}
<Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header className='shadow mb-1 bg-white text-dark border-bottom-dark rounded'  variant="success" id="dropdown-basic" style={{ width: '200px'}}>Category</Accordion.Header>
        <Accordion.Body className='border-0' show = 'onToggle' style={{ width: '200px'}}>
        {categorie.map((category) => (
        <Col>
        <Button
          key={category.id}
          variant="ligth"
          onClick={() => dispatch(filterCategoriesThunk(category.id))}>
          {category.name}
        </Button>
        </Col>
      ))}
      <Button 
          variant="ligth" 
          onClick={() => dispatch(getProductsThunk())}>All Products
      </Button>
        </Accordion.Body>
      </Accordion.Item>
      
    </Accordion>

      
      </Col>
{/* Listado completo de los productos */}
  {
    products.map((product, index) => (
        <Col key={index} >
        <Card className='Card' style={{height: '500px', width:'280px'}}>
          <div className='homeImage'>
        <Card.Img className='over'          
        variant="top"
        // Imagen 1
        src={product.productImgs[0]} />
        <Card.Img  
         className='over1'          
        variant="top"
        // Imagen 2
        src={product.productImgs[1]} />
          </div>   
        <Card.Body>
          <div className='description'>
            <Card.Text className='categorie'>{product.category.name}</Card.Text>
            <Card.Title className='title'>{product.title}</Card.Title>
            <Card.Text className='price'> <span>Price: </span> </Card.Text>
            <Card.Text className='amount'>{product.price}</Card.Text>
          </div> 
          <Link to={'/purchase'} ><Button className='btn-shopping' variant="primary">
                <i className="fa-solid fa-cart-shopping"></i>
          </Button>
          </Link>
        </Card.Body>
             </Card>
          </Col>
          ))
        } 

      </Row>
    </div>
  );
};

export default Home;