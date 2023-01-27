import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Purchases from './pages/Purchases'
import NavBa from './components/NavBar'
import Container from 'react-bootstrap/Container';
import Loader from './components/Loader'
import { useSelector } from 'react-redux'

import './App.css'

function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    
       <HashRouter>

        { isLoading && <Loader/>}
         <NavBa/>
         <Container className='my-5'>
       

        <Routes>

          <Route 
          path='/'
          element={<Home/>}
          />
          <Route 
          path='/products/:id'
          element={<ProductDetail/>}
          />
          <Route 
          path='/login'
          element={<Login/>}
          />
          <Route 
          path='/purchase'
          element={<Purchases/>}
          />

        </Routes>

        </Container>

       
      </HashRouter>
      
     
  )
}

export default App
