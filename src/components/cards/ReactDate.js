import React from 'react'
import moment from 'moment'
import { Container, Col, Row, Button, Form } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker, { registerLocale } from 'react-datepicker'
import en from 'date-fns/locale/en-GB'
registerLocale('en', en)

const initialState = {
  bookedFrom: '',
  bookedTo: '',
}


function ReactDate() {

  const [fromDate, setFromDate] = React.useState(null)
  const [toDate, setToDate] = React.useState(null)
  const [formattedFromDate, setFormattedFromDate] = React.useState(null)
  const [formattedToDate, setFormattedToDate] = React.useState(null)
  const [formData, setFormData] = React.useState(initialState)

  const handleChangeFrom = date => {
    setFromDate(date)
    date = moment(date).format('DD-MM-YYYY')
    setFormattedFromDate(date)
    setFormData({ ...formData, bookedFrom: formattedFromDate })
    setFormattedFromDate(date)
  }


  const handleChangeTo = date => {
    setToDate(date)
    date = moment(date).format('DD-MM-YYYY')
    setFormattedToDate(date)
    setFormData({ ...formData, bookedTo: formattedToDate })
    setFormattedToDate(date)
  }

  // console.log(fromDate)
  // console.log(formattedFromDate)

  // console.log(toDate)
  // console.log(formattedToDate)


  const handleSubmit = e => {
    e.preventDefault()
    console.log(formData)
  }


  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Container>
          <Row>
            <Col>
              <DatePicker
                name="bookedFrom"
                className="date-picker"
                placeholderText="Date From"
                dateFormat="dd-MM-yyyy"
                locale="en"
                // selected={fromDate}
                onChange={handleChangeFrom}
                minDate={new Date()}
              >
              </DatePicker>
            </Col>
            <Col>
              <DatePicker
                name="bookedTo"
                disabled={fromDate ? '' : 'true'}
                className="date-picker"
                placeholderText="Date To"
                dateFormat="dd-MM-yyyy"
                locale="en"
                selected={toDate}
                onChange={handleChangeTo}
                minDate={fromDate}
              >
              </DatePicker>
            </Col>
            <Col>
              <Button variant="info" type="submit">Book</Button>
            </Col>
          </Row>
        </Container >
      </Form>
    </div >
  )
}

export default ReactDate