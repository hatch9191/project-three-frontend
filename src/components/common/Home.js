import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router'

import Search from './Search'
import { getAllStudios } from '../../lib/api'
import CardLargeTown from '../cards/CardLargeTown'
import CardMedium from '../cards/CardMedium'
import CardSmall from '../cards/CardSmall'
import PromptCreateStudio from '../studios/studiosOther/PromptCreateStudio'
import Sponsored from '../studios/studiosOther/Sponsored'
import Loading from './Loading'
import Error from './Error'
import CardLargeAccomodation from '../cards/CardLargeAccomodation'
import { isAuthenticated } from '../../lib/auth'
// import { profileUser } from '../../lib/api'

function Home({ setLoggedIn }) {

  const [studios, setStudios] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const loading = !studios && !isError

  setLoggedIn(isAuthenticated())

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllStudios()
        setStudios(res.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])

  // const initialState = { 
  //   username: '', 
  //   email: '',
  //   password: '',
  //   passwordConfirmation: '',
  //   bookedStudio: [],
  //   favouritedStudio: [],
  //   addedStudio: [],
  // }
  // const { userId } = useParams()
  // const [user, setUser] = React.useState(initialState)
  
  // React.useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await profileUser(userId)
  //       setUser(response.data)
  //       console.log(user)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   getData()
  // }, [userId, user, setUser])

  const browseAllStudios = () => {
    const rand = 1
    const newArr = [...studios]
    const resultArr = newArr.splice(rand, 3)
    return resultArr.filter(studio => {
      return studio
    })

  }

  const noOfStudios = () => {
    const newArr = [...studios]
    const resultArr = newArr.filter(studio => {
      if (studio.noOfStudios > 1) {
        return studio
      }
    })
    const newResultArr = resultArr.splice(0, 3)
    console.log(newResultArr)
    return newResultArr.filter(studio => {
      return studio
    })
  }

  return (
    <>
      <Container fluid className="no-pad hero-img">
        < div className="px-4 py-5 text-center" >
          <h1 className="display-5 fw-bold">Find and Book Recording Studios</h1>
          <div className=" px-3 py-4">
            <div className="col-lg-8 py-4 mx-auto">
              <Search studios={studios} />
            </div>
          </div>
        </div >
      </Container >
      <div className="py-3"></div>
      <div className="px-4 py-4">
        <div className="container-sm py-4">
          <h2 className="fs-1">Browse All Studios</h2>
          <div className="row">
            {isError && <Error />}
            {loading && <Loading />}
            {studios &&
              browseAllStudios().map(studio => (
                <CardSmall key={studio._id} studio={studio} />
              ))
            }
          </div>
        </div>
      </div>
      <div className="px-4 py-4">
        <div className="container-sm py-4">
          {isError && <Error />}
          {loading && <Loading />}
          {studios && <CardLargeTown studios={studios} />}
        </div>
      </div>
      <div className="px-4 py-4">
        <div className="container-sm py-4">
          <h2 className="fs-1">Explore Our Largest Studio Complexes</h2>
          <div className="row">
            {isError && <Error />}
            {loading && <Loading />}
            {studios &&
              noOfStudios().map(studio => (
                <CardMedium key={studio._id} studio={studio} />
              ))
            }
          </div>
        </div>
      </div>
      <div className="px-4 py-4">
        <div className="container-sm py-4">
          {isError && <Error />}
          {loading && <Loading />}
          {studios && <CardLargeAccomodation studios={studios} />}
        </div>
      </div>
      <div className="px-4">
        <div className="container-sm py-4">
          <Sponsored />
        </div>
      </div>
      <div className="px-4 py-4">
        <div className="container-sm py-4">
          <PromptCreateStudio />
        </div>
      </div>
    </>
  )
}

export default Home
