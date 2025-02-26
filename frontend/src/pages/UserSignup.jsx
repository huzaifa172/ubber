import React , {useState} from 'react'
import { Link } from 'react-router-dom'


const UserSignup = () => {

  try {
    const logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/800px-Uber_logo_2018.svg.png" ;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState('');
      
    const [userData , setUserData] = useState({});    


    const submitHandler = (e)=>{
      e.preventDefault();
      setUserData({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      })
      console.log(userData)
      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('')
    }
  return (
      <div>
              <div className="main-cnt flex flex-col justify-between items-start w-full  bg-white">


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

}catch (error) {
    console.log(error.message);
    
  return (
    <div>
      <h1>{error.message}</h1>
    </div>
  )       
}}
export default UserSignup
