import React from 'react'
import { Link } from 'react-router-dom'
const home = () => {
  const logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/800px-Uber_logo_2018.svg.png" ;
  const backgroundImage = "https://images.unsplash.com/photo-1624724126923-e2c021df1311?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div>
      {/* main cnt  */}
        <div className="w-full h-[100vh] flex flex-col justify-between items-start main-cnt" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>

          <div className="img-cnt p-5">
            <img src={logo} alt="logo" className='w-[100px]' />
          </div>

          <div className="continue-cnt  p-5 py-5 flex flex-col justify-between items-start w-full h-1/5 bg-white">
              <div className="hding-cnt">
                <h1 className='text-2xl font-bold'>Get Started With Uber</h1>
              </div>
              <div className="btn w-full">
                <Link to='/ulogin' className='rounded-md p-3 w-full flex justify-center items-center bg-black text-white'>Continue</Link>
              </div>
          </div>


        </div>
    </div>
  )
}

export default home
