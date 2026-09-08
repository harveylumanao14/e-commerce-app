import axios from 'axios'
import { formatMoneyToCents } from '../../utils/format'
import { useNavigate } from 'react-router-dom'

const PaymentSummary = ({ paymentSummary, getTotalCartItem, fetchCart }) => {
    const navigate = useNavigate()
    const countCartItem = getTotalCartItem()
    const createOrder = async () => {
        await axios.post('/api/orders')
        await fetchCart()
        navigate('/orders')
    }
    return (
        <>
            {paymentSummary && (
                <>
                    <div className="payment-summary">
                        <div className="payment-summary-title">
                            Payment Summary
                        </div>

                        <div className="payment-summary-row">
                            <div>Items ({countCartItem}):</div>
                            <div className="payment-summary-money">{formatMoneyToCents(paymentSummary.productCostCents)}</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div className="payment-summary-money">{formatMoneyToCents(paymentSummary.shippingCostCents)}</div>
                        </div>

                        <div className="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div className="payment-summary-money">{formatMoneyToCents(paymentSummary.totalCostBeforeTaxCents)}</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div className="payment-summary-money">{formatMoneyToCents(paymentSummary.taxCents)}</div>
                        </div>

                        <div className="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div className="payment-summary-money">{formatMoneyToCents(paymentSummary.totalCostCents)}</div>
                        </div>

                        <button className="place-order-button button-primary"
                            onClick={createOrder}>
                            Place your order
                        </button>
                    </div>
                </>
            )}
        </>
    )
}

export default PaymentSummary