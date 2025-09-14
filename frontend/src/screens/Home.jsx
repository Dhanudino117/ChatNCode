import React from 'react'
import { useUser } from '../context/user.context'

const Home = () => {
  const { user } = useUser()
  return (
    <div>
      <h1>{JSON.stringify(user)}</h1>
    </div>
  )
}

export default Home
