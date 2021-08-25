import { Button, Modal } from 'react-bootstrap'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { deleteComment } from '../../lib/api'

function CommentDelete({ comment, studio }) {
  const [modal, setModal] = React.useState(false)
  const history = useHistory()
  const { studioId } = useParams()


  const handleDelete = async () => {
    await deleteComment(studio._id, comment._id)
    history.push(`/studios/${studioId}`)
    location.reload()
  }


  const preDelete = () => {
    setModal(true)
  }

  return (
    <>
      {modal && (
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
      )}
      <Button onClick={preDelete}>Delete Review</Button>
    </>
  )
}

export default CommentDelete