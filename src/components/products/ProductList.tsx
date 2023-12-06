import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "src/types";
import { auth } from "src/App";
import { getUser } from "src/services/usersServices";
import { deleteProduct } from "src/services/productsServices";


interface ProductListProps {
    products: Product[];
    onRefresh: () => void;
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
    }, [userIsAdmin]);

    const handleDelete = async (id: string | undefined) => {
        if (!id) {
            console.error("Product id is undefined");
            return;
        }
        await deleteProduct(id);
    };

    return (
    <>
        <ul className="grid grid-cols-3 gap-4">
            {props.products.map((product) => {
                return (
                    <li key={product.id} className="py-4">
                        <ProductCard 
                            product={product} 
                            userIsAdmin={userIsAdmin} 
                            viewerId={auth.currentUser?.uid} 
                            onDelete={() => handleDelete(product.id)}
                        />
                    </li>
                )
            })}
        </ul>
    </>
    );
  };
  
  export default ProductsList;
  