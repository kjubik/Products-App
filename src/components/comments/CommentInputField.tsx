import { createComment } from "src/firebase/services/comments";
import { useState } from "react";
import { ProductComment } from "src/firebase/types";
// import { auth } from "src/App";


interface CommentInputFieldProps {
    productId: string;
}


const CommentInputField = (props: CommentInputFieldProps) => {
    
    const [comment, setComment] = useState<ProductComment>({
        description: "",
        productId: props.productId,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setComment({
            ...comment,
            [name]: value
        })
    }

    const handleAddComment = async () => {
        if (!props.productId) return;
        await createComment(comment);
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddComment();
        }
    }

    return(
    <>
        <div
            className="rounded-full outline outline-1 outline-slate-300 
            px-4 py-2 w-full placeholder-slate-400 bg-inherit text-slate-900
            focus:outline focus:outline-2 focus:outline-blue-400
            flex"
        >
            <input 
                type="text" 
                name="description" 
                placeholder="Write a comment"
                value={comment.description} 
                onChange={handleInputChange} 
                onKeyDown={handleKeyPress}
                className="w-full bg-transparent outline-none"
            />
            <button 
                onClick={handleAddComment}
                className=""
            >
                Add
            </button>
        </div> 
    </>
    )
}

export default CommentInputField;
