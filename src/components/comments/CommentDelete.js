// import { Button, Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import React from 'react'
import { useParams } from 'react-router-dom'
import { deleteComment, getSingleStudio } from '../../lib/api'

function CommentDelete({ comment, studio, setStudio }) {
  // const [modal, setModal] = React.useState(false)
  const [clicked, setClicked] = React.useState(false)
  const { studioId } = useParams()



  const handleDelete = async e => {
    e.preventDefault()
    try {
      await deleteComment(studio._id, comment._id)
      const res = await getSingleStudio(studioId)
      setStudio(res.data)
    } catch (err) {
      console.log(err)
    }
  }


  const preDelete = () => {
    // setModal(true)
    setClicked(true)
  }

  return (
    <>
      {/* {modal && (
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Danger Zone</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Once a comment is deleted you will not be able to get it back.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleDelete} variant="danger">Delete Comment</Button>
          </Modal.Footer>
        </Modal.Dialog>
      )} */}
      {!clicked && <Button className="btn-danger" onClick={preDelete}>Delete Review</Button>}
      {clicked && <Button className="btn-danger" onClick={handleDelete}>Last chance...</Button>}
    </>
  )
}

export default CommentDelete