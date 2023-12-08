import PublishProductForm from "src/components/products/PublishProductForm";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { Product } from "src/firebase/types";
import { serverTimestamp } from "firebase/firestore";


const NewProductPage = () => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    const [newProduct, setNewProduct] = useState<Product>({
        isDeleted: false,
        creatorUserId: userId ? userId : '',
        creatorUsername: '',
        comments: undefined,
        creationDate: serverTimestamp(),
        description: '',
        title: '',
        imageUrl: '',
        categories: []
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
