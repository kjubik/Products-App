import { createComment } from "src/firebase/services/commentsServices";
import { useState } from "react";
import { Comment } from "src/firebase/types";
import { auth } from "src/App";


const CommentField = () => {
    
    const [comment, setComment] = useState({
        description: "",
        creatorUserId: auth.currentUser?.uid,
    } as Comment);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setComment({
            ...comment,
            [name]: value
        })
    }

    const handleAddComment = async () => {
        await createComment(comment);
    }

    return(
    <>
        <input type="text" placeholder="Write a comment" 
        onChange={handleInputChange} name="description" value={comment.description}
        className="rounded-full outline outline-1 outline-slate-300 
        px-4 py-2 w-full placeholder-slate-400 bg-inherit text-slate-900
        focus:outline focus:outline-2 focus:outline-blue-400"/>   
        <button onClick={handleAddComment}>Add comment</button> 
    </>
    )
}

export default CommentField;
