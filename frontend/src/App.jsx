import React from 'react'
import { useContext } from 'react'
import { Routes , Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserSignup from './pages/UserSignup.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainSignup from './pages/CaptainSignup.jsx'
import { UserDataContext } from './context/UserContext.jsx'


const App = () => {
 const ans =  useContext(UserDataContext)
  console.log(ans);
  
 return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ulogin" element={<UserLogin />} />
        <Route path="/usignup" element={<UserSignup />} />
        <Route path="/clogin" element={<CaptainLogin />} />
        <Route path="/csignup" element={<CaptainSignup />} />
     </Routes>
    </div>
  )
}

export default App
