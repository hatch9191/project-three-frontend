
function CardSmall({ studio }) {
  return (
    <div className="col-sm-4 card-shadow">

      <div
        className="card display-card "
        style={{
          background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url(${studio.mainImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'drop-shadow(0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.2))',
        }}>
        <div className="card-body">
          <h5 className="card-title">{studio.name}</h5>
          <p className="card-text">{studio.location.town}</p>
        </div>
      </div>
      <div className="px-4 py-3"></div>

    </div>
  )
}

export default CardSmall