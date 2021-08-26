import React from 'react'
import { Form, Row, Col, Button, FloatingLabel } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

function Search({ studios }) {
  const [continentValue, setContinentValue] = React.useState('all')
  const [pricingValue, setPricingValue] = React.useState('all')
  const [genreValue, setGenreValue] = React.useState('all')
  const [townValue, setTownValue] = React.useState('all')
  const [accommodationValue, setAccommodationValue] = React.useState('all')
  const [state, setState] = React.useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setState(true)
  }

  const handleContinentChange = e => {
    setTownValue('all')
    setAccommodationValue('all')
    setContinentValue(e.target.value)
  }

  const handlePricingChange = e => {
    setPricingValue(e.target.value)
  }

  const handleGenreChange = e => {
    setGenreValue(e.target.value)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3 px-1 py-3 white-bg">
        <Col className="no-pad">
          <FloatingLabel controlId="floatingSelect" label="Location">
            <Form.Select className="remove-border" onChange={handleContinentChange} aria-label="Floating label select example">
              <option value="all">All</option>
              <option value="europe">Europe</option>
              <option value="north america">North America</option>
              <option value="south america">South America</option>
              <option value="oceania">Oceania</option>
              <option value="asia">Asia</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col className="no-pad">
          <FloatingLabel controlId="floatingSelect" label="Pricing">
            <Form.Select className="remove-border" onChange={handlePricingChange} aria-label="Floating label select example">
              <option value="all">All</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
            </Form.Select>
          </FloatingLabel>
        </Col >
        <Col className="no-pad">
          <FloatingLabel controlId="floatingSelect" label="Genre">
            <Form.Select className="remove-border" onChange={handleGenreChange} aria-label="Floating label select example">
              <option value="all">All</option>
              <option value="hip-hop">Hip-hop</option>
              <option value="rock">Rock</option>
              <option value="country">Country</option>
              <option value="pop">Pop</option>
              <option value="techno">Techno</option>
              <option value="soundtrack">Soundtrack</option>
              <option value="folk">Folk</option>
              <option value="metal">Metal</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col className="no-pad">
          {state ?
            <Redirect
              push
              to={{
                pathname: '/studios',
                state: {
                  continentValue: { continentValue },
                  pricingValue: { pricingValue },
                  genreValue: { genreValue },
                  townValue: { townValue },
                  accommodationValue: { accommodationValue },
                  studios: { studios },
                },
              }}
            >Hiya</Redirect> : ''}
          <Button
            className="has-width full-height"
            variant="info"
            type="submit">Submit</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default Search