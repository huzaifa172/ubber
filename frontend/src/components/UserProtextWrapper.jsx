import React , {useContext , useState , useEffect} from 'react'
import { UserDataContext } from '../context/UserContext.jsx'
import { useNavigate } from 'react-router-dom'

const UserProtextWrapper = ({
  children
}) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  console.log(token)



  useEffect(() => {
    if (!token) {
      navigate("/ulogin");
    }
  }, [token, navigate]);
  return (
    <>
      {children}
    </>
  )
}

export default UserProtextWrapper