import React,{ useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "motion/react"
import { CircleUserRound, UserCog, LogIn, LogOut, X } from "lucide-react"
import { Separator } from '@/components/ui/separator'
import { Card } from '@/components/ui/card'
import ReactDOM from 'react-dom';
import {type CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner"
import { Link } from "react-router-dom"
import api from "../lib/api.ts"
interface User {
  email: string,
  name: string,
  givenName: string,
  familyName: string,
  picture: string
}

function UserManager() {
  const [show, setShow] = React.useState<boolean>(false)
  const [showLogin, setShowLogin] = React.useState<boolean>(false)
  const [user,setUser] = useState<User | null>(null);

  useEffect(() => {
    // Access localStorage only on client side
    if (typeof window !== 'undefined') {
      const userInfo = localStorage.getItem('userInfo') || null;
      if (userInfo) {
        setUser(JSON.parse(userInfo) as User);
      }
    }
  }, []);

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      console.error("No credential received");
      return;
    }
    try {
      const response = await api.post(`/api/auth/google`,{ credential: credentialResponse.credential });
      console.log(response.data)
      if (response){
        const data = await response.data
        localStorage.setItem("token", data.token);
        localStorage.setItem("userInfo", JSON.stringify(data.payload));
        setUser(data.payload);
        setShowLogin(false);
        // window.location.reload();
        // toast.success(`Hey ${data?.payload.name || null }, Welcome !`, {
        //   style: {
        //     backgroundColor: "rgba(255, 255, 255, 0.1)",
        //     backdropFilter: "blur(16px)",            
        //     WebkitBackdropFilter: "blur(16px)",   
        //     border:"0" ,     
        //     color:"black"
        //   },
        //   position:'top-center'
        // });
      } else {
        alert("login failed please try after some time")
      }
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  const handleError = () => {
    setShowLogin(false);
    toast.error("Google login failed!", {
      style: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(16px)",            
        WebkitBackdropFilter: "blur(16px)",   
        border:"0" ,     
        color:"white"
      },
      action: {
        label: "Login",
        onClick: () => {
          window.location.href = "/";
        },
      },
      actionButtonStyle:{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(16px)",            
        WebkitBackdropFilter: "blur(16px)",   
        border:"0" ,     
        color:"black"
      },
      position:'top-center'
    });
  };

  const handleLogout = async () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    setUser(null)

    toast.success(`Logged out Successfully!`, {
      style: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(16px)",            
        WebkitBackdropFilter: "blur(16px)",   
        border:"0" ,     
        color:"black"
      },
      position:'top-center'
    });
    window.location.href = "/";
  };

  return (
    <div>
        <Avatar onClick={() => setShow(!show)} className='cursor-pointer bg-[#F5E6D3]'>
           <AvatarImage src={user?.picture} alt="user profile picture"/>
           <AvatarFallback className='bg-[#F5E6D3]'><CircleUserRound className='bg-[#F5E6D3]'/></AvatarFallback>
        </Avatar>
        { 
          show && ReactDOM.createPortal(
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='absolute bg-[#F5E6D3]/20 backdrop-blur-sm text-[#4B2E2A] h-40 mt-2 w-65 right-2 top-13 z-10 rounded-lg shadow-lg p-4 overflow-hidden'
            >
              <div className='flex items-center gap-2'>
                <div>
                  <Avatar>
                    <AvatarImage src={user?.picture} alt="user profile picture"/>
                    <AvatarFallback><CircleUserRound /></AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h2 className='text-sm font-semibold overflow-hidden'>{user?.name || "name"}</h2>
                  <p className='text-xs text-gray-500'>{user?.email || "mail@gmail.com"}</p>
                </div>
              </div>
              <Separator className='my-2' />
              <Link to="/myaccount" onClick={() => setShow(false)}>
              <div className='flex flex-col gap-2'>
                <span className='flex gap-2 text-sm items-center px-2'><UserCog width={20}/>Manage Account</span>
              </div>
              </Link>
              <Separator className='my-2' />
              {!user?  (<button className='px-4 py-1 rounded-lg bg-purple-300/30 hover:bg-[#fcc47b] flex gap-2 mx-auto' onClick={() => {setShowLogin(!showLogin)}}><LogIn width={15}/>login</button >) 
              : (<button className='px-4 py-1 rounded-lg bg-red-400/30 hover:bg-[#fcc47b] flex gap-2 mx-auto' onClick={handleLogout}><LogOut width={15}/>logout</button >)

              }
            </motion.div>,
        document.body
          )
        }
        {
          showLogin && ReactDOM.createPortal(
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='z-10 bg-[#F5E6D3]/20 backdrop-blur-sm text-[#4B2E2A] fixed h-screen w-screen left-0 top-0 flex flex-col items-center justify-center '
            >
              <Card className='w-[80vw] lg:w-[35vw] h-[30vh] p-4 flex flex-col items-center gap-4 bg-[#F5E6D3]/50 backdrop-blur-lg text-[#4B2E2A] justify-center'>
                <div className='text-xl font-bold'>Log In</div>
                <button className='px-4 py-2 rounded-xl  mx-auto'><GoogleLogin onSuccess={handleSuccess} onError={handleError} /></button>
              </Card>
              <button onClick={() => setShowLogin(false)} className='p-2 mt-4 rounded-full bg-[#4B2E2A]'>
                <X color='#F5E6D3'/>
              </button>
            </motion.div>, document.body
          )
        }
    </div>
  )
}

export default UserManager