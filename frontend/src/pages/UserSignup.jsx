import React , {useState , useContext} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext.jsx'



const UserSignup = () => {
    const logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/800px-Uber_logo_2018.svg.png" ;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState('');
    const [userData , setUserData] = useState({});    


    // error and success meassages from backend 
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("");


    // for rediraction 
    const navigate = useNavigate();
    const {user , setUser} = useContext(UserDataContext);

    // form handler 
    const submitHandler = async (e)=>{
      e.preventDefault();
      try {
      const newUser = {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName
       
      }


      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
      console.log(response.data);
      
      // if user already existsx
      if(response.status === 400){
        const data = await response.data
        setMessage(data.message);
        setMessageType("error");
      }
  
      // success fully registered
      if(response.status === 200){
        const data = response.data
        console.log(data);
        setMessage("Registration successful!");
        setMessageType("success");

        // redirect to home page
        setUser(response.data.user);
        localStorage.setItem('token' , data.token)
        setTimeout(() => navigate("/home"), 2000);
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


      console.log(userData)
      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('')
   
   
   
      setTimeout(() => setMessage(null), 3000);
    }
// handler for closing the message

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
                    <h3 className='pt-5 pb-0 font-semibold  text-xl'>Sign up as User </h3>
                    </div>


                    <div className="from-cnt px-5 w-full">

                      <div className="form flex flex-col justify-between items-start w-full">

                        <form onSubmit={(e)=>{
                          submitHandler(e)
                        }} className='pb-5 w-full flex flex-col justify-between items-start gap-3'> 
                          
                          <h4>Full Name</h4>
                          <div className="name flex flex-row justify-between w-full gap-2">
                            <input 
                            value={firstName}
                            onChange={(e) => {
                              setFirstName(e.target.value)
                            }}
                            type="text" name='firstName'  placeholder='First Name' required className='outline-none border border-[rgba(0, 0, 0, 0.2)] w-full px-2 py-2 rounded-md '/>
                           
                            <input
                            value={lastName}
                            onChange={(e) => {
                              setLastName(e.target.value)
                            }}
                            type="text" name='lastName'  placeholder='Last Name' className='outline-none border border-[rgba(0, 0, 0, 0.2)] w-full px-2 py-2 rounded-md '/>
                          </div>
                         
                          <h4>Email</h4>
                          <input 
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                          }}
                          required type="email" name="email" id="email" placeholder='Email' className='outline-none border border-[rgba(0, 0, 0, 0.2)] w-full px-2 py-2 rounded-md '
                          />
                         
                          <h4>Password</h4>
                          <input 
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value)
                          }}
                          required type="password" name='password' placeholder='Password' className='outline-none border border-[rgba(0, 0, 0, 0.2)] w-full px-2 py-2 rounded-md '
                          />
                         
                          <button className='w-full mt-2 p-3 bg-black text-white rounded-md '>Sign Up</button>
                      
                        </form>
                      </div>



                      <div className="other-opt flex justify-between items-center text-xs">
                        <p className='font-xs text-black'>Already have an account? <Link to="/ulogin" className="text-blue-600">Login User</Link></p>
                        <p>Captain? <Link to="/csignup" className="text-blue-600"> Sign Up</Link></p>
                      </div>
                    </div>
                                
                </div>
    </div>
  )

}

export default UserSignup
