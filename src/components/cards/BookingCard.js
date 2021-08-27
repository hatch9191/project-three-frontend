import React from 'react'
import { isAuthenticated } from '../../lib/auth'

import 'react-calendar/dist/Calendar.css'
import BookingDate from './BookingDate'
// import ReactDate from './ReactDate'

function BookingCard({ studio }) {
  // const [bookedFrom, setBookedFrom] = React.useState('null')
  // const [bookedTo, setBookedTo] = React.useState('')


  // const handleChange = e => {
  //   setBookedFrom(e.target.value)
  // }
  // const handleToChange = e => {
  //   setBookedTo(e.target.value)
  // }





  return (
    <>
      <div className="card mb-3 mr-3 display-card-hor card-shadow" >
        <div className="row g-0">
          <div className="card-body middle-card">
            <h5 className="card-title fs-3">Book This Studio!</h5>
            <p className="card-text">Take your music to the next level and experiece the world renowned recording studios.</p>
            {isAuthenticated() ?
              <>

                <BookingDate studio={studio} />
              </>
              :
              <>
                <div>
                  <button type="button" className="btn btn-info px-5 mx-3">Log In</button>
                  <button type="button" className="btn btn-info px-5 mx-3">Register</button>
                </div>
              </>
            }

          </div>
        </div>
      </div>
      <div className="px-4 py-4"></div>

    </>
  )
}

export default BookingCard