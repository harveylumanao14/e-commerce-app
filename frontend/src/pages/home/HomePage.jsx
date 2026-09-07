import '../../styles/HomePage/index.css'
import Navbar from '../../components/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductGrid from './ProductGrid'

const HomePage = ({ getTotalCartItem, fetchCart }) => {
    const [products, setProducts] = useState([])
    const totalCartItem = getTotalCartItem()
    
    useEffect(() => {
        const fetchProducts = async () => {
            /* USING FETCH REACT */
            // const response = await fetch(`${API_URL}/api/products`)
            // const json = await response.json()
            // if(response.ok){
            //     console.log(json)
            // }

            /* USING AXIOS */
            const response = await axios.get('/api/products')
            if (response.status === 200) { //Status Code 200 = Retrieved
                setProducts(response.data)
            }
        }

        // const fetchCarts = async () => {
        //     const response = await axios.get('/api/cart-items')
        //     if (response.status === 200) {
        //         setCarts(response.data)
        //     }
        // }

        fetchProducts()
        //fetchCarts()
    }, [])


    return (
        <>
            <Navbar getTotalCartItem={totalCartItem} />

            <div className="home-page">
               <ProductGrid products={products} fetchCart={fetchCart} />
            </div>
        </>
    )
}

export default HomePage