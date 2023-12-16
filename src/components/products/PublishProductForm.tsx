import { useState, useEffect } from "react";
import { postProduct, putProduct } from "src/firebase/services/products";
import { Category, Product } from "src/firebase/types";
import { getCategories } from "src/firebase/services/categories";
import { useNavigate } from "react-router-dom";


interface Props {
    productData: Product;
    setProductData: React.Dispatch<React.SetStateAction<Product>>;
    isNewProduct: boolean;
    buttonText: string;
}

const PublishProductForm = ({ productData, setProductData, isNewProduct, buttonText }: Props) => {

    const [descriptionLength, setDescriptionLength] = useState(productData.description.length);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategoriesFromFirestore = async () => {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories);
        }

        fetchCategoriesFromFirestore();
    }, []);

    const navigate = useNavigate();

    const handleDescriptionInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionLength(e.target.value.length);
        setProductData({
            ...productData,
            description: e.target.value
        })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value
        })
    }

    const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        if (productData.categories) {
            setProductData({
                ...productData,
                categories: [...productData.categories, value]
            })
        } else {
            setProductData({
                ...productData,
                categories: [value]
            })
        }
    }

    const handlePublishPost = async () => {
        console.log(productData);
        if (isNewProduct) {
            await postProduct(productData);
        } else {
            await putProduct(productData);
        }

        navigate('/products');
    }

    return (
        <>
            <div className='p-4 mx-auto flex flex-col gap-4 max-w-sm rounded'>
                <input name="imageUrl" type="url" value={productData.imageUrl}
                onChange={handleInputChange} placeholder="Paste image URL"
                className="rounded px-3 py-2 outline outline-1 outline-slate-200
                focus:outline-2 focus:outline-blue-400"/>

                <input name="title" 
                onChange={handleInputChange} type="text" placeholder="Enter product title" value={productData.title}
                className="focus:outline-none bg-inherit text-2xl font-semibold"/>

                <div className="flex flex-col gap-1">
                    <textarea name="description" value={productData.description}
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
                    {buttonText}
                </button>
            </div>
        </>
    );
};

export default PublishProductForm;
