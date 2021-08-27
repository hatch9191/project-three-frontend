import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'

import { profileUser, editUser } from '../../lib/api'
import ImageUploadField from '../studios/ImageUpload'

function EditUser() {

  const intialState = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
  }

  const history = useHistory()
  const { userId } = useParams()
  const [formData, setFormData] = React.useState(intialState)
  const [formErrors, setFormErrors] = React.useState(intialState)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await profileUser(userId)
        setFormData(res.data)
      } catch (err) {
        setFormErrors(err.response.data.errorss)
      }
    }
    getData()
  }, [userId])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const { data } = await editUser(userId, formData)
      history.push('/profile')
      console.log(data)
    } catch (err) {
      setFormErrors(err.response.data.errors)
    }
  }

  const handleImageUpload = (imageUrl, name) => {
    setFormData({ ...formData, [name]: imageUrl })
  }

  return (
    <>
      <Container className="edit-user parallax" fluid>
        <Row>
          <Col className="outer-col"></Col>
          <Col xs={6} className="form-vertical-align">
            <Form onSubmit={handleSubmit}>
              <h4>Update Your Information</h4>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Enter Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {formErrors.username && (
                  <Form.Text className="text-muted">{formErrors.username}</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicfirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {formErrors.firstName && (
                  <Form.Text className="text-muted">{formErrors.firstName}</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasiclastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {formErrors.lastName && (
                  <Form.Text className="text-muted">
                    {formErrors.lastName}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {formErrors.email && (
                  <Form.Text className="text-muted">{formErrors.email}</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicAvatar">
                <ImageUploadField
                  labelText="Avatar Url"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleImageUpload}
                />
                {formErrors.avatar && (
                  <Form.Text className="text-muted">
                    {formErrors.avatar}
                  </Form.Text>
                )}
              </Form.Group>
              <Button variant="info" type="submit">
                Update
              </Button>
            </Form>
          </Col>
          <Col className="outer-col"></Col>
        </Row>
      </Container>
    </>
  )
}

export default EditUser