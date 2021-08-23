
function ClientCard({ client }) {
  return (
    <>
      <div className="col-sm-4">
        <div className="card pop-out card-shadow">
          <img src={client.image} className="card-img-top resize-img" alt="..."></img>
          <div className="card-body center-card smaller card-shadow">
            <h5 className="card-title">{client.name}</h5>
            {/* <p className="card-text text-center">Some quick example text to build on the card title and make up the bulk of the card&apos;s content.</p>
            <button type="button" className="btn btn-info">Go somewhere</button> */}
          </div>
        </div>
        <div className="px-4 py-3"></div>

      </div >
    </>
  )
}

export default ClientCard