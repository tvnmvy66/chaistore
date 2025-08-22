import React from 'react'
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import ReactDOM from 'react-dom'
import { Link } from "react-router-dom"

function Nav() {
  const [show, setShow] = React.useState(false)

  return (
    <div>
      {!show ? (
        <div onClick={() => setShow(!show)}><Menu /></div>
      ) : (
        <div onClick={() => setShow(!show)}><X /></div>
      )}
      {show && ReactDOM.createPortal(
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-[#F5E6D3]/50 backdrop-blur-lg text-[#4B2E2A] flex flex-col justify-center items-center gap-5"
        >
          <ul className="flex flex-col items-center text-2xl gap-3">
            <li><Link to="/" onClick={() => setShow(false)} className=' hover:underline'>Home</Link></li>
            <li><Link to="/shop" onClick={() => setShow(false)} className=' hover:underline'>Shop</Link></li>
            <li><Link to="/orders" onClick={() => setShow(false)} className=' hover:underline'>Orders</Link></li>
            <li><Link to="/myaccount" onClick={() => setShow(false)} className=' hover:underline'>Profile</Link></li>
          </ul>
          <div onClick={() => setShow(!show)} className="bg-[#4B2E2A] p-2 rounded-full cursor-pointer">
            <X color="#F5E6D3" />
          </div>
        </motion.div>,
        document.body
      )}
    </div>
  )
}

export default Nav
