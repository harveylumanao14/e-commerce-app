import { Routes, Route } from 'react-router-dom'
import HomePage from "./pages/home/HomePage"
import Checkout from './pages/checkout/Checkout'
import Orders from './pages/orders/Orders'
import Tracking from './pages/Tracking'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [cart, setCart] = useState([])

  const fetchCart = async () => {
    const response = await axios.get('/api/cart-items?expand=product')
    if (response.status === 200)
      setCart(response.data)
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const getTotalCartItem = () => {
    return cart.length;
  }

  return (
    <>
      <Routes>
        <Route index element={<HomePage getTotalCartItem={getTotalCartItem} fetchCart={fetchCart} />} />
        <Route path='/checkout' element={<Checkout cart={cart} getTotalCartItem={getTotalCartItem} fetchCart={fetchCart} />} />
        <Route path='/orders' element={<Orders cart={cart} getTotalCartItem={getTotalCartItem} />} />
        <Route path='/tracking/:orderId/:productId' element={<Tracking getTotalCartItem={getTotalCartItem} />} />
      </Routes>

    </>
  )
}

export default App
