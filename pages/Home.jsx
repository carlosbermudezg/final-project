import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk } from '../store/slices/products.slice';
import {Row, Col, Button, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom';


const Home = () => {

    const dispatch = useDispatch()
    const products = useSelector(state => state.product)

    useEffect(() => {

      dispatch(getProductsThunk())

    },[])

  return (
    <div>
      <h1>Home</h1>
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