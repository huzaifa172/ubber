import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
  
  const tokenCaptain = localStorage.getItem('tokenCaptain')
  const navigate = useNavigate()
  
  axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
    headers: {
      Authorization : `Bearer ${tokenCaptain}`
    }

  }).then((response)=>{

    if(response.status === 200){
      localStorage.removeItem('tokenCaptain')
      navigate('/clogin')
    }

  })
  
  return (
    <div>
      User Log out
    </div>
  )
}

export default CaptainLogout
