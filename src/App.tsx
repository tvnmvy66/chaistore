import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Herosection from './components/Herosection.tsx';
import Shop from "./components/Shop.tsx";
import CheckoutPage from "./components/CheckoutPage.tsx";
import Orders from "./components/Orders.tsx";
import MyAccount from "./components/MyAccount.tsx"

function App() {

  return (
    <>
      <BrowserRouter>
      <main className='bg-[#F5E6D3] text-[#4B2E2A]'>
        <Navbar />
          <Routes>
            <Route path="/" element={<Herosection />} />
            <Route path="/shop" element={<div className="mt-10"><Shop /></div>} />
            <Route path="/myaccount" element={<MyAccount/>} />
            <Route path="/orders" element={<Orders/>} />
            <Route path="/checkout" element={<CheckoutPage/>} />
          </Routes>
        <Footer/>
      </main>
      </BrowserRouter>
    </>
  )
}

export default App
