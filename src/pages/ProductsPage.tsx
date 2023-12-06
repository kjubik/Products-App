import ProductsList from 'src/components/products/ProductList';
import { useState, useEffect } from 'react';
import { Product } from 'src/types';
import { getProductsWithLimit } from 'src/api/productsApi';
import CreatePostButton from 'src/components/products/CreatePostButton';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProductsFromFirestore = async () => {
      const productsFromFirestore = await getProductsWithLimit(6);
      setProducts(productsFromFirestore);
      setIsLoading(false);
    };

    getProductsFromFirestore();
  }, [products]);

  const handleRefresh = async () => {
    setProducts(products.filter(product => product.isDeleted == false));
  }

  return (
    <>
      {isLoading ? (
        <>Loading products...</>
      ) : (
        <div className='flex justify-center items-center w-screen'>
          <ProductsList products={products} onRefresh={handleRefresh} />
        </div>
      )}
      <div className='fixed bottom-8 right-12 items-baseline'>
        <CreatePostButton />
      </div>
    </>
  );
};

export default ProductsPage;
