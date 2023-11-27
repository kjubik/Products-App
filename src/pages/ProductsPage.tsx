import ProductsList from 'src/components/products/ProductList';
import { useState, useEffect } from 'react';
import { Product } from 'src/types';
import { getProducts } from 'src/api/productsApi';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProductsFromFirestore = async () => {
        const productsFromFirestore = await getProducts();
        setProducts(productsFromFirestore);
        setIsLoading(false);
    }

    getProductsFromFirestore();
}, []);

  return (
    <>
      <h2>Products Page</h2>
      {isLoading ? <>Loading products...</> : <ProductsList products={products}/>}
    </>
  );
};

export default ProductsPage;
