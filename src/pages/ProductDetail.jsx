import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../store/slices/isLoading.slice';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const ProductDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [detail, setDetail] = useState({})
  // const productRelated = useSelector((state) => state.product)

  useEffect(() => {

    dispatch(setIsLoading(true))

    axios
      .get(`https://e-commerce-api.academlo.tech/api/v1/products/${id}`)
      .then(resp => {
        setDetail(resp.data.data.product)
      })
      .catch(error => console.log(error))
      .finally(() => dispatch(setIsLoading(false)))

  }, [id])


  // carrousel miniature 
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (index) => {
    setActiveIndex(index);
  };

  console.log(detail);


  return (

    <Container className='col-11 conteiner'  >

      {/* title section */}
      <div className="flex justify-content-start  align-items-center mb-5">
        <div>  Home  </div>
        <div style={{
          background: "var(--secondary--color)",
          borderRadius: "50%",
          height: "6px",
          margin: " 0 14px",
          width: "6px"
        }}
        ></div>
        <div style={{ fontWeight: 600 }}>{detail.title}</div>
      </div>

      {/* main content */}
      <Row className='d-flex justify-content-between align-items-center' >

        {/* carrousel */}
        <Col xs={12} lg={4}  >
          <Carousel activeIndex={activeIndex} onSelect={handleSelect} >
            {
              detail?.productImgs?.map((element, index) => (

                <Carousel.Item key={index} >
                  <img
                    className="centered-img"
                    src={`${element}`}
                    alt={`img ${index}`}
                  />


                </Carousel.Item>
              ))
            }

          </Carousel>

          <div className="miniature-container">
            {
              detail?.productImgs?.map((element, index) => (
                <img
                  key={index}
                  src={`${element}`}
                  alt={`img ${index}`}
                  className={`miniature ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                />
              ))
            }
          </div>

        </Col>

        {/* detail */}
        <Col xs={12} lg={7} >

          <Card style={{ border: 'transparent' }}  >

            <Card.Body >

              <Card.Title style={{ marginBottom: '1.5rem' }}>{detail.title}</Card.Title>

              <Card.Text>
                {detail.description}
              </Card.Text>

              <Container className='mt-4 col-12'>


                <Row>
                  <Col className='col-6'  >
                    <h6 style={{ color: '#ababab', fontWeight: 400 }}>Precio</h6>
                    <h4 style={{ fontSize: '1.2rem' }}>${detail.price}</h4>
                  </Col>

                  <Col className="Col-6">

                    <h6 style={{ color: '#ababab', fontWeight: 400 }}>Quantity</h6>

                    <div className="quantity-box">
                      <div className="flex">
                        <button className='buttonCart' > <i className='bx bx-minus' ></i></button>
                        <div className="value">19</div>
                        <button className='buttonCart' variant="primary" ><i className='bx bx-plus'></i></button>
                      </div>
                    </div>
                  </Col>

                </Row>

              </Container>



              <Button variant="primary" className='w-100 buttonAddCart' >Add to cart <i className='bx bx-cart'></i></Button>

            </Card.Body>
          </Card>


        </Col>
      </Row>

      {/* secondary content */}








    </Container>)


}

export default ProductDetail


