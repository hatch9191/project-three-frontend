import React from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { Form } from 'react-bootstrap'
// import { Link, useHistory } from 'react-router-dom'

import CardSmall from '../../cards/CardSmall'

function Filter({ location }) {
  // const history = useHistory()
  const [searchValue, setSearchValue] = React.useState('')
  // const [lookUp, setLookUp] = React.useState(null)
  // const [state, setState] = React.useState(false)

  const [viewport, setViewport] = React.useState({
    latitude: 51.0,
    longitude: 0.0,
    zoom: 8,
  })
  const [popup, setPopup] = React.useState(null)


  const filterStudios = () => {

    return location.state.studios.studios.filter(studio => {
      return (
        studio.name.toLowerCase().includes(searchValue.toLowerCase()) &&
        (location.state.continentValue.continentValue === 'all' || studio.location.continent.toLowerCase() === location.state.continentValue.continentValue) &&
        (location.state.pricingValue.pricingValue === 'all' || String(studio.rate) === location.state.pricingValue.pricingValue) &&
        (location.state.genreValue.genreValue === 'all' || studio.genres.some(genre => genre.toLowerCase() === location.state.genreValue.genreValue)) &&
        (location.state.townValue.townValue === 'all' || studio.location.town.toLowerCase() === location.state.townValue.townValue) &&
        (location.state.accommodationValue.accommodationValue === 'all' || studio.accommodation)
      )
    })
  }

  const handleSearch = e => {
    setSearchValue(e.target.value)
  }

  return (
    <>
      {/* <div className="py-4"></div> */}
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label></Form.Label>
                <Form.Control onChange={handleSearch} type="text" placeholder="Search..." />
                <Form.Text className="text-muted">
                  {/* Something to put here */}
                </Form.Text>
              </Form.Group>
            </Form>
            {filterStudios().length < 1 && (
              <div className="flexi-center">
                <img src="https://res.cloudinary.com/dk0r9bcxy/image/upload/v1629932250/project-image-upload-test/d64b1bc4087cbf2c574a1688ecabc8ee_qc6h1m.webp"></img>
                <p className="text-center fs-5"> Sorry, we could not find any studios matching your criteria.<br></br>
                  <small>You can try to zoom out on the map, change some filters, or clear all filters.</small> </p>
              </div>
            )}

            <div className="row">
              {/* <h2 className="fs-1">Your Search Results</h2> */}
              {filterStudios().map(studio => (
                <>
                  <CardSmall key={studio._id} studio={studio} />
                </>
              ))}

            </div>

          </div>
          <div className=" col-sm-6 mt-4 flexi-center">
            {/* <h2 className="fs-1">Map Goes Here</h2> */}
            <div className="map-container rounded">
              <ReactMapGL
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                height="100%"
                width="100%"
                mapStyle='mapbox://styles/mapbox/streets-v11'
                {...viewport}
                onClick={() => setPopup(null)}
                onViewportChange={(viewport) => setViewport(viewport)}
              >
                {filterStudios().map(studio => (
                  <>
                    <Marker
                      className="marker"
                      key={studio._id}
                      longitude={studio.location.latitude}
                      latitude={studio.location.longitude}
                    >
                      <span
                        role="img"
                        aria-label="map-marker"
                        onClick={() => setPopup(studio)}
                      >
                        📍
                        {/* {console.log(popup)} */}
                      </span>
                    </Marker>
                  </>
                ))}
                {popup &&
                  <Popup
                    key={popup._id}
                    closeOnClick={true}
                    onClose={() => setPopup(null)}
                    longitude={popup.location.latitude}
                    latitude={popup.location.longitude}
                  >

                    {console.log(popup._id)}
                    <img key={popup._id} className="small-img" src={popup.mainImage}></img>
                    <p id="no-top" className="px-4"><a href={`/studios/${popup._id}`}>{popup.name}</a><span className="float-right">{'$'.repeat(parseInt(popup.rate))}</span></p>
                    {/* {state && history.push(`/studios/${lookUp}`)} */}
                  </Popup>
                }
              </ReactMapGL>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Filter