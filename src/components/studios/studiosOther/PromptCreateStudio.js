import { isAuthenticated } from '../../../lib/auth'
import { Link } from 'react-router-dom'

function PromptCreateStudio() {
  return (
    <>
      <div className="card mb-3 mr-3 display-card-hor card-shadow" >
        <div className="row g-0">
          <div className="card-body middle-card">
            <h5 className="card-title fs-3">List Your Studio & Get More Bookings!</h5>
            <p className="card-text w-75">If you have any questions about any of these studios or would like to make a booking enquiry feel free to reach out or call our bookings team on +44 (0) 207 232 0009.</p>
            {isAuthenticated() ?
              <Link to="/studios/new" className="profile-link">
                <button type="button" className="btn btn-info px-5">List Your Studio</button>
              </Link>
              :
              <>
                <div>
                  <Link to="/login" className="profile-link">
                    <button type="button" className="btn btn-info px-5 mx-2">Log In</button>
                  </Link>
                  <Link to="/registration" className="profile-link">
                    <button type="button" className="btn btn-info px-5 mx-2">Register</button>
                  </Link>
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

export default PromptCreateStudio