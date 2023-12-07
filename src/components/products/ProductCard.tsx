import { Product } from "src/types";
import { deleteProduct } from "src/services/productsServices";
import CommentField from "../comments/CommentField";
import { useState } from "react";
import CommentsList from "../comments/CommentsList";
import { getComments } from "src/services/commentsServices";
import { Comment } from "src/types";


interface ProductCardProps {
    product: Product;
    userIsAdmin: boolean;
    viewerId: string | undefined;
    onDelete: () => void; // Callback function to update ProductList
}


const ProductsCard = (props: ProductCardProps) => {

    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);

    const handleDelete = async () => {
        if (!props.product.id) return;
        await deleteProduct(props.product.id);
        props.onDelete();
    }

    const handleShowComments = async () => {
        if (!props.product.id) return;
        setShowComments(true);
        const productComments = await getComments(props.product.id);
        setComments(productComments);
    }

    return (
        <>
            <div className="flex flex-col gap-4 max-w-sm p-4 rounded-lg bg-slate-50 
            outline outline-1 outline-slate-200">
                <div className="flex w-full justify-between gap-4 px-1">
                    <p className="">
                        {props.product.creatorUsername}
                    </p>
                    
                    <div className="flex gap-4 font-semibold"> 
                        {props.viewerId === props.product.creatorUserId && 
                            <a href={`/edit-product/${props.product.id}`}
                            className="text-slate-800/70 hover:text-slate-800">
                                Edit
                            </a>
                        }
                        {props.userIsAdmin &&
                            <button onClick={handleDelete}
                            className="text-red-500/70 hover:text-red-500">
                                Delete
                            </button>
                        }
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-1">
                    <h4 className="text-3xl font-bold text-slate-900 tracking-tight">
                        <a href={`/product/${props.product.id}`}>
                            {props.product.title}
                        </a>
                    </h4>
                    <p className="text-sm font-regular text-slate-400">
                        {props.product.description}
                    </p>
                </div>

                <img src={props.product.imageUrl} alt="product image" 
                className="max-w-sm rounded" />

                <p className="text-slate-400">
                    {props.product.creationDate.toDate().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>

                <CommentField />

                {showComments 
                ? <CommentsList productId={props.product.id} /> 
                : <button onClick={() => handleShowComments()}>Read comments</button>}
            </div>
        </>
    );
};

export default ProductsCard;
  