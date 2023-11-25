import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "src/api/productsApi";
import { Product } from "src/types";

const ProductsList = () => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const getProductsFromFirestore = async () => {
            const productsFromFirestore = await getProducts();
            setProducts(productsFromFirestore);
        }

        getProductsFromFirestore();
    }, []);

    return (
    <>
        <h3>Products List</h3>
        <ul>
            {products.map((product) => {
                return (
                    <li key={product.id} className="py-4">
                        <ProductCard product={product} />
                    </li>
                )
            })}
        </ul>
    </>
    );
  };
  
  export default ProductsList;
  