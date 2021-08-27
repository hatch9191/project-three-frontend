import React from 'react'
import { useParams } from 'react-router'
import { Row, Col, Container, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import ShowPageMap from './ShowPageMap'

function BookingConfirmation({ location }) {
  const { bookingId } = useParams()
  const history = useHistory()

  const handleClick = () => {
    history.push('/')
  }


  const studio = location.state.studios.test


  const getTheBooking = () => {
    return studio.bookings.filter(booking => {
      return booking._id === bookingId
    })
  }

  const confirmed = getTheBooking()

  return (
    <>
      {console.log(studio)}
      <div className="px-4 py-4">
        <div className="container-sm py-4">
          <div>
            <h1>Booking Confirmation</h1>
            <div className="card small-width">
              <div className="list-group list-group-flush">
                <Container>
                  <Row>
                    <Col>
                      <p className="fw-bold pt-3">Studio Booked: <br /> <span className="fw-normal">{studio.name}</span></p>
                      <p className="fw-bold pt-3">Booked By:<br /> <span className="fw-normal">{confirmed[0].bookedBy.username}</span></p>

                    </Col>
                    <Col>
                      <p className="fw-bold pt-3">Address:
                        <br /> {studio.location.addressLineOne ? <span className="fw-normal">{studio.location.addressLineOne},</span> : ''}
                        <br /> {studio.location.addressLineTwo ? <span className="fw-normal">{studio.location.addressLineTwo},</span> : ''}
                        <br /> {studio.location.town ? <span className="fw-normal">{studio.location.town},</span> : ''}
                        <br /> {studio.location.country ? <span className="fw-normal">{studio.location.country},</span> : ''}
                        <br /> {studio.location.postCode ? <span className="fw-normal">{studio.location.postCode}.</span> : ''}
                      </p>
                    </Col>
                    <Col>
                      <p className="fw-bold pt-3">Booked From:<br /> <span className="fw-normal">{confirmed[0].bookedFrom.replaceAll('-', '/')}</span></p>
                      <p className="fw-bold pt-3">Booked To:<br /> <span className="fw-normal">{confirmed[0].bookedTo.replaceAll('-', '/')}</span></p>

                    </Col>
                    <Col>

                      <p className="fw-bold pt-3">Booking Id: <br /> <span className="fw-normal">{confirmed[0]._id}</span></p>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-4">
        <div className="container-sm py-4">
          <ShowPageMap studio={studio} />
        </div>
      </div>
      <div className="px-4 py-4">
        <div className="container-sm py-4">
          <div className="card mb-3 mr-3 display-card-hor card-shadow" >
            <div className="row g-0">
              <div className="card-body middle-card">
                <h5 className="card-title fs-3">Check out more studios!</h5>
                <p className="card-text">AirStudio offer a range of excellent worldwide recording studios, carefully selected for different purposes and budgets. </p>
                <Button className="info btn-info" onClick={handleClick}>Browse Our Studios</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-4"></div>
    </>
  )
}

export default BookingConfirmation