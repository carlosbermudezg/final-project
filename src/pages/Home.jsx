import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk, filterCategoriesThunk } from '../store/slices/products.slice';
import {Row, Col, Button, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios';


const Home = () => {

    const dispatch = useDispatch()
    const products = useSelector(state => state.product)
    const [categorie, setCategorie] =useState([])

    useEffect(() => {

      axios
      .get(`https://e-commerce-api.academlo.tech/api/v1/products/categories`)
      .then(resp => setCategorie(resp.data.data.categories))
      .then (error => console.log(error))

      dispatch(getProductsThunk())

    },[])

  return (
    <div>
      <h1>Home</h1>

      {
        categorie.map(category => (
          <button key={category.id}
          variant="primary"
          onClick={() => dispatch(filterCategoriesThunk(category.id))}
          >{category.name}</button>
        ))
      }
      <button variant="danger" onClick={() => dispatch(getProductsThunk())}>Ver Todo</button>
      <Row xs={1} md={2} lg={3}>
        {
          products.map((product, index) => (

            <Col key={index}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product.productImgs[0]} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>
                    {product.description}
                  </Card.Text>
                  <Link to={`/products/${product.id}`} ><Button variant="primary">Ver Detalle</Button></Link> 
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