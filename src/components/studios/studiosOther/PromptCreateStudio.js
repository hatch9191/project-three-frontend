import { isAuthenticated } from '../../../lib/auth'

function PromptCreateStudio() {
  return (
    <>
      <div className="card mb-3 mr-3 display-card-hor card-shadow" >
        <div className="row g-0">
          <div className="card-body middle-card">
            <h5 className="card-title fs-3">List Your Studio For Free & Get More Bookings!</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            {isAuthenticated() ?
              <button type="button" className="btn btn-info px-5">List Your Studio</button>
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

export default PromptCreateStudio