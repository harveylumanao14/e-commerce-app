import '../../styles/Orders/index.css'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import { useEffect, useState} from 'react'
import { formatMoneyToCents } from '../../utils/format'
import dayjs from 'dayjs'
import ProductGrid from './ProductGrid'


const Orders = ({ cart, getTotalCartItem }) => {
    const totalCartItem = getTotalCartItem()
    const [orders, setOrders] = useState([])
    //const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get('/api/orders?expand=products')
            if (response.status === 200)
                setOrders(response.data)
        }
        fetchOrders()

    }, [])

    return (
        <>
            <Navbar cart={cart} getTotalCartItem={totalCartItem} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <div className="orders-grid">
                    {orders.map((order) => {
                        return (

                            <div key={order.id} className="order-container">
                                <div className="order-header">
                                    <div className="order-header-left-section">
                                        <div className="order-date">
                                            <div className="order-header-label">Order Placed:</div>
                                            <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
                                        </div>
                                        <div className="order-total">
                                            <div className="order-header-label">Total:</div>
                                            <div>{formatMoneyToCents(order.totalCostCents)}</div>
                                        </div>
                                    </div>

                                    <div className="order-header-right-section">
                                        <div className="order-header-label">Order ID:</div>
                                        <div>{order.id}</div>
                                    </div>
                                </div>

                                <ProductGrid order={order} />

                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}

export default Orders