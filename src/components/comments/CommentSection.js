import React from 'react'
import { Form } from 'react-bootstrap'
import CommentDelete from './CommentDelete'
import CommentForm from './CommentForm'
import { isOwner } from '../../lib/auth'


function CommentSection({ studio, setStudio }) {
  const [changeValue, setChangeValue] = React.useState('none')


  const sortComments = () => {
    return studio.comments.sort((a, b) => {
      if (changeValue === 'highestRated') {
        return b.rating - a.rating
      } else if (changeValue === 'lowestRated') {
        return a.rating - b.rating
      } else if (changeValue === 'newest') {
        return parseInt(b.createdAt.replaceAll(/[^0-9]/g, '')) - parseInt(a.createdAt.replaceAll(/[^0-9]/g, ''))
      } else if (changeValue === 'oldest') {
        return parseInt(a.createdAt.replaceAll(/[^0-9]/g, '')) - parseInt(b.createdAt.replaceAll(/[^0-9]/g, ''))
      } else {
        return
      }
    })
  }


  const handleChange = e => {
    setChangeValue(e.target.value)
  }


  const star = '⭐️'



  return (
    <>
      {!studio.comments.length ? '' :
        <div className="px-4 py-2">
          <div className="container-sm py-4 ">
            <div className="w-25">
              <p className="inline-block"><strong>Average Rating:</strong> {star.repeat(Math.round(studio.avgRating.toFixed(1)))}</p>
              <Form.Select className="nothing" onChange={handleChange} aria-label="Floating label select example">
                <option value="" selected disabled>Reviews</option>
                <option value="highestRated">Highest to Lowest Rated</option>
                <option value="lowestRated">Lowest to Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </Form.Select>
            </div>
          </div>
        </div>
      }

      {!studio.comments.length ?
        <>
          <div className="px-4 py-2">
            <div className="container-sm py-4 ">
              <p>0 reviews </p>
            </div>
          </div>
        </>
        :
        <div className="px-4 py-2">
          <div className="container-sm py-4 ">
            <div className="card small-width">
              <div className="list-group list-group-flush">

                {sortComments().map(comment => (
                  <div key={comment._id} className="list-group-item">
                    <p className="fw-bold pt-3">Review by: <span className="fw-normal">{comment.addedBy.username[0].toUpperCase() + comment.addedBy.username.substr(1).toLowerCase()}</span></p>
                    <p className="fw-bold pt-3">Rated: <span className="fw-normal">{comment.rating}/5</span></p>
                    <p>{comment.text}</p>
                    {isOwner(comment.addedBy._id) && <div className=" container display-right"><CommentDelete comment={comment} studio={studio} /></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      }
      <CommentForm setStudio={setStudio} />


    </>
  )
}

export default CommentSection