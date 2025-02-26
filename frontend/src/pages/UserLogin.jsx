import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const UserLogin = () => {
  const logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/800px-Uber_logo_2018.svg.png" ;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [userData , setUserData] = useState({});



  const submitHandler = (e)=>{
    e.preventDefault();
    setUserData({
      email: email,
      password: password,
    })
    
    console.log(userData)
    setEmail('')
    setPassword('')    
  }

  return (
    <div>

              <div className="main-cnt flex flex-col justify-between items-start w-full  bg-white">
                    <div className="header-cnt p-5 flex flex-col justify-between w-full">
                    <img src={logo} alt="logo" className='w-[100px]' />
                    <h3 className='pt-5 pb-0 font-semibold  text-xl'>Sign in as user </h3>
                    </div>
                    <div className="from-cnt  px-5 w-full">
                      <div className="form flex flex-col justify-between items-start w-full">
                        <form onSubmit={(e)=>{
                          submitHandler(e)
                        }} className='pb-5 w-full flex flex-col justify-between items-start gap-3'> 
                          <h4>Email</h4>
                          <input 
                          required type="email" name="email" id="email" placeholder='Email' className='outline-none border border-[rgba(0, 0, 0, 0.2)] w-full px-2 py-2 rounded-md '
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                          }}      
                          />
                          <h4>Password</h4>
                          <input 
                          required type="password" name='password' placeholder='Password' className='outline-none border border-[rgba(0, 0, 0, 0.2)] w-full px-2 py-2 rounded-md '
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value)
                          }}
                          />
                          <button className='w-full mt-2 p-3 bg-black text-white rounded-md '>Login</button>
                        </form>
                      </div>



                      <div className="other-opt flex justify-between items-center text-xs">
                        <p className='font-xs text-black'>Don't have an account? <Link to="/usignup" className="text-blue-600">Signup</Link></p>
                        <p>Captain? <Link to="/clogin" className="text-blue-600"> Signin</Link></p>
                      </div>
                    </div>
                                
                </div>


    </div>
  )
}

export default UserLogin
