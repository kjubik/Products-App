import ProductsList from 'src/components/products/ProductsList';
import { useState, useEffect } from 'react';
import { Product } from 'src/firebase/types/Product';
import { getProductsByCategory, getProductsWithLimit } from 'src/firebase/services/products';
import { useNavigate } from 'react-router-dom';
import { Category } from 'src/firebase/types/Category';
import { getCategories } from 'src/firebase/services/categories';
import { SelectValue } from 'react-tailwindcss-select/dist/components/type';
import Select from 'react-tailwindcss-select';


const ProductsPage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [options, setOptions] = useState<Category[]>([]);
  const [filtersUpdated, setFiltersUpdated] = useState<boolean | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<SelectValue>([]);

  useEffect(() => {
    const loadPageData = async () => {
      const productDocuments = await getProductsWithLimit(3);
      setProducts(productDocuments);
      
      let categoryDocuments = await getCategories();
      // categoryDocuments = categoryDocuments.sort((a, b) => a.value.localeCompare(b.value));
      setOptions(categoryDocuments); 
      console.log('options:', options);
      
      setIsLoading(false);
      if (filtersUpdated == null) setFiltersUpdated(false);
    };

    loadPageData();
  }, []);

  useEffect(() => {
    if (filtersUpdated == null) return;
    console.log('filters have been updated!');
    setFiltersUpdated(true);
  }, [selectedOptions])

  const handleDelete = async (deletedProductId: string | undefined) => {
    setProducts(products.filter(product => product.id !== deletedProductId));
  }

  const handleApplyFilters = async () => {

    if (selectedOptions == null) {
      const productDocuments = await getProductsWithLimit(3);
      setProducts(productDocuments);
    } else if (Array.isArray(selectedOptions)) {
      const selectedCategories: string[] = selectedOptions.map(option => option.value);
      const productDocuments = await getProductsByCategory(selectedCategories);
      setProducts(productDocuments);
    } else {
      const productDocuments = await getProductsByCategory([selectedOptions.value]);
      setProducts(productDocuments);
    }

    setFiltersUpdated(false);
  }

  return (
    <>
      {isLoading ? (
        <>Loading products & categories...</>
      ) : (
        <div className='flex flex-col justify-center items-center w-screen'>
          <span className='flex w-full'>
            <Select 
              value={selectedOptions}
              onChange={setSelectedOptions}
              options={options}
              isMultiple={true}
              primaryColor={'blue'}
              placeholder='Filter by category'
              isClearable={true}
            />
          </span>
          {filtersUpdated && (
            <button onClick={handleApplyFilters}>Apply filters</button>
          )}
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
        <button onClick={() => navigate("/new-product")}
          className="rounded-full bg-blue-500 text-white font-semibold 
          px-4 py-1 flex items-center justify-around text-lg
          shadow-md hover:bg-blue-700">
              Post product
          </button>
      </div>
    </>
  );
};

export default ProductsPage;
