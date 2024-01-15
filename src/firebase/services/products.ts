import { doc, getDoc, getDocs, setDoc, addDoc, collection, query, orderBy, where, limit, startAfter, Timestamp, FieldValue } from "firebase/firestore";
import { db } from "../../App";
import { Product } from "src/firebase/types/Product";


export const postProduct = async (product: Product): Promise<void> => {
    try {
        const productReference = collection(db, "products");
        await addDoc(productReference, product);
    } catch (error) {
        console.log('Failed to post product', error);
        throw error;
    }
}

export const getProduct = async (productId: string): Promise<Product> => {
    try {
        const queryResult = await getDoc(doc(db, "products", productId));
        return { id:productId, ...queryResult.data()} as Product;
    } catch (error) {
        console.log('Failed to get product', error);
        throw error;
    }
}

export const getProducts = async (): Promise<Product[]> => {
    try {
        const productsReference = collection(db, "products");
        const q = query(productsReference, orderBy("creationDate", "desc"), where("isDeleted", "==", false));
        const querySnapshot = await getDocs(q);
        const products: Product[] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Product);
        console.log('Get products successful');
        return products;
    } catch (error) {
        console.log('Failed to get products', error);
        throw error;
    }
}

export const getProductsWithLimit = async (docLimit: number): Promise<Product[]> => {
    try {
        const productsReference = collection(db, "products");
        const q = query(productsReference, orderBy("creationDate", "desc"), where("isDeleted", "==", false), limit(docLimit));
        const querySnapshot = await getDocs(q);
        const products: Product[] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Product);
        console.log('Get products with limit successful');
        return products;
    } catch (error) {
        console.log('Failed to get products with limit of', docLimit, 'entries', error);
        throw error;
    }
}

export const getNextProductsWithLimit = async (docLimit: number, lastVisibleDoc: Timestamp | FieldValue): Promise<Product[]> => {
    try {
        const productsReference = collection(db, "products");
        const q = query(productsReference, orderBy("creationDate", "desc"), where("isDeleted", "==", false), startAfter(lastVisibleDoc), limit(docLimit));
        const querySnapshot = await getDocs(q);
        const products: Product[] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Product);
        console.log('Get next products with limit successful');
        return products;
    } catch (error) {
        console.log('Failed to get next products with limit of', docLimit, 'entries', error);
        throw error;
    }
}

export const getProductsByCategory = async (selectedCategories: string[]): Promise<Product[]> => {
    try {
        const productsReference = collection(db, "products");
        const q = query(productsReference, orderBy("creationDate", "desc"), where("isDeleted", "==", false), where("categories", "array-contains-any", selectedCategories));
        const querySnapshot = await getDocs(q);

        const matchingProducts: Product[] = [];

        querySnapshot.docs.forEach(doc => {
            const productData = doc.data();
            const productCategories = productData.categories;
            if (selectedCategories.every(category => productCategories.includes(category))) {
                matchingProducts.push({ id: doc.id, ...doc.data() } as Product);
            }
        });
        
        return matchingProducts;
    } catch (error) {
        console.log('Failed to get products by category', error);
        throw error;
    }
}

export const putProduct = async (product: Product): Promise<void> => {
    try {
        if (!product.id) throw new Error('Product id is missing');
        const productReference = doc(db, "products", product.id);
        await setDoc(productReference, product, { merge: true });
    } catch (error) {
        console.log('Failed to put product', error);
        throw error;
    }

}

export const deleteProduct = async (productId: string): Promise<void> => {
    try {
        const productReference = doc(db, "products", productId);
        await setDoc(productReference, { isDeleted: true }, { merge: true });
        console.log('Product deleted successfully')
    } catch (error) {
        console.log('Failed to delete product', error);
        throw error;
    }
}

export const getProductsBySearch = async (searchTerm: string): Promise<Product[]> => {
    try {
        const productsReference = collection(db, "products");
        const q = query(productsReference, orderBy("title"), where("isDeleted", "==", false), where("title", ">=", searchTerm), where("title", "<=", searchTerm + "\uf8ff"));
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Product);
        return products;
    } catch (error) {
        console.log('Failed to get products by search', error);
        throw error;
    }
}
