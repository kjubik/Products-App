import PublishProductForm from "src/components/products/PublishProductForm";
import { useState } from "react";
import { Product } from "src/firebase/types";
import { getProduct } from "src/firebase/services/productsServices";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


const EditProductPage = () => {
    
    const { productId } = useParams<{ productId: string }>();
    const [newProduct, setNewProduct] = useState<Product>({} as Product);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProductFromFirestore = async () => {
            if (!productId) return;
            const fetchedProduct = await getProduct(productId);
            setNewProduct(fetchedProduct);
            setIsLoading(false);
        }

        fetchProductFromFirestore();
    }, []);

    return(
    <>
        {!isLoading &&
        <PublishProductForm 
            productData={newProduct} 
            setProductData={setNewProduct}
            isNewProduct={false}  
            buttonText='Save changes'
        />
        }
    </>
    )
}

export default EditProductPage;
