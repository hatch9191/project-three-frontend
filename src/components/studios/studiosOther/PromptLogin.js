import { Link } from 'react-router-dom'

function PromptLogin() {
  return (
    <>
      <div className="card mb-3 mr-3 display-card-hor card-shadow" >
        <div className="row g-0">
          <div className="card-body middle-card">
            <h5 className="card-title fs-3">Login or Register to make bookings!</h5>
            <p>AirStudio has the greatest directory of quality recording studios, with more than 170 throughout the world. We only work with studios we feel will deliver to the standard that our customers have come to expect.</p>
            <div>
              <Link to="/login" className="profile-link">
                <button type="button" className="btn btn-info px-5 mx-3">Log In</button>
              </Link>
              <Link to="/registration" className="profile-link">
                <button type="button" className="btn btn-info px-5 mx-3">Register</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-4"></div>

    </>
  )
}

export default PromptLogin