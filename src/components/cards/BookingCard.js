import React from 'react'
import { isAuthenticated } from '../../lib/auth'

function BookingCard() {
  const [bookedFrom, setBookedFrom] = React.useState('null')
  const [bookedTo, setBookedTo] = React.useState('')


  const handleChange = e => {
    setBookedFrom(e.target.value)
  }
  const handleToChange = e => {
    setBookedTo(e.target.value)
  }





  return (
    <>
      <div className="card mb-3 mr-3 display-card-hor card-shadow" >
        <div className="row g-0">
          <div className="card-body middle-card">
            <h5 className="card-title fs-3">Book This Studio!</h5>
            <p className="card-text">Experiece the very best recording studios, that have taken Grammy awards.</p>
            {!isAuthenticated() ?
              <>
                <label htmlFor="from">From:</label>
                <input type="date" id="from" name="from"
                  onChange={handleChange}
                  value={bookedFrom}
                  min="2021-08-23" max="2023-12-31" />

                <label htmlFor="to">To:</label>
                <input
                  type="date"
                  id="to"
                  name="to"
                  onChange={handleToChange}
                  value={bookedTo}
                  min={bookedFrom} max="2023-12-31" />

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