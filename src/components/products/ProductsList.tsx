import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "src/types/Product";
import { auth } from "src/App";
import { getUser } from "src/firebase/services/users";


interface ProductListProps {
    products: Product[];
    onDelete: (deletedProductId: string | undefined) => void;
}

const ProductsList = (props: ProductListProps) => {

    const [userIsAdmin, setUserIsAdmin] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!auth.currentUser) return;
            const data = await getUser(auth.currentUser.uid);
            setUserIsAdmin(data.isAdmin);
        }
        
        fetchUserData();
    }, []);


    return (
    <>
        <ul className="column-1 gap-4">
            {props.products.map((product) => {
                return (
                    <li key={product.id} 
                        className="py-4">
                        <ProductCard 
                            product={product} 
                            userIsAdmin={userIsAdmin} 
                            viewerId={auth.currentUser?.uid} 
                            onDelete={() => props.onDelete(product.id)}
                        />
                    </li>
                )
            })}
        </ul>
    </>
    );
  };
  
export default ProductsList;
