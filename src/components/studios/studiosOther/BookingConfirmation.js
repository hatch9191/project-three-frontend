import React from 'react'
import { useParams } from 'react-router'
import { Row, Col, Container, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function BookingConfirmation({ location }) {
  const { bookingId } = useParams()
  const history = useHistory()

  // const [studio, setStudio] = React.useState(null)
  // const [booking, setBooking] = React.useState(null)
  // const [isError, setIsError] = React.useState(false)
  // const isLoading = !studio && !isError


  // React.useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const studioRes = await getSingleStudio(studioId)
  //       setStudio(studioRes.data)
  //     } catch (err) {
  //       console.log(err)
  //       setIsError(true)
  //     }
  //   }
  //   getData()
  // }, [studioId])


  // const bookingConfirmation = async () => {
  //   try {
  //     const bookingConfirm = studio.bookings.filter(booking => {
  //       return booking._id === bookingId
  //     })
  //     if (!bookingConfirmation) throw new Error
  //     setBooking(bookingConfirm[0])
  //     return booking
  //   } catch (err) {
  //     console.log(err)
  //   }

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
      <div className="px-4 py-4">
        <div className="container-sm py-4">
          <div>
            <h1>Booking Confirmation</h1>
            <div className="card small-width">
              <div className="list-group list-group-flush">
                <Container>
                  <Row>
                    <Col>
                      <p className="fw-bold pt-3">Name: <br /> <span className="fw-normal">{studio.name}</span></p>
                      <p className="fw-bold pt-3">Booking Id:<br /> <span className="fw-normal">{confirmed[0]._id}</span></p>

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
                  </Row>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-4">
        <div className="container-sm py-4">
          <div className="card mb-3 mr-3 display-card-hor card-shadow" >
            <div className="row g-0">
              <div className="card-body middle-card">
                <h5 className="card-title fs-3">Check out more studios!</h5>
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <Button className="info" onClick={handleClick}>Discover</Button>
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