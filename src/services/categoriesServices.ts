import { db } from "src/App";
import { addDoc, getDocs, collection, orderBy, query } from "firebase/firestore";
import { Category } from "src/firebase/types";

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
  const categoriesRef = collection(db, 'categories');
  
  try {
    const q = await query(categoriesRef ,orderBy('name', 'asc'));
    const querySnapshot = await getDocs(q);
    const categories: Category[] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Category);
    return categories;
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
}

  // const productCategories = [
  //   "electronics",
  //   "apparel",
  //   "home decor",
  //   "personal care",
  //   "fitness",
  //   "food and cooking",
  //   "travel",
  //   "books",
  //   "toys and games",
  //   "sports",
  //   "automotive",
  //   "pets",
  //   "art and craft supplies",
  //   "health",
  //   "parenting and kids",
  //   "gardening",
  //   "collectibles",
  //   "education",
  //   "sustainable living",
  //   "office supplies",
  //   "outdoor",
  //   "jewelry",
  //   "tools",
  //   "industrial",
  //   "handmade",
  //   "other",
  // ];

