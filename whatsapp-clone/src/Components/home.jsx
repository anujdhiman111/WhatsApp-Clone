import React from 'react'
import { Link } from 'react-router-dom'

let Home = () => {
  return (
    <>
        <div className='main'>
            <div className='header'>
                <h1 className='headerHeading'>
                    WHATSAPP WEB
                </h1>
            </div>
            <div className='authentication'>
                <div className='authLink'>
                    <h2 className='authHeading'>To use WhatsApp on your Computer</h2>
                </div>
                <div className='authSection'>
                <div className='linksSection'>
                    <Link to= "/login" className='loginLink' >Login</Link>
                    <Link to= "/signUp" className='loginLink' >SignUp</Link>
                </div>
                <div className='qrScanner'>
                    <img src = '' alt = 'QR Scanner'/>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home