import ProductsList from 'src/components/products/ProductsList';
import { useState, useEffect } from 'react';
import { Product } from 'src/types';
import { getProductsWithLimit } from 'src/services/productsServices';
import CreatePostButton from 'src/components/products/CreatePostButton';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProductsFromFirestore = async () => {
      const productsFromFirestore = await getProductsWithLimit(100);
      setProducts(productsFromFirestore);
      setIsLoading(false);
    };

    getProductsFromFirestore();
  }, []);

  const handleDelete = async (deletedProductId: string | undefined) => {
    setProducts(products.filter(product => product.id !== deletedProductId));
  }

  return (
    <>
      {isLoading ? (
        <>Loading products...</>
      ) : (
        <div className='flex justify-center items-center w-screen'>
          <ProductsList products={products} onDelete={handleDelete} />
        </div>
      )}
      <div className='fixed bottom-8 right-12 items-baseline'>
        <CreatePostButton />
      </div>
    </>
  );
};

export default ProductsPage;
