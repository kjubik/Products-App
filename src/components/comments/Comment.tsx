import { Comment } from "src/firebase/types";


interface CommentProps {
    comment: Comment;
}


const CommentCard = (props: CommentProps) => {
    return (
    <>
        <div className="flex flex-col gap-4 max-w-sm p-4 rounded-lg bg-slate-50 
        outline outline-1 outline-slate-200">
            <div className="flex w-full justify-between gap-4 px-1">
                <p className="">
                    {props.comment.creatorUserId}
                </p>
                <div className="flex gap-4 font-semibold"> 
                    <a href={`/edit-comment/${props.comment.id}`}
                    className="text-slate-800/70 hover:text-slate-800">
                        Edit
                    </a>
                    <button className="text-red-500/70 hover:text-red-500">
                        Delete
                    </button>
                </div>
            </div>
            <p className="text-slate-800">
                {props.comment.description}
            </p>
        </div>
    </>
    )
}

export default CommentCard;
