import { db } from "src/App";
import { addDoc, collection } from "firebase/firestore";

export const createCategory = async (name: string) => {
    const categoryRef = collection(db, 'categories');

    try {
        await addDoc(categoryRef, { name: name });
        console.log('Category document created successfully!');
    } catch (error) {
        console.error('Error creating category document:', error);
    }
};

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

