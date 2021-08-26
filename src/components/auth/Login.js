import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'

import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'

function Login() {

  const initialState = {
    email: '',
    password: '',
  }

  const history = useHistory()
  const [formData, setFormData] = React.useState(initialState)
  const [isError, setIsError] = React.useState(false)
  const [formErrors, setFormErrors] = React.useState(initialState)

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await loginUser(formData)
      setToken(data.token)
      history.push('/')
    } catch (err) {
      setIsError(true)
    }
  }

  return (
    <>
      <Container className="login" fluid>
        <Row>
          <Col className="outer-col"></Col>
          <Col xs={6} className="form-vertical-align">
            <Form onSubmit={handleSubmit}>
              <h4>Login</h4>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange} 
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Password"
                  name="password"
                  onChange={handleChange} 
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Keep me logged in" />
                {isError && (
                  <Form.Text className="text-muted">
                    Either email or password were incorrect. Please try again or request a <a href="">password reset email</a>.
                  </Form.Text>
                )}
              </Form.Group>
              
              <Button variant="secondary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
          <Col className="outer-col"></Col>
        </Row>
      </Container>
    </>
  )
}

export default Login