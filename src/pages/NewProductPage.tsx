import PublishProductForm from "src/components/products/PublishProductForm";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { Product } from "src/types/Product";
import { serverTimestamp } from "firebase/firestore";
import { getUser } from "src/firebase/services/users";


const NewProductPage = () => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    const [newProduct, setNewProduct] = useState<Product>({
        categories: [],
        creationDate: serverTimestamp(),
        creatorUserId: userId ? userId : '',
        creatorUsername: '',
        creatorDisplayName: '',
        description: '',
        imageUrl: '',
        isDeleted: false,
        title: '',
    });

    useEffect(() => {
        const getUsernameOfCurrentUser = async () => {
            if (!userId) return;
            const userData = await getUser(userId);
            setNewProduct({
                ...newProduct,
                creatorUsername: userData.username,
                creatorDisplayName: userData.displayName,
            })
        }

        getUsernameOfCurrentUser();
    }, []);

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
