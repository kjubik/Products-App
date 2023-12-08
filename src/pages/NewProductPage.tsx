import PublishProductForm from "src/components/products/PublishProductForm";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { Product } from "src/firebase/types";
import { serverTimestamp } from "firebase/firestore";


const NewProductPage = () => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    const [newProduct, setNewProduct] = useState<Product>({
        categories: [],
        comments: [],
        creationDate: serverTimestamp(),
        creatorUserId: userId ? userId : '',
        creatorUsername: '',
        description: '',
        imageUrl: '',
        isDeleted: false,
        title: '',
    });

    return (
        <>
            <PublishProductForm 
                productData={newProduct} 
                setProductData={setNewProduct}  
                buttonText='Publish'
                isNewProduct={true}
            />
        </>
    );
}

export default NewProductPage;
