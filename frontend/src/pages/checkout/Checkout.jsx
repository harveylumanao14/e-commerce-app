
import axios from 'axios'
import '../../styles/Checkout/index.css'
import '../../styles/Checkout/header.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import OrderSummary from './OrderSummary'
import PaymentSummary from './PaymentSummary'

const Checkout = ({ cart, getTotalCartItem, fetchCart }) => {
  const countCartItem = getTotalCartItem()
  const [deliveryOptions, setDeliveryOptions] = useState([])
  const [paymentSummary, setPaymentSummary] = useState(null)

  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        const [deliveryOptionResponse, PaymentSummaryResponse] = await Promise.all([
          axios.get('/api/delivery-options?expand=estimatedDeliveryTime'),
          axios.get('/api/payment-summary')
        ])

        setDeliveryOptions(deliveryOptionResponse.data)
        setPaymentSummary(PaymentSummaryResponse.data)
      } catch (error) {
        console.error('Failed to load checkout data.', error)
      }
    }
    fetchCheckout();
  }, [cart])

  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<Link className="return-to-home-link"
              to="/">{countCartItem} items</Link>)
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary deliveryOptions={deliveryOptions} cart={cart} fetchCart={fetchCart} />
          <PaymentSummary paymentSummary={paymentSummary} getTotalCartItem={getTotalCartItem} />
        </div>
      </div>
    </>
  )
}

export default Checkout