import {React , useState , useContext} from 'react'
import {Link , useNavigate} from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext.jsx';
import axios from 'axios';

const CaptainSignup = () => {

  const navigate = useNavigate()


  const logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/800px-Uber_logo_2018.svg.png" ;
    const [email, setEmail] = useState('');
    const [phoneNumber , setPhoneNumber] = useState('')
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState('');
    const [vehicleType , setVehicleType] = useState('car')
    const [vehicleColor , setVehicleColor] = useState('')
    const [vehicleCapacity , setVehicleCapacity] = useState('')
    const [vehicleModel , setVehicleModel] = useState('')
    const [vehiclePlate , setVehiclePlate] = useState('')

    // error and success meassages from backend 
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("");

    
    const {captain , setCaptain} =  useContext(CaptainDataContext)

    const submitHandler = async (e)=>{
      e.preventDefault();
      try {
      const captainData ={
        email: email,
        phoneNumber : phoneNumber,
        password: password,
        lastName : lastName,
        firstName : firstName,
        vehicleType : vehicleType , 
        vehicleColor : vehicleColor , 
        vehicleCapacity : vehicleCapacity,
        vehicleModel : vehicleModel , 
        vehiclePlate : vehiclePlate 
        
      }
      
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData)
      console.log(response.data);
      
      // if user already exists
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
        setUser(response.data.captain);
        localStorage.setItem('tokenCaptain' , data.tokenCaptain)
        setTimeout(() => navigate("/chome"), 2000);
      }
    }catch (error) {
    // ✅ Handle errors properly
    if (error.response) {
      setMessage(error.response.data.message || "Something went wrong");
      setMessageType("error");
    }
  
      

      // making blank the feilds 
      setEmail('')
      setPhoneNumber('')
      setPassword('')    
      setFirstName('')
      setLastName('')
      setVehicleType('')
      setVehicleColor('')
      setVehicleCapacity('')
      setVehicleModel('')
      setVehiclePlate('')
    }
  
  }
  return (
    <div>
      <div className="main-cnt flex flex-col justify-between items-start w-full  bg-white ">
      

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
                    <h3 className='pt-5 pb-0 font-semibold  text-xl'>Signup  as Captain </h3>
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
                      
                      
                      
                      
                      
                          <div className="email-phone-cnt flex  justify-between w-full gap-2">
                          
                          <div className="email-cnt w-[50%]">
                            <h4>Email</h4>
                          <input 
                          required type="email" name="email" id="email" placeholder='Email' className='outline-none border border-[rgba(0, 0, 0, 0.2)] w-full px-2 py-2 rounded-md '
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                          }}      
                          />
                          </div>


                          <div className="Phone-cnt w-[50%]">
                          <h4>Phone</h4>
                          <input 
                          required type="tel" name="phoneNumber" id="phoneNumber" placeholder='Phone Number' className='outline-none border border-[rgba(0, 0, 0, 0.2)] w-full px-2 py-2 rounded-md '
                         
                          value={phoneNumber}
                          onChange={(e) => {
                            setPhoneNumber(e.target.value)
                          }}      
                          />
                          </div>


                          </div>
                          
                          
                          
                          
                          
                          <h4>Password</h4>
                          <input 
                          required type="password" name='password' placeholder='Password' className='outline-none border border-[rgba(0, 0, 0, 0.2)] w-full px-2 py-2 rounded-md '
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value)
                          }}
                          />




                          {/* vehicle inputs are here  */}

                            <h4>Vehicle</h4>
                          <div className="vehicle-cnt flex flex-row justify-between items-start w-full gap-2 text-[10px]">
                            <select name="vehicleType" id="vehicleType" className='outline-none border border-[rgba(0, 0, 0, 0.2)] w-full px-2 py-2 rounded-md '
                              value={vehicleType}
                              onChange={(e) => {
                                setVehicleType(e.target.value)
                              }}
                            >
                              <option value="car">car</option>
                              <option value="bike">bike</option>
                            </select>
                            <input required type="text" name='vehiclePlate' placeholder='Number Plate' className='outline-none border border-[rgba(0, 0, 0, 0.2)] w-full px-2 py-2 rounded-md '
                            value={vehiclePlate}
                            onChange={(e) => {
                              setVehiclePlate(e.target.value)
                            }}
                            />
                            <input required type="text" name='vehicleColor' placeholder='Color' className='outline-none border border-[rgba(0, 0, 0, 0.2)] w-full px-2 py-2 rounded-md '
                            value={vehicleColor}
                            onChange={(e) => {
                              setVehicleColor(e.target.value)
                            }}
                            />
                            
                            <input required type="text" name='vehicleModel' placeholder='Model' className='outline-none border border-[rgba(0, 0, 0, 0.2)] w-full px-2 py-2 rounded-md '
                            value={vehicleModel}
                            onChange={(e) => {
                              setVehicleModel(e.target.value)
                            }}
                            />
                            
                            <input required type="text" name='vehicleCapacity' placeholder='Capacity' className='outline-none border border-[rgba(0, 0, 0, 0.2)] w-full px-2 py-2 rounded-md '
                            value={vehicleCapacity}
                            onChange={(e) => {
                              setVehicleCapacity(e.target.value)
                            }}
                            />
                            </div>

                          <button className='w-full mt-2 p-3 bg-black text-white rounded-md '>Signup</button>
                        </form>
                      </div>



                      <div className="other-opt flex justify-between items-center text-xs">
                        <p className='font-xs text-black'>Already have an account ? <Link to="/clogin" className="text-blue-600">login</Link></p>
                        <p>User? <Link to="/usignup" className="text-blue-600">Sign Up </Link></p>
                      </div>
                    </div>
                                
                </div>
    </div>
  )
  
}

export default CaptainSignup
