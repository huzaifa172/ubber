import React, { useState } from 'react'
import { createContext } from 'react'
export const UserDataContext = createContext()


const UserContext = ({children}) => {
  const [userData , setUserData] = useState({
    email : "",
    password : "",
    fullName :{
      firstName : "",
      lastName : ""
    }

  })
  return (
    <div>
      <UserDataContext.Provider value={ [userData , setUserData] }>
        {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
