import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import React from 'react'
import { deleteBooking } from '../../../lib/api'
import { useHistory } from 'react-router'

function UserBookings({ location }) {
  const history = useHistory()

  const user = location.state.user.user

  const [modalShow, setModalShow] = React.useState(false)
  const [bookingToDelete, setBookingToDelete] = React.useState(null)

  const handleDeleteSetup = async () => {
    console.log(user)
    const studioIndex = user.bookedStudio.findIndex(place => place.bookings.find(item => item._id === bookingToDelete))
    const studioIdOfBooking = user.bookedStudio[studioIndex].studioId
    console.log(studioIdOfBooking)
    console.log(bookingToDelete)
    try {
      await deleteBooking(studioIdOfBooking, bookingToDelete)
      history.push('/profile')
    } catch (err) {
      console.log(err)
    }
  }

  const DeactivateModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Final Warning!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="flexi-center">
          <p className="text-center center-text">
            Please be warned that clicking the below Cancel button <strong>will remove your booking from our site</strong>. All data <strong>will be unrecoverable</strong> once your booking is canceled. By clicking the through you confirm you have understood the above.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-danger" onClick={handleDeleteSetup}>I Understand, Please Cancel</button>
        </Modal.Footer>
      </Modal>
    )
  }


  return (
    <>
      <div className="px-4 py-2">
        <div className="container-sm py-4 ">
          <h1>Your Bookings</h1>
          <DeactivateModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <div className="card small-width">
            <div className="list-group list-group-flush">
              {user.bookedStudio.map(booking => (
                <>
                  <div key={booking.studioId} className="list-group-item">
                    <p className="fw-bold pt-3">{booking.name}</p>
                    <hr className="w-50"></hr>
                    {booking.bookings.filter(booking => booking.bookedBy === user._id).map(booked => (<Container key={booked._id}><Row><Col><p > <span className="fw-bold">Booked From:</span> {booked.bookedFrom} <br></br> <span className="fw-bold"> Booked To:</span> {booked.bookedTo}<br></br> <span className="fw-bold"> Booking Id:</span> {booked._id}</p></Col><Col className="cancel-booking-flexi"><Button onClick={() => [setModalShow(true), setBookingToDelete(booked._id)]} className="btn-danger">Cancel Booking</Button></Col></Row><hr></hr></Container>))}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserBookings