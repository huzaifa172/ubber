import React , {useContext , useState , useEffect} from 'react'
import { UserDataContext } from '../context/UserContext.jsx'
import { useNavigate } from 'react-router-dom'

const CaptainProtectWrapper = ({
  children
}) => {
  const token = localStorage.getItem('tokenCaptain')
  const navigate = useNavigate()

  console.log(token)



  useEffect(() => {
    if (!token) {
      navigate("/clogin");
    }
  }, [token, navigate]);
  return (
    <>
      {children}
    </>
  )
}

export default CaptainProtectWrapper