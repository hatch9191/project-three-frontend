import React from 'react'
import { useParams } from 'react-router-dom'

import { profileUser } from '../../lib/api'

function Profile() {

  const { userId } = useParams()
  const [user, setUser] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  // const isLoading = !cheese && !isError

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await profileUser(userId)
        setUser(response.data)
      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    }
    getData()
  }, [userId])

  console.log(user)

  return (
    <>
      {!isError && (
        <h1>{user.username}</h1>
      )}
    </>
  )
}

export default Profile