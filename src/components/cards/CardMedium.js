import { Link } from 'react-router-dom'


function CardMedium({ studio }) {

  return (
    <>
      <div className="col-lg-4">
        <div className="card pop-out  card-shadow sml-crd ensure">
          <img src={studio.mainImage} className="card-img-top special format-size fit" alt="..."></img>
          <div className="card-body special  center-card card-shadow">
            <h5 className="card-title">{studio.name}</h5>
            <p className="px-4 w-100">{studio.location.town}<span className="float-right">{'$'.repeat(parseInt(studio.rate))}</span></p>
            <p className="px-4 w-100">No of Studios<span className="float-right">{'⌂'.repeat(parseInt(studio.noOfStudios))}</span></p>
            <Link to={`/studios/${studio._id}`}>
              <button type="button" className="btn btn-info">Explore The Studio</button>
            </Link>
          </div>
        </div>
        <div className="px-4 py-3"></div>

      </div >
    </>
  )
}

export default CardMedium