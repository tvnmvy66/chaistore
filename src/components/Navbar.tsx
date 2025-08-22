// import React from 'react'
import Nav from "./ui/Nav"
import UserManager from "@/components/UserManager.tsx"
import CartSystem from "@/components/CartSystem.tsx"
function Navbar() {
  return (
    <div className="font-mono flex max-w-screen justify-between items-center p-3 bg-white/20 backdrop-blur-lg border-b border-white/30 shadow-lg">
        <div className=" cursor-pointer"><Nav /></div>
        <div className="text-xl font-bold cursor-pointer"><a href="/">Chai-st0re</a></div> 
        <div className="flex items-center gap-4">
          <div>
            <CartSystem/>
          </div>
          <div>
            <UserManager/>        
          </div>
        </div>
    </div>
  )
}

export default Navbar