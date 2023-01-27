import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../store/slices/isLoading.slice';

const ProductDetail = () => {
  const dispatch = useDispatch()
  const {id} = useParams()

  const [detail , setDetail] = useState( { } )

  useEffect(() => {

    dispatch(setIsLoading(true))

      axios
      .get(`https://e-commerce-api.academlo.tech/api/v1/products/${id}`)
      .then(resp => setDetail(resp.data.data.products))
      .catch(error => console.log(error))
      .finally( () => dispatch(setIsLoading(false)))
  },[])


  return (
    <div>
      <h1>Product Detail</h1>
    </div>
  );
};

export default ProductDetail