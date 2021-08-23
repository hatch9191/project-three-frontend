import { Redirect } from 'react-router-dom'
import React from 'react'


function CardLargeAccomodation({ studios }) {
  const [continentValue, setContinentValue] = React.useState('all')
  const [pricingValue, setPricingValue] = React.useState('all')
  const [genreValue, setGenreValue] = React.useState('all')
  const [townValue, setTownValue] = React.useState('all')
  const [accomodationValue, setAccomodationValue] = React.useState('all')
  const [state, setState] = React.useState(false)

  const handleClick = () => {
    setContinentValue('all')
    setPricingValue('all')
    setGenreValue('all')
    setTownValue('all')
    setAccomodationValue('not all')
    setState(true)
  }




  return (
    <>
      <div className="mb-3">
        <h2 className="fs-1">Studios With Accomodation</h2>
      </div>
      <div className="card mb-3 mr-3 display-card-hor card-shadow" >
        <div className="row g-0">
          <div className="col-md-4">
            <img src="https://media.cntraveler.com/photos/5e9907c14ab09800086faf63/master/w_1400,h_933,c_limit/airbnb-view-37143825.jpg" className="img-fluid height-100 rounded-start" alt="..."></img>
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
                      accomodationValue: { accomodationValue },
                      studios: { studios },
                    },
                  }}
                >Hiya</Redirect> : ''}
              <button onClick={handleClick} type="button" className="btn btn-info px-5">Browse All Studios With Accomodation</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CardLargeAccomodation