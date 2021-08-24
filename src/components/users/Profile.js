import React from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { ListGroup, Modal } from 'react-bootstrap'

import { profileUser } from '../../lib/api'
import CardSmall from '../cards/CardSmall'
import Error from '../common/Error'
import Loading from '../common/Loading'

function Profile() {

  const { userId } = useParams()
  const history = useHistory()
  const [user, setUser] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !user && !isError
  const [modalShow, setModalShow] = React.useState(false)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await profileUser(userId)
        setUser(response.data)
      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    }
    getData()
  }, [userId])

  const handleDelete = async () => {
    // await deleteProfile(user._id)
    history.push('/')
  }

  const MyVerticallyCenteredModal = (props) => {
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
        <Modal.Body>
          <p>
            Please be warned that clicking the below delete button <strong>will remove your account from our database permanently</strong> and we will be <strong>unable to recover any of your data</strong>. By clicking the through you confirm you have understood the above.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>I Understand, Please Delete</button>
        </Modal.Footer>
      </Modal>
    )
  }

  console.log(user)

  return (
    <>
      {isError && <Error />}
      {isLoading && <Loading />}
      {!isError && !isLoading && (
        <>
          <div className="profile-page">
            <div className="py-4"></div>
            <div className="px-4 py-2">
              <div className="container-sm py-4">
                <h2 className="fs-2">My Booked Studios</h2>
                {!user.bookedStudio.length && 
                  <ListGroup as="ul">
                    <ListGroup.Item as="li">
                      You have not booked any Studios yets...<br />
                      <Link to="/" className="profile-link">
                        <button type="button" className="btn btn-info px-5">Book a Studio</button>
                      </Link>
                    </ListGroup.Item>
                  </ListGroup>
                }
                {user.bookedStudio && (
                  user.bookedStudio.map(studio => (
                    <CardSmall key={studio._id} studio={studio} />
                  ))
                )}
              </div>
            </div>
            <div className="px-4 py-2">
              <div className="container-sm py-4">
                <h2 className="fs-2">My Favorite Studios</h2>
                {!user.favouritedStudio.length && 
                  <ListGroup as="ul">
                    <ListGroup.Item as="li">
                      You have not liked any Studios yets...<br />
                      <Link to="/" className="profile-link">
                        <button type="button" className="btn btn-info px-5">Browse Studios</button>
                      </Link>
                    </ListGroup.Item>
                  </ListGroup>
                }
                {user.favouritedStudio && (
                  user.favouritedStudio.map(studio => (
                    <CardSmall key={studio._id} studio={studio} />
                  ))
                )}
              </div>
            </div>
            <div className="px-4 py-2">
              <div className="container-sm py-4 ">
                <h2 className="fs-2 pb-1">Personal Information</h2>
                <ListGroup as="ul">
                  <ListGroup.Item as="li">
                    <strong>Avatar:</strong><br /> {!user.avatar && <p className="text-muted list">Please add &apos;Avatar&apos; image by clicking the Edit button below</p>}
                    {user.avatar && <img src={user.avatar} height="100" width="100" className="avatar" />}
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    <strong>Username:</strong><br /> {user.username}
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    <strong>First Name:</strong><br /> {!user.firstName ? <p className="text-muted list">Please add &apos;First Name&apos; by clicking the Edit button below</p> : user.firstName}
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    <strong>Last Name:</strong><br /> {!user.lastName ? <p className="text-muted list">Please add &apos;Last Name&apos; by clicking the Edit button below</p> : user.lastName}
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    <strong>E-mail:</strong><br /> {user.email}<br />
                    <Link to={`/profile/${user._id}`} className="profile-link">
                      <button type="button" className="btn btn-info px-5">Edit My Information</button>
                    </Link>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>
            <div className="px-4 py-2">
              <div className="container-sm py-4 go-right">
                <h2 className="fs-2">My Studios</h2>
                <div className="row">
                  {user.addedStudio && (
                    user.addedStudio.map(studio => (
                      <CardSmall key={studio._id} studio={studio} />
                    ))
                  )}
                </div>
                {!user.addedStudio.length && (
                  <ListGroup as="ul">
                    <ListGroup.Item as="li">
                      You have not listed any Studios yets... <br />
                      <Link to="/" className="profile-link">
                        <button type="button" className="btn btn-info px-5">List Your Studio</button>
                      </Link>
                    </ListGroup.Item>
                  </ListGroup>
                )}
              </div>
            </div>
            <div className="px-4 py-2">
              <div className="container-sm py-4">
                <h2 className="fs-2">Account Options</h2>
                <ListGroup as="ul">
                  <ListGroup.Item as="li">
                    <strong>Delete Your Account</strong> <br />
                    Once you delete your account, there is no going back. Please be certain!<br />
                    <button type="button" className="btn btn-danger px-5" onClick={() => setModalShow(true)}>Delete Your Account</button>
                    <MyVerticallyCenteredModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>
            <div className="py-4"></div>
          </div>
        </>
    
    
    
      )}
    </>
  )
}

export default Profile