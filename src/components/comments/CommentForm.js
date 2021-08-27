import { isAuthenticated } from '../../lib/auth'
import { Form, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { createComment, getSingleStudio } from '../../lib/api'
import React from 'react'

const initialState = {
  rating: '',
  text: '',
}

function CommentForm({ setStudio }) {
  const { studioId } = useParams()
  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)


  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const commentResponse = await createComment(studioId, formData)
      const studioResponse = await getSingleStudio(studioId)
      console.log(commentResponse)
      setFormData(initialState)
      setStudio(studioResponse.data)
    } catch (err) {
      console.log(err.response)
      setFormErrors(err.response)
    }
  }

  return (
    <div className="px-4 py-2">
      <div className="container-sm py-4 ">
        {!isAuthenticated() && <div></div>}
        {isAuthenticated() && (
          <>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 w-25" controlId="exampleForm.ControlInput1">
                <Form.Label>Add Your Review</Form.Label>
                <Form.Select name="rating" onChange={handleChange} aria-label="Rating" value={formData.rating}>
                  <option value="" disabled ></option>
                  <option value="1">⭐️</option>
                  <option value="2">⭐️⭐️</option>
                  <option value="3">⭐️⭐️⭐️</option>
                  <option value="4">⭐️⭐️⭐️⭐️</option>
                  <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 w-50 " controlId="exampleForm.ControlTextarea1">
                {/* <Form.Label>Example textarea</Form.Label> */}
                {/* <Form.Control className={`input ${!formErrors ? 'is-invalid' : ''}`} name="text" onChange={handleChange} placeholder="How did you like this studio?" as="textarea" rows={3} /> */}
                {/* {formErrors && (
                  <Form.Text className="text-muted"><strong className="fw-bold">Rating and review</strong> are required for the review to be submitted.</Form.Text>
                )} */}
                <Form.Control name="text" onChange={handleChange} placeholder="How did you like this studio?" as="textarea" value={formData.text} rows={3} />
              </Form.Group>

              <Button variant="info" type="submit">
                Submit
              </Button>
            </Form>
          </>
        )}
      </div>
    </div>
  )
}

export default CommentForm