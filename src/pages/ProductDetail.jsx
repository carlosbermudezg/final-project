import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading } from '../store/slices/isLoading.slice';
import {Row, Col, Button} from 'react-bootstrap'
import {filterCategoriesThunk} from '../store/slices/products.slice'


const ProductDetail = () => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const [detail , setDetail] = useState( { } )
  // const productRelated = useSelector((state) => state.product)

  useEffect(() => {

    dispatch(setIsLoading(true))

      axios
      .get(`https://e-commerce-api.academlo.tech/api/v1/products/${id}`)
      .then(resp =>{ 
        console.log(resp)
        setDetail(resp.data.data.product)
        dispatch(filterCategoriesThunk(resp.data?.data.product.category))
      })
      .catch(error => console.log(error))
      .finally( () => dispatch(setIsLoading(false)))

  },[id])


  return (
    <div>
      {/* falta Slider de las imgs 
      recordar el la imgen con posicion absolute */}
      <h2>productos detallados</h2>
       <h1>{detail.id}</h1>
       <h2>{detail.title}</h2>
       <p>{detail.description}</p>
        
    </div>



  );
};

export default ProductDetail