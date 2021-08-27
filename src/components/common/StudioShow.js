import { useParams, Link, useHistory } from 'react-router-dom'
import React, { useRef } from 'react'
import { Container, Button } from 'react-bootstrap'

import { getSingleStudio } from '../../lib/api'
import { deleteStudio } from '../../lib/api'
import Error from './Error'
import Loading from './Loading'
import ExtraImagesCard from '../studios/studiosOther/ExtraImagesCard'
import { isOwner, isAuthenticated } from '../../lib/auth'
import ClientCard from '../studios/studiosOther/ClientCard'
import BookingCard from '../cards/BookingCard'
import CommentSection from '../comments/CommentSection'
import ShowPageMap from '../studios/studiosOther/ShowPageMap'
import { studioFavourited } from '../../lib/api'
import { profileUser } from '../../lib/api'
import PromptLogin from '../studios/studiosOther/PromptLogin'


function StudioShow({ loggedIn, user, setUser }) {
  const { studioId } = useParams()
  const [studio, setStudio] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !studio && !isError
  const history = useHistory()

  React.useEffect(() => {
    const getData = async () => {
      try {
        if (loggedIn) {
          const response = await profileUser(user._id)
          setUser(response.data)
        }
        const res = await getSingleStudio(studioId)
        setStudio(res.data)
      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    }
    getData()
  }, [studioId, user._id, setUser, loggedIn])

  const handleFavourite = async () => {
    try {
      const res = await studioFavourited(studioId)
      console.log(res)
      const studioResponse = await getSingleStudio(studioId)
      setStudio(studioResponse.data)
      const profileResponse = await profileUser(user._id)
      setUser(profileResponse.data)
    } catch (err) {
      console.log(err)
      setIsError(true)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteStudio(studio._id)
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)
  const myRef = useRef(null)
  const executeScroll = () => scrollToRef(myRef)

  return (
    <>
      {isError && <div className="px-4 py-5 text-center"><Error /></div>}
      {isLoading && <div className="px-4 py-5 text-center"><Loading /></div>}
      {studio && (
        <>
          <Container
            fluid className="no-pad parallax"
            style={{
              background: `linear-gradient(rgba(0,0,0,.05), rgba(0,0,0,.05)), url(${studio.mainImage})`,
              height: '70vh',
              backgroundSize: 'cover',
              backgroundPosition: 'bottom',
              filter: 'drop-shadow(0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.2))',
              backgroundAttachment: 'fixed',
              backgroundRepeat: 'no-repeat',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            < div className="px-4 py-5 text-center " >
              <div className=" px-3 py-5">

                <h1 className="display-5 fw-bold">{studio.name}</h1>
                <Button
                  className="full-height fav-btn"
                  variant="info"
                  type="submit"
                  onClick={executeScroll}>
                  Book This Studio Now</Button>
                <br />
                {!studio.favouritedBy.some(favourite => favourite._id === user._id) && loggedIn && (
                  <Button
                    className="full-height fav-btn"
                    variant="dark"
                    onClick={handleFavourite}>
                    🤍 Add To Favourites</Button>
                )}
                {studio.favouritedBy.some(favourite => favourite._id === user._id) && loggedIn && (
                  <Button
                    className="full-height fav-btn"
                    variant="secondary"
                    onClick={handleFavourite}>
                    ♥️ Favourited</Button>
                )}
              </div>
            </div >
          </Container >
          <div className="py-3"></div>
          <div className="px-4 py-4">
            <div className="container-sm py-4">
              {/* <h2 className="fs-1">Browse All Studios</h2> */}
              <div className="row">
                {studio.altImageOne &&
                  <ExtraImagesCard key={studio.altImageOne} img={studio.altImageOne} />
                }
                {studio.altImageTwo &&
                  <ExtraImagesCard key={studio.altImageTwo} img={studio.altImageTwo} />
                }
                {studio.altImageThree &&
                  <ExtraImagesCard key={studio.altImageThree} img={studio.altImageThree} />
                }
              </div>
            </div>
          </div>

          <div className="pt-3"></div>
          <div className="px-4 py-2">
            <div className="container-sm py-4 ">
              <h2 className="fs-1 pb-1">Welcome to {studio.name}</h2>
              <hr />
              <div className="card small-width">

                <div className="list-group list-group-flush">
                  <div className="list-group-item">
                    <p className="fw-bold pt-3">Name: <br /> <span className="fw-normal">{studio.name}</span></p>
                  </div>
                  <div className="list-group-item">
                    <p className="fw-bold pt-3">Address:
                      <br /> {studio.location.addressLineOne ? <span className="fw-normal">{studio.location.addressLineOne},</span> : ''}
                      <br /> {studio.location.addressLineTwo ? <span className="fw-normal">{studio.location.addressLineTwo},</span> : ''}
                      <br /> {studio.location.town ? <span className="fw-normal">{studio.location.town},</span> : ''}
                      <br /> {studio.location.country ? <span className="fw-normal">{studio.location.country},</span> : ''}
                      <br /> {studio.location.postCode ? <span className="fw-normal">{studio.location.postCode}.</span> : ''}
                    </p>
                  </div>
                  <div className="list-group-item">
                    <p className="fw-bold pt-3">Description: </p>
                    {studio.description.map(para => (
                      <>
                        <p key={para} className="fw-normal">{para}</p>
                      </>
                    ))}
                  </div>
                  <div className="list-group-item">
                    <p className="fw-bold pt-3">Equipment:
                      <br /> {studio.equipment.guitars ? <span className="fw-normal">Guitars</span> : <span className="fw-normal text-decoration-line-through">Guitars</span>}
                      <br /> {studio.equipment.drums ? <span className="fw-normal">Drums</span> : <span className="fw-normal text-decoration-line-through">Drums</span>}
                      <br /> {studio.equipment.synthesizers ? <span className="fw-normal">Synthesizers</span> : <span className="fw-normal text-decoration-line-through">Synthesizers</span>}
                      <br /> {studio.equipment.microphones ? <span className="fw-normal">Microphones</span> : <span className="fw-normal text-decoration-line-through">Microphones</span>}
                      <br /> {studio.equipment.mixingDesk ? <span className="fw-normal">Mixing Desk</span> : <span className="fw-normal text-decoration-line-through">Mixing Desk</span>}
                    </p>
                  </div>
                  <div className="list-group-item">
                    <p className="fw-bold pt-3">Genres:
                      {studio.genres.map(genre => (
                        <>
                          <br key={genre} /><span className="fw-normal">{genre}</span>
                        </>
                      ))}
                    </p>
                  </div>
                  <div className="list-group-item">
                    <p className="fw-bold pt-3 bold">Number of Studios:<br /> <span className="fw-normal">{studio.noOfStudios}</span></p>
                  </div>
                  <div className="list-group-item">
                    <p className="fw-bold pt-3 bold">Accommodation:
                      <br /> {studio.accommodation ? <span className="fw-normal">Onsite Accommodation</span> : <span className="fw-normal">No Onsite Accommodation</span>}
                    </p>
                  </div>
                  <div className="list-group-item">
                    <p className="fw-bold pt-3 bold">Pricing:
                      <br /> <span className="fw-normal">{'$'.repeat(studio.rate)}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-3"></div>
              {isOwner(studio.addedBy._id) ?
                <>
                  <div key={studio._id}>
                    <Link to={`/studios/${studio._id}/edit`} className="profile-link">
                      <button type="button" className="btn btn-info px-5 mx-3">Edit Studio</button>
                    </Link>
                    <button type="button" onClick={handleDelete} className="btn btn-danger px-5 mx-3">Delete Studio</button>
                  </div>
                </>
                :

                ''
              }
            </div>
          </div>





          <div className="py-3"></div>
          {studio.previousClientsOne &&
            <div className="container-sm py-4">
              <h2 className="fs-1">Previous Clients</h2>
              <hr />
              <div className="row profile-cards">
                {studio.previousClientsOne &&
                  <ClientCard key={studio.previousClientsOne._id} client={studio.previousClientsOne} />
                }
                {studio.previousClientsTwo &&
                  <ClientCard key={studio.previousClientsTwo._id} client={studio.previousClientsTwo} />
                }
                {studio.previousClientsThree &&
                  <ClientCard key={studio.previousClientsThree._id} client={studio.previousClientsThree} />
                }
              </div>
            </div>
          }
          <div className="py-3"></div>
          <div ref={myRef} className="container-sm py-4">
            <hr />
          </div>
          {/* <div className="py-3"></div> */}
          <div className="px-4 py-4">
            <div className="container-sm py-4">
              {isAuthenticated() ?
                <BookingCard name="BookingCard" studio={studio} />
                :
                <PromptLogin name="PromptLogin" />
              }
            </div>
          </div>
          <div className="py-3"></div>
          <div className="container-sm py-4">
            <h2 className="fs-1">Reviews</h2>
            <hr />
          </div>
          {(
            <CommentSection studio={studio} setStudio={setStudio} />
          )}
          <div className="py-3"></div>
          <div className="container-sm py-4">
            <h2 className="fs-1">Location</h2>
            <hr />
          </div>
          {<ShowPageMap studio={studio} />}

        </>
      )}
    </>
  )
}

export default StudioShow