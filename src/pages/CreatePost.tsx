import { useState, useEffect } from "react";
import { auth } from "src/App";
import { postProduct } from "src/api/productsApi";
import { getUsername } from "src/api/usersApi";
import { Category, Product } from "src/types";
import { Timestamp, serverTimestamp  } from "firebase/firestore";
import { Comment } from "src/types";
import { getCategories } from "src/api/categoriesApi";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {

    const navigate = useNavigate();

    const [newProduct, setNewProduct] = useState<Product>({
        isDeleted: false,
        creatorUserId: auth.currentUser?.uid,
        creatorUsername: '',
        comments: [] as Comment[],
        creationDate: serverTimestamp(),
        categories: [] as string[],
    } as Product);

    const [descriptionLength, setDescriptionLength] = useState(0);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchUsernameFromFirestore = async () => {
            if (!auth.currentUser?.uid) return;
            const username = await getUsername(auth.currentUser?.uid);
            setNewProduct({
                ...newProduct,
                creatorUsername: username
            })
        }
        const fetchCategoriesFromFirestore = async () => {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories);
        }

        fetchUsernameFromFirestore();
        fetchCategoriesFromFirestore();
    }, []);

    const handleDescriptionInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionLength(e.target.value.length);
        setNewProduct({
            ...newProduct,
            description: e.target.value
        })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value
        })
    }

    const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        if (!newProduct.categories) {
            setNewProduct({
                ...newProduct,
                categories: [value]
            })
        } else {
            setNewProduct({
                ...newProduct,
                categories: [...newProduct.categories, value]
            })
        }
    }

    const validateProductPost = () => {
        return true;
    }

    const handlePublishPost = async () => {
        if (!validateProductPost()) {
            alert('Please fill all the fields');
            return;
        }
            
        console.log(newProduct);
        const creationDate = new Date();
        const timestamp = Timestamp.fromDate(creationDate);
        const updatedProduct = {
            ...newProduct,
            creationDate: timestamp
        };

        await postProduct(updatedProduct);
        navigate('/products');   
    }

    return (
        <>
            <div className='p-4 mx-auto flex flex-col gap-4 max-w-sm rounded'>
                <input name="imageUrl" type="url"
                onChange={handleInputChange} placeholder="Paste image URL"
                className="rounded px-3 py-2 outline outline-1 outline-slate-200
                focus:outline-2 focus:outline-blue-400"/>

                <input name="title" 
                onChange={handleInputChange} type="text" placeholder="Product title"
                className="focus:outline-none bg-inherit text-2xl font-semibold"/>

                <div className="flex flex-col gap-1">
                    <textarea name="description"
                    onInput={handleDescriptionInput} placeholder="Write a description" maxLength={200}
                    className="rounded px-3 py-2 outline outline-1 outline-slate-200
                    pb-20 resize-none focus:outline-2 focus:outline-blue-400"/>

                    <div className="w-full text-right text-sm text-slate-400">{descriptionLength}/200 characters</div>
                </div>

                <select name="categories" id="categories" placeholder="Select a category" multiple
                onChange={handleSelectCategory}>
                    {categories.map((category, index) => (
                        <option key={index} value={category.name}>{category.name}</option>
                    ))}
                </select>
                
                <button onClick={handlePublishPost} 
                className="rounded-full bg-blue-500 text-white font-semibold 
                px-4 py-1 flex items-center justify-around text-lg
                shadow-md shadow-blue-200 hover:bg-blue-700 mt-4">
                    Publish
                </button>
            </div>
        </>
    );
};

export default CreatePost;
