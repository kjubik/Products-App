import { ProductComment } from "src/firebase/types";
import CommentCard from "./CommentCard";


interface CommentsListProps {
    comments: ProductComment[];
    onEditComment: (commentId: string, description: string) => void;
    onDeleteComment: (commentId: string) => void;
}


const CommentsList = (props: CommentsListProps) => {

    console.log(props.comments);

    return (
    <>
        {props.comments.length > 0 ? 
            <ul className="flex flex-col gap-6">
                {props.comments
                    .map((comment) => (
                        <li key={comment.id}>
                            <CommentCard comment={comment} onCommentEdit={props.onEditComment} onDeleteComment={props.onDeleteComment} />
                        </li>
                    ))}
            </ul>
            :
            <p className="text-slate-500">No comments</p>
        }
    </>
    )
}

export default CommentsList;
