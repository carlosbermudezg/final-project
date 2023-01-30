import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { setIsLoading } from '../store/slices/isLoading.slice';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// thunk
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk } from '../store/slices/products.slice';


const ProductDetail = () => {

  const { id } = useParams()
  const [detail, setDetail] = useState({})

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


  //Products per category
  const productRelated = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsThunk())
  }, [dispatch]);

  //unico valor por lo la pueda clasificar  a la info del detalle
  // console.log(detail?.category); //nombre del tipo de producto

  //clasificacion de info del thunk 
  // console.log(productRelated[1]?.category?.name); //nombre del tipo del producto, no id

  // carrousel miniature 
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (index) => {
    setActiveIndex(index);
  };


  const similarItems = productRelated?.filter((element) => element?.category?.name === detail?.category);

  const [input, setInput] = useState(1);


  const handleSubmit = () => {

    const data = {
      id,
      quantity: input
    }

    axios
      .post('https://e-commerce-api.academlo.tech/api/v1/cart', data)
      .then((resp)=>console.log(resp))
      .catch((error)=>console.log(error))

    console.log(data);
  }


  return (

    <Container className='col-11 conteiner'  >

      {/* title section */}
      <div className="flex justify-content-start  align-items-center mb-5">
        <Card.Link as={Link} to='/' style={{ textDecoration: 'none' }}>  Home  </Card.Link>
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
                        <button className='buttonCart' > <i className='bx bx-minus' onClick={() => setInput(input <= 1 ? 1 : input - 1)} ></i></button>
                        <div className="value">{input}</div>
                        <button className='buttonCart' variant="primary" onClick={() => setInput(input + 1)}><i className='bx bx-plus'></i></button>
                      </div>
                    </div>
                  </Col>

                </Row>

              </Container>



              <Button onClick={() => handleSubmit()} variant="primary" className='w-100 buttonAddCart' >Add to cart <i className='bx bx-cart'></i></Button>

            </Card.Body>
          </Card>


        </Col>
      </Row>

      {/* secondary content */}

      <Container className='d-flex flex-wrap col-12 justify-content-around' >

        {
          similarItems.map((element, index) =>

            <Card
              as={Link} to={`/products/${element.id}`}
              key={index}
              style={{ width: '18rem', textDecoration: 'none' }} className='mx-3 mb-3 d-flex justify-content-start'>

              <Card.Body >
                <Card.Img className='similarItemsImg similarItemsImg0' variant="top" src={`${element.productImgs[0]}`} />
                <Card.Img className='similarItemsImg similarItemsImg1' variant="top" src={`${element.productImgs[1]}`} />
              </Card.Body>

              <hr style={{ border: `1px solid rgba(0, 0, 0, 0.175)` }} />


              <Card.Body
                style={{ color: 'var(--text--color)' }}
                className='d-flex flex-column'
              >

                <Card.Title className='mb-3' style={{ fontFamily: 'Yantramanav,sans-serif' }}>
                  {element.title}
                </Card.Title>

                <Card.Text className='mb-1' style={{ color: "var(--text--gray)" }}>
                  Precio
                </Card.Text>

                <Card.Title style={{ fontFamily: 'Yantramanav,sans-serif' }}>{element.price}</Card.Title>

                <Button
                  variant="primary"
                  style={{ borderRadius: '50%', width: '3rem', height: '3rem' }}
                  className=' align-self-end d-flex justify-content-center  align-items-center'
                >
                  <i className='bx bx-cart'></i>
                </Button>
              </Card.Body>
            </Card>)
        }

      </Container>



    </Container >



  )


}

export default ProductDetail


