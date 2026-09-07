import Product from "./Product"

const ProductGrid = ({ products, fetchCart }) => {
   
    return (
        <div className="products-grid">
            {products.map((product) => (
                <Product key={product.id} product={product} fetchCart={fetchCart} />
            ))}


        </div>
    )
}

export default ProductGrid