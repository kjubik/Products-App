import { Product } from "src/firebase/types";
import { deleteProduct } from "src/firebase/services/products";
import CommentField from "../comments/CommentInputField";
import { useState } from "react";
import CommentsList from "../comments/CommentsList";
import { getComments, updateComment } from "src/firebase/services/comments";
import { ProductComment } from "src/firebase/types";
import { convertTimestampToDate } from "src/utils/convertTimestampToDate";


interface ProductCardProps {
    product: Product;
    userIsAdmin: boolean;
    viewerId: string | undefined;
    onDelete: () => void;
}


const ProductsCard = (props: ProductCardProps) => {

    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState<ProductComment[]>([]);

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

    const editComment = async (commentId: string, description: string) => {
        const commentToUpdate = comments.find(comment => comment.id === commentId);
        if (!commentToUpdate) return;

        commentToUpdate.description = description;
        await updateComment(commentToUpdate);
    }


    return (
        <>
            <div className="flex flex-col gap-4 max-w-sm p-4 rounded-lg bg-slate-50 
            outline outline-1 outline-slate-200">
                <div className="flex w-full items-start justify-between gap-4 px-1">
                    <p className="text-slate-900 font-semibold">
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
                    <p className="text-md font-regular text-slate-400">
                        {props.product.description}
                    </p>
                </div>

                <div className="flex flex-col gap-1">
                    <img src={props.product.imageUrl} alt="product image" 
                    className="max-w-sm rounded" />
                    <p className="text-slate-400 text-sm px-1">
                        {convertTimestampToDate(props.product.creationDate)}
                    </p>
                </div>

                {props.product.id && <CommentField productId={props.product.id} />}

                {showComments ? 
                <>
                    <button onClick={() => setShowComments(false)}>Hide comments</button>
                    {comments.length != 0 ? 
                    <CommentsList comments={comments} onEditComment={editComment} />
                    : <p>No comments</p>}
                </> 
                : <button onClick={handleShowComments}>Show comments</button>}
            </div>
        </>
    );
};

export default ProductsCard;
  