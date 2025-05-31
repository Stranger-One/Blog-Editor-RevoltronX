import React from 'react'
import { Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <Outlet />
    </div>
  )
}

export default Auth