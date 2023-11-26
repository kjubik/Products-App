import ProductsList from 'src/components/products/ProductList';
import { useState, useEffect } from 'react';
import { Product } from 'src/types';
import { getProducts } from 'src/api/productsApi';

const ProductsPage = () => {
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
      <h2>Products Page</h2>
      <ProductsList products={products} />
    </>
  );
};

export default ProductsPage;
