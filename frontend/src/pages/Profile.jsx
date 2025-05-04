import React from 'react'
import Userdashboard from '../components/Userdashboard'
import User from '../components/User'

export default function Profile() {
  return (
    <div className='flex' >
      
      <div  >
        <Userdashboard />
      </div>

      
      <div className="ml-auto flex-1 overflow-y-auto ">
        <User />
      </div>
    </div>
  )
}
