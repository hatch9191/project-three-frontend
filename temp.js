import Loading from '../common/Loading'
import Error from '../common/Error'
import { useParams } from 'react-router-dom'
import React from 'react'
import { bookRead, getSingleBook } from '../../lib/api'
import Review from './Review'
import Buttons from './Buttons'
import { isOwner, isAuthenticated, getToken } from '../../lib/auth'


function BookShow() {
  const { bookId } = useParams()
  const [book, setBook] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !book && !isError

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getSingleBook(bookId)
        setBook(res.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [bookId])

  const handleReadBook = async () => {
    await bookRead(book._id)
    try {
      const res = await getSingleBook(bookId)
      setBook(res.data)
    } catch (err) {
      setIsError(true)
    }
  }

  function getPayLoad() {
    const token = getToken()
    if (!token) return false
    const parts = token.split('.')
    if (parts.length < 3) return false
    return JSON.parse(atob(parts[1])).sub
  }

  return (
    <section className="section">

      <div className="container">
        {isError && <Error />}
        {isLoading && <Loading />}
        {book && (
          <div>
            <h2 className="title has-text-centered">{book.title}</h2>
            <hr />
            <div className="columns">
              <div className="column is-half center-it">
                <figure className="display-image shadow">
                  <img className="display-img" src={book.image} alt={book.title} />
                </figure>
              </div>
              <div className="column is-half">
                <h4 className="title is-4">
                  Description
                </h4>
                <p>{book.description}</p>
                <hr />
                <h4 className="title is-4">
                  Author
                </h4>
                <p>{book.author}</p>
                <hr />
                <h4 className="title is-4">
                  More Info
                </h4>
                <p>Click here to check the book out on <a href="http://amazon.com" rel="noreferrer" target="_blank">Amazon</a>.</p>
                <hr />
                <div className="spec">
                  {isAuthenticated() && <button onClick={handleReadBook} className="button inline-block orange">{(book.readBy.some(user => user._id === getPayLoad())) ? 'Remove From' : 'Add To'} Read Books</button>}
                  {(
                    isOwner(book.addedBy._id) && <div className="buttons inline-block"><Buttons book={book} /></div>
                  )}

                </div>
              </div>
            </div>
            <div>
              {(
                <Review book={book} setBook={setBook} />
              )}
            </div>
          </div>
        )}
      </div>
      <div>
      </div>
    </section>
  )
}
export default BookShow