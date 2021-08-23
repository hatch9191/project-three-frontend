import React from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { Form } from 'react-bootstrap'

import CardSmall from '../../cards/CardSmall'

function Filter({ location }) {
  const [searchValue, setSearchValue] = React.useState('')

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
      <div className="py-4"></div>
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
            <div className="row">
              {/* <h2 className="fs-1">Your Search Results</h2> */}
              {filterStudios().map(studio => (
                <>
                  <CardSmall key={studio._id} studio={studio} />
                </>
              ))}
            </div>
          </div>

          <div className="col mt-4 flexi-center">
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
                        {console.log(popup)}
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
                    <img key={popup._id} className="small-img" src={popup.mainImage}></img>
                    <p id="no-top" className="px-4">{popup.name}<span className="float-right">{'$'.repeat(parseInt(popup.rate))}</span></p>
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