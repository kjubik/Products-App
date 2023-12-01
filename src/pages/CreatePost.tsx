import { useState, useEffect } from "react";
import Select, { MultiValue } from "react-select";
import { auth } from "src/App";
import { getCategoriesAsOptions } from "src/api/categoriesApi";
import { postProduct } from "src/api/productsApi";
import { getUsername } from "src/api/usersApi";
import { OptionType, Product } from "src/types";
import { Timestamp } from "firebase/firestore";
import { Comment } from "src/types";

const CreatePost = () => {

    const [newProduct, setNewProduct] = useState<Product>({
        isDeleted: false,
        creatorUserId: auth.currentUser?.uid,
        creatorUsername: '',
        comments: [] as Comment[],
    } as Product);

    const [descriptionLength, setDescriptionLength] = useState(0);
    const [categories, setCategories] = useState<OptionType[]>([]);

    useEffect(() => {
        const fetchCategoriesFromFirestore = async () => {
            const categoriesFromFirestore = await getCategoriesAsOptions();
            setCategories(categoriesFromFirestore);
        }
        const fetchUsernameFromFirestore = async () => {
            if (!auth.currentUser?.uid) return;
            const username = await getUsername(auth.currentUser?.uid);
            setNewProduct({
                ...newProduct,
                creatorUsername: username
            })
        }

        fetchCategoriesFromFirestore();
        fetchUsernameFromFirestore();
    },);

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

    const handleMultiSelectChange = (selectedOptions: MultiValue<OptionType>) => {
        setNewProduct({
            ...newProduct,
            categories: selectedOptions.map(option => option.value)
        })
    }

    const handlePublishPost = async () => {
        if (!newProduct.imageUrl || !newProduct.title || !newProduct.description || !newProduct.categories) {
            alert("Please fill out all fields");
            return;
        }

        console.log(newProduct);
        const creationDate = new Date();
        setNewProduct({
            ...newProduct,
            creationDate: Timestamp.fromDate(creationDate)
        })

        await postProduct(newProduct);
    }

    return (
        <>
            <div className='p-4 mx-auto flex flex-col gap-4 max-w-sm rounded'>
                <input name="imageUrl" onChange={handleInputChange} type="url" placeholder="Paste image URL"
                className="rounded px-3 py-2 outline outline-1 outline-slate-200
                focus:outline-2 focus:outline-blue-400"/>
                <input name="title" onChange={handleInputChange} type="text" placeholder="Product title"
                className="focus:outline-none bg-inherit text-2xl font-semibold"/>
                <div className="flex flex-col gap-1">
                    <textarea name="description" onInput={handleDescriptionInput} placeholder="Write a description" maxLength={200}
                    className="rounded px-3 py-2 outline outline-1 outline-slate-200
                    pb-20 resize-none focus:outline-2 focus:outline-blue-400"/>
                    <div className="min-w-full text-right text-sm text-slate-400">{descriptionLength}/200 characters</div>
                </div>
                <Select
                    options={categories}
                    isMulti
                    name="categories"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleMultiSelectChange}
                />
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
