import React from 'react'
import { Container } from 'react-bootstrap'

import Search from './Search'
import { getAllStudios } from '../../lib/api'
import CardLargeTown from '../studios/studiosOther/CardLargeTown'
import CardMedium from '../studios/studiosOther/CardMedium'
import CardSmall from '../studios/studiosOther/CardSmall'
import PromptCreateStudio from '../studios/studiosOther/PromptCreateStudio'
import Sponsored from '../studios/studiosOther/Sponsored'
import Loading from './Loading'
import Error from './Error'
import CardLargeAccomodation from '../studios/studiosOther/CardLargeAccomodation'

function Home() {
  const [studios, setStudios] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const loading = !studios && !isError

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

  const showcaseStudios = () => {
    return studios.filter(studio => {
      return studio
    })
  }

  const accomodationStudios = () => {
    return studios.filter(studio => {
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
          <h2 className="fs-1">Showcase Studios</h2>
          <div className="row">
            {isError && <Error />}
            {loading && <Loading />}
            {studios &&
              showcaseStudios().map(studio => (
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
          {studios && <CardLargeTown />}
        </div>
      </div>
      <div className="px-4 py-4">
        <div className="container-sm py-4">
          <h2 className="fs-1">North Americas Best Studios</h2>
          <div className="row">
            {isError && <Error />}
            {loading && <Loading />}
            {studios &&
              accomodationStudios().map(studio => (
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
          {studios && <CardLargeAccomodation />}
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
