import { db } from "src/App";
import { addDoc, getDocs, collection } from "firebase/firestore";
import { Category } from "src/firebase/types/Category";


export const postCategory = async (name: string) => {
    const categoryRef = collection(db, 'categories');

    try {
        await addDoc(categoryRef, { name: name });
        console.log('Category document created successfully!');
    } catch (error) {
        console.error('Error creating category document:', error);
    }
};


export const getCategories = async (): Promise<Category[]> => {
  try {
    const categoriesRef = collection(db, 'categories');
    const querySnapshot = await getDocs(categoriesRef);
    const categories: Category[] = querySnapshot.docs.map((doc) => ({ value: doc.id, ...doc.data() }) as Category);
    console.log('Categories fetched successfully!', categories)
    return categories;
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
}

  // const productCategories = [
  //   "electronics",
  //   "toys and games",
  //   "health and beauty",
  //   "fashion",
  //   "sports and fitness",
  //   "travel",
  //   "office supplies",
  //   "outdoor",
  //   "other",
  // ];

