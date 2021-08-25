import React from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { ListGroup, Modal } from 'react-bootstrap'

import { profileUser, editUser } from '../../lib/api'
import CardSmall from '../cards/CardSmall'
import Error from '../common/Error'
import Loading from '../common/Loading'
import { removeToken } from '../../lib/auth'

function Profile() {

  const initialState = { 
    username: '', 
    email: '',
    password: '',
    passwordConfirmation: '',
    bookedStudio: [],
    favouritedStudio: [],
    addedStudio: [],
  }

  const { userId } = useParams()
  const history = useHistory()
  const [user, setUser] = React.useState(initialState)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !user && !isError
  const [modalShow, setModalShow] = React.useState(false)
  const [deactivateData, setDeactivateData] = React.useState(initialState)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await profileUser(userId)
        setUser(response.data)
        setDeactivateData({ 
          username: `deactivatedUser${user._id}`, 
          email: `deactivatedUser${user._id}@email.com`,
          password: 'recoveryPassword',
          passwordConfirmation: 'recoveryPassword',
          avatar: '',
        })
      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    }
    getData()
  }, [userId, user._id])

  const handleDeactivate = async () => {
    try {
      const { data } = await editUser(userId, deactivateData)
      removeToken()
      history.push('/')
      console.log(data)
    } catch (err) {
      console.log(err.response.data.errors)
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
        <Modal.Body>
          <p>
            Please be warned that clicking the below deactivate button <strong>will remove your account from our site</strong>. Some data <strong>may be lost or unrecoverable</strong> once your account is deactivated. By clicking the through you confirm you have understood the above.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-danger" onClick={handleDeactivate}>I Understand, Please Deactivate</button>
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
                      <Link to="/studios/create" className="profile-link">
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
                    <strong>Deactivate Your Account</strong> <br />
                    Once you deactivate you will need to contact the site administrator by email to recover your account.<br />
                    <button type="button" className="btn btn-danger px-5" onClick={() => setModalShow(true)}>Deactivate</button>
                    <DeactivateModal
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