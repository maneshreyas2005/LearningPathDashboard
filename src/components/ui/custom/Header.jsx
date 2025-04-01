import React from 'react'
import logo from "../logo/logo2.svg";
import { Button } from "../button";

function Header() {
  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      
        <img src={logo} alt="N/A" />
      
      <div>
          <Button>Sign in</Button>
      </div>
    </div>
  )
}

export default Header