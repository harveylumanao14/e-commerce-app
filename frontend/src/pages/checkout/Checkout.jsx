
import axios from 'axios'
import '../../styles/Checkout/index.css'
import '../../styles/Checkout/header.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import OrderSummary from './OrderSummary'
import PaymentSummary from './PaymentSummary'

const Checkout = ({ cart, getTotalCartItem }) => {
  const countCartItem = getTotalCartItem()
  const [deliveryOptions, setDeliveryOptions] = useState([])
  const [paymentSummary, setPaymentSummary] = useState(null)

  useEffect(() => {
    const fetchDeliveryOptions = async () => {
      const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      if (response.status === 200)
        setDeliveryOptions(response.data)
    }

    const fetchPaymentSummary = async () => {
      const response = await axios.get('/api/payment-summary')
      if (response.status === 200)
        setPaymentSummary(response.data)
    }

    fetchDeliveryOptions()
    fetchPaymentSummary()
  }, [])

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
          <OrderSummary deliveryOptions={deliveryOptions} cart={cart} />
          <PaymentSummary paymentSummary={paymentSummary}/>
        </div>
      </div>
    </>
  )
}

export default Checkout