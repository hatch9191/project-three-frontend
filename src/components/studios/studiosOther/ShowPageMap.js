import React from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'




function ShowPageMap({ studio }) {

  const [viewport, setViewport] = React.useState({
    latitude: studio.location.longitude,
    longitude: studio.location.latitude,
    zoom: 12,
    scrollZoom: false,
  })
  const [popup, setPopup] = React.useState(null)


  return (
    <>
      <div className="px-4 py-2">
        <div className="container-sm py-4 ">
          <div className="map-container rounded make-smaller max-height-500px">

            <ReactMapGL
              className="max-height-500px"
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              height="100%"
              width="100%"
              
              mapStyle='mapbox://styles/mapbox/streets-v11'
              {...viewport}
              onClick={() => setPopup(null)}
              onViewportChange={(viewport) => setViewport(viewport)}
            >
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
                </span>
              </Marker>
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
      <div className="mb-4"></div>

    </>
  )
}

export default ShowPageMap