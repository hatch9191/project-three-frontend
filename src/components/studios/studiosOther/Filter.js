import React from 'react'
// import ReactMapGL, { Marker, Popup } from 'react-map-gl'

import CardSmall from '../../cards/CardSmall'

function Filter({ location }) {
  // const [viewport, setViewport] = React.useState({
  //   latitude: 51.0,
  //   longitude: 0.0,
  //   zoom: 8,
  // })
  // const [popup, setPopup] = React.useState(null)


  const filterStudios = () => {

    return location.state.studios.studios.filter(studio => {
      console.log(studio.accommodation)
      return (
        (location.state.continentValue.continentValue === 'all' || studio.location.continent.toLowerCase() === location.state.continentValue.continentValue) &&
        (location.state.pricingValue.pricingValue === 'all' || String(studio.rate) === location.state.pricingValue.pricingValue) &&
        (location.state.genreValue.genreValue === 'all' || studio.genres.some(genre => genre.toLowerCase() === location.state.genreValue.genreValue)) &&
        (location.state.townValue.townValue === 'all' || studio.location.town.toLowerCase() === location.state.townValue.townValue) &&
        (location.state.accommodationValue.accommodationValue === 'all' || studio.accommodation)
      )
    })
  }

  return (
    <>
      <div className="py-4"></div>

      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="row">
              <h2 className="fs-1">Your Search Results</h2>
              {filterStudios().map(studio => (
                <>
                  <CardSmall key={studio._id} studio={studio} />
                </>
              ))}
            </div>
          </div>




          <div className="col">
            <h2 className="fs-1">Map Goes Here</h2>
            {/* <div className="map-container">
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

                  <Marker
                    key={studio._id}
                    longitude={studio.location.longitude}
                    latitude={studio.location.latitude}
                  >
                    <span
                      role="img"
                      aria-label="map-marker"
                      onClick={() => setPopup(studio)}
                    >
                      {studio.icon}
                    </span>
                  </Marker>

                ))}
                {popup &&
                  <Popup
                    key={popup._id}
                    closeOnClick={true}
                    onClose={() => setPopup(null)}
                    latitude={popup.location.latitude}
                    longitute={popup.location.longitude}
                  >
                    <div>{popup.name}</div>
                  </Popup>
                }
              </ReactMapGL>
            </div> */}
          </div>
        </div>
      </div>






    </>
  )
}

export default Filter