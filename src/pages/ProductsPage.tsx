import ProductsList from 'src/components/products/ProductsList';
import { useState, useEffect } from 'react';
import { Product } from 'src/firebase/types/Product';
import { getProductsWithLimit } from 'src/firebase/services/products';
import CreatePostButton from 'src/components/products/CreatePostButton';
import { useNavigate } from 'react-router-dom';


const ProductsPage = () => {
  const navigate = useNavigate();

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
          {products.length > 0 ? 
            <ProductsList products={products} onDelete={handleDelete} />
            : <p className='py-4 flex flex-col gap-2'>
                <span className='text-slate-400 font-semibold'>No products posted yet</span>
                <button 
                  onClick={() => navigate("/new-product")}
                  className='rounded-full bg-blue-500 text-white font-semibold 
                  px-4 py-1 flex items-center justify-around text-lg
                  shadow-md hover:bg-blue-700'>
                    Post the first one
                  </button>
              </p>
          }
        </div>
      )}
      <div className='fixed bottom-8 right-12 items-baseline'>
        <CreatePostButton />
      </div>
    </>
  );
};

export default ProductsPage;
