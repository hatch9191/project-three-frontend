import { Redirect } from 'react-router-dom'
import React from 'react'

function CardLargeTown({ studios }) {
  const [continentValue, setContinentValue] = React.useState('all')
  const [pricingValue, setPricingValue] = React.useState('all')
  const [genreValue, setGenreValue] = React.useState('all')
  const [townValue, setTownValue] = React.useState('all')
  const [accommodationValue, setAccommodationValue] = React.useState('all')
  const [state, setState] = React.useState(false)

  const handleClick = () => {
    setContinentValue('all')
    setPricingValue('all')
    setGenreValue('all')
    setTownValue('london')
    setAccommodationValue('all')
    setState(true)
  }

  return (
    <>
      <div className="mb-3">
        <h2 className="fs-1">Discover London&rsquo;s Hidden Gems</h2>
      </div>
      <div className="card mb-3 mr-3 display-card-hor card-shadow" >
        <div className="row g-0">
          <div className="col-md-4">
            <img src="https://cw-gbl-gws-prod.azureedge.net/-/media/cw/emea/united-kingdom/offices/hero-image-emea-offices-london-obs-small-750x480.jpeg?rev=73a7eef27ca3448fba8a66dc889a12b0" className="img-fluid height-100 rounded-start" alt="..."></img>
          </div>
          <div className="col-md-8">
            <div className="card-body middle-card">
              <h5 className="card-title fs-4">Card title</h5>
              <p className="card-text center-text">This is a wider card with supporting text more text herr to builf it out a bit and make it look better below as a natural lead-in to additional content. This content is a little bit longer.</p>
              {state ?
                <Redirect
                  push
                  to={{
                    pathname: '/studios',
                    state: {
                      continentValue: { continentValue },
                      pricingValue: { pricingValue },
                      genreValue: { genreValue },
                      townValue: { townValue },
                      accommodationValue: { accommodationValue },
                      studios: { studios },
                    },
                  }}
                >Hiya</Redirect> : ''}
              <button onClick={handleClick} type="button" className="btn btn-info px-5">Browse All Studios In London</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CardLargeTown