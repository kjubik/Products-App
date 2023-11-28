import ProductsList from 'src/components/products/ProductList';
import { useState, useEffect } from 'react';
import { Product } from 'src/types';
import { getProducts } from 'src/api/productsApi';
import CreatePostButton from 'src/components/products/CreatePostButton';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProductsFromFirestore = async () => {
      const productsFromFirestore = await getProducts();
      setProducts(productsFromFirestore);
      setIsLoading(false);
    };

    getProductsFromFirestore();
  }, []);

  return (
    <>
      {isLoading ? (
        <>Loading products...</>
      ) : (
        <div className='flex justify-center items-center w-screen'>
          <ProductsList products={products} />
        </div>
      )}
      <div className='fixed bottom-8 right-12 items-baseline'>
        <CreatePostButton />
      </div>
    </>
  );
};

export default ProductsPage;
