import PublishProductForm from "src/components/products/PublishProductForm";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { Product, Comment } from "src/types";
import { serverTimestamp } from "firebase/firestore";

const NewProductPage = () => {

    const auth = getAuth();


    const [newProduct, setNewProduct] = useState<Product>({
        isDeleted: false,
        creatorUserId: auth.currentUser?.uid,
        creatorUsername: '',
        comments: [] as Comment[],
        creationDate: serverTimestamp(),
        categories: [] as string[],
        description: '',
    } as Product);

    return(
    <>
        <PublishProductForm 
            productData={newProduct} 
            setProductData={setNewProduct}  
            buttonText='Publish'
        />
    </>
    )
}

export default NewProductPage;
