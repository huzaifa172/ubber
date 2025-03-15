import React , { useState , useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext.jsx';
import { useNavigate } from 'react-router-dom';


const CaptainLogin = () => {
try {
  const logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/800px-Uber_logo_2018.svg.png" ;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


    // error and success meassages from backend 
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("");

    // for rediraction 
    const navigate = useNavigate();
    const {captain , setCaptain} = useContext(CaptainDataContext);


  const submitHandler =  async (e)=>{
    e.preventDefault();
   
   try{ const captainLogin = {
      email: email,
      password: password,
    }

    
    // res
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captainLogin)
    console.log(response);
    
    //  if user already exists
    if(response.status === 400){
      const data = await response.data
      setMessage(data.message);
      setMessageType("error");
    }


    
    // success fully registered
    if(response.status === 200){
      const data = response.data
      console.log("Received Token:", data.tokenCaptain);
      console.log(data);
      setMessage("Logged In Successfully");
      setMessageType("success");


      // redirect to home page
      setCaptain(response.data.user);
      localStorage.setItem('tokenCaptain' , data.tokenCaptain)
      console.log(data.token);      
      setTimeout(() => navigate("/chome"), 2000);
    }
  }catch (error) {
    // ✅ Handle errors properly
    if (error.response) {
      setMessage(error.response.data.message || "Something went wrong");
      setMessageType("error");
    } else {
      setMessage("Network error. Please try again.");
      setMessageType("error");
    }
  }

    
    
    setEmail('')
    setPassword('')    
  }

  
  return (
    <div>
                    <div className="main-cnt flex flex-col justify-between items-start w-full  bg-white">
                      
                        {/* flash massage  */}
                        {message && (
                                      <div className='w-full items-center text-center'
                                          style={{
                                              padding: "10px",
                                              color: messageType === "error" ? "red" : "green",
                                              backgroundColor: messageType === "error" ? "#ffdddd" : "#ddffdd",
                                              border: `1px solid ${messageType === "error" ? "red" : "green"}`,
                                              marginBottom: "10px",
                                          }}
                                      >
                                          {message}
                                      </div>
                                  )}

                    <div className="header-cnt p-5 flex flex-col justify-between w-full">
                    <img src={logo} alt="logo" className='w-[100px]' />
                    <h3 className='pt-5 pb-0 font-semibold  text-xl'>Sign in as Captain </h3>
                    </div>
                    <div className="from-cnt px-5 w-full">
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
                        <p className='font-xs text-black'>Don't have an account? <Link to="/csignup" className="text-blue-600">Signup</Link></p>
                        <p>User? <Link to="/ulogin" className="text-blue-600"> Signin</Link></p>
                      </div>
                    </div>
                                
                </div>

    </div>
  )
  
} catch (error) {
  return (
    <div>
      <h1>{error.message}</h1>
    </div>
  )  
}}




export default CaptainLogin
