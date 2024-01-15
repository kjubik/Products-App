import { ProductComment } from "src/firebase/types/ProductComment";
import { convertTimestampToDate } from "src/firebase/utils/convertTimestampToDate";
import { useState } from "react";
import { getAuth } from "firebase/auth";


interface CommentProps {
    comment: ProductComment;
    onCommentEdit: (commentId: string, description: string) => void;
    onDeleteComment: (commentId: string) => void;
}


const CommentCard = (props: CommentProps) => {

    const auth = getAuth();

    const [showEdit, setShowEdit] = useState(false);
    const [newDescription, setNewDescription] = useState(props.comment.description);

    const handleEdit = () => {
        setShowEdit(true);
    }

    const handleSave = () => {
        if (!props.comment.id) return;
        setShowEdit(false);
        props.onCommentEdit(props.comment.id, newDescription);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewDescription(e.target.value)
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    }

    const handleDelete = () => {
        if (!props.comment.id) return;
        props.onDeleteComment(props.comment.id)
    }

    return (
    <>
        <div className="flex flex-col gap-1">
            <div className="px-2 flex justify-between pb-1">
                <span className="font-semibold ">
                    {props.comment.creatorUsername}
                </span>
                <div className="flex gap-3 font-semibold">
                    {!showEdit && auth.currentUser && auth.currentUser.uid == props.comment.creatorUserId && <button onClick={handleEdit} className="text-slate-800/70 hover:text-slate-800">Edit</button>}
                    <button onClick={handleDelete} className="text-red-500/70 hover:text-red-500">Delete</button>
                </div>
            </div>
            <div className="outline outline-1 outline-slate-200 flex w-full px-4 py-2 rounded-full">
                {showEdit ? 
                    <div
                        className="w-full placeholder-slate-400 bg-inherit text-slate-900
                        focus:outline focus:outline-2 focus:outline-blue-400
                        flex"
                    >
                        <input 
                            type="text" 
                            name="description" 
                            placeholder="Write a comment"
                            value={newDescription} 
                            onChange={handleInputChange} 
                            onKeyDown={handleKeyPress}
                            className="w-full bg-transparent outline-none"
                        />
                        <button 
                            onClick={handleSave}
                            className=""
                        >
                            Save
                        </button>
                    </div>  
                    : <div className="">{props.comment.description}</div>
                }
            </div>
            <span className="flex w-full justify-end px-2 text-slate-400 text-sm">
                {convertTimestampToDate(props.comment.creationDate)}
            </span>
        </div>
    </>
    )
}

export default CommentCard;
