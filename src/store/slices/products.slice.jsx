import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';


export const productSlice = createSlice({
		name: 'product',
    initialState: [],
    reducers: {
      setProduct: (state, action) => {
        return action.payload
      }
      
    }
})
// el get para tener info del api
// export el thunk en home
// el dispatch lleva el Loader
 export const getProductsThunk =() =>  (dispatch) => {

  dispatch(setIsLoading(true))

  axios
  .get(`https://e-commerce-api.academlo.tech/api/v1/products`)
  .then(resp => dispatch(setProduct(resp.data.data.products)))
  .catch(error => console.log(error))
  .finally( () => dispatch(setIsLoading(false)))
 }

 export const getFilterProducts =(e) =>  (dispatch) => {

  dispatch(setIsLoading(true))

  axios
  .get(`https://e-commerce-api.academlo.tech/api/v1/products`)
  .then(resp => dispatch(setProduct(resp.data.data.products.filter(product => product.title.toLowerCase().includes(e)))))
  .catch(error => console.log(error))
  .finally( () => dispatch(setIsLoading(false)))
 }

 export const filterCategoriesThunk =(id) =>  (dispatch) => {

  dispatch(setIsLoading(true))

  axios
  .get(`https://e-commerce-api.academlo.tech/api/v1/products/?category=${id}`)
  .then(resp => dispatch(setProduct(resp.data.data.products)))
  .catch(error => console.log(error))
  .finally( () => dispatch(setIsLoading(false)))
 }

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;