
function CardMedium({ studio }) {
  return (
    <>
      <div className="col-sm-4">
        <div className="card pop-out card-shadow">
          <img src={studio.mainImage} className="card-img-top" alt="..."></img>
          <div className="card-body center-card card-shadow">
            <h5 className="card-title">{studio.name}</h5>
            <p className="card-text text-center">Some quick example text to build on the card title and make up the bulk of the card&apos;s content.</p>
            <button type="button" className="btn btn-info">Go somewhere</button>
          </div>
        </div>
        <div className="px-4 py-3"></div>

      </div >
    </>
  )
}

export default CardMedium