import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import AlertDismissibleExample from '../components/AlertError'
import { useState } from 'react'

const Register = ()=> {

    const navigate = useNavigate()
    const [alert, setAlert] = useState(false)
    const { register, handleSubmit } = useForm()

    const onSubmit = (user)=>{
        user.role = 'admin'
        axios.post('https://e-commerce-api.academlo.tech/api/v1/users', user)
            .then(response => console.log(response))
            .catch(error => console.log(error))
        console.log(user)
    }

    return(
        <div className='row d-flex justify-content-center'>
            <div className='col-sm-9 col-md-5 col-12'>
                <Form onSubmit={ handleSubmit( onSubmit ) }>
                    <Form.Group controlId="firstName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control {...register('firstName')} type="text" placeholder="First Name"/>
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control {...register('lastName')} type="text" placeholder="Last Name"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                        {...register('email')}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control {...register('phone')} type="number" placeholder="Phone"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control {...register('password')} type="password" placeholder="Password"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="passretype">
                        <Form.Label>Re-type Password</Form.Label>
                        <Form.Control type="password" placeholder="Re-type Password"/>
                    </Form.Group>
                <Button variant="primary" type="submit" className='col-12'>
                    Register
                </Button>
                </Form>
                <AlertDismissibleExample
                isVisible={alert}
                dismiss={() => setAlert(false)}
                />
            </div>
        </div>
    )
}
export default Register