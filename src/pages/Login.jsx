import React, 
{ useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlertDismissibleExample from '../components/AlertError';

const Login = () => {

const [email, setEmail] = useState("")
const [password, setPassword]= useState("")
const [alert, setAlert] = useState(false)
const navigate = useNavigate()

const handleSubmit =(e) => {
  e.preventDefault()
 const data = {
  email: email,
  password: password
 }

  axios.post(`https://e-commerce-api.academlo.tech/api/v1/users/login`, data)
  .then(resp => {
    console.log(resp);
    localStorage.setItem("token", resp.data.data.token)
    navigate("/")
  })
  .catch(error =>{
    console.log(error)
    setAlert(true)
  })

}

  return (

    <div className='content-login'>
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email"
               onChange={(e)=> setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password"
                onChange={(e)=> setPassword(e.target.value)} />
            </Form.Group>
           <Button variant="primary" type="submit">
            Submit
          </Button>


        </Form>

        <AlertDismissibleExample
        isVisible={alert}
        dismiss={() => setAlert(false)}
        />
      
     </div>
  );
};

export default Login;