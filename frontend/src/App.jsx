import React from 'react'
import { useContext } from 'react'
import { Routes , Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Start from './pages/Start.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserSignup from './pages/UserSignup.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainSignup from './pages/CaptainSignup.jsx'
import { UserDataContext } from './context/UserContext.jsx'
import UserProtextWrapper from './components/UserProtextWrapper.jsx'
import UserLogout from './components/UserLogout.jsx'



const App = () => {
 const ans =  useContext(UserDataContext)
  console.log(ans);
  
 return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={
          <UserProtextWrapper>
            <Home />
          </UserProtextWrapper>
          } />
        <Route path="/ulogin" element={<UserLogin />} />
        <Route path="/usignup" element={<UserSignup />} />
        <Route path="/clogin" element={<CaptainLogin />} />
        <Route path="/csignup" element={<CaptainSignup />} />
        <Route path="/users/logout" element={
          <UserProtextWrapper>
            <UserLogout />
          </UserProtextWrapper>
        }/>
     </Routes>
    </div>
  )
}

export default App
