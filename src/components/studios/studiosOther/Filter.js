import CardSmall from './CardSmall'

function Filter({ location }) {

  const filterStudios = () => {
    return location.state.studios.studios.filter(studio => {
      return (
        (location.state.continentValue.continentValue === 'all' || studio.location.continent.toLowerCase() === location.state.continentValue.continentValue) &&
        (location.state.pricingValue.pricingValue === 'all' || String(studio.rate) === location.state.pricingValue.pricingValue) &&
        (location.state.genreValue.genreValue === 'all' || studio.genres.some(genre => genre.toLowerCase() === location.state.genreValue.genreValue))
      )
    })
  }

  return (
    <>
      <div className="py-4"></div>

      <div className="container">
        <div className="row">
          <div className="col">
            <div className="row">
              <h2 className="fs-1">Your Search Results</h2>
              {filterStudios().map(studio => (
                <CardSmall key={studio._id} studio={studio} />
              ))}
            </div>
          </div>

          <div className="col">
            <h2 className="fs-1">Map Goes Here</h2>
          </div>
        </div>
      </div>






      {console.log(filterStudios())}
    </>
  )
}

export default Filter