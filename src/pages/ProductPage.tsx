import { useParams } from "react-router-dom";
import ProductsCard from "src/components/products/ProductCard";
import { useEffect, useState } from "react";
import { getProduct } from "src/firebase/services/productsServices";
import { Product } from "src/firebase/types";
import { isUserAdmin } from "src/firebase/services/usersServices";
import { getAuth } from "firebase/auth";


const ProductPage = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [hasAdmin, setHasAdmin] = useState<boolean>(false);

    const auth = getAuth();

    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) return;
            const fetchedData = await getProduct(productId);
            setProduct(fetchedData);
        };
        const checkIfUserIsAdmin = async () => {
            if (!productId) return;
            const auth = getAuth();
            if (!auth.currentUser) return;
            const fetchedData = await isUserAdmin(auth.currentUser.uid);
            setHasAdmin(fetchedData);
        }

        fetchProduct();
        checkIfUserIsAdmin();
    });

    return (
        <>
            {product && <ProductsCard product={product} userIsAdmin={hasAdmin} viewerId={auth.currentUser?.uid} />}
        </>
    );
};

export default ProductPage;
