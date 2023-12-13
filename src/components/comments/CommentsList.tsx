import { ProductComment } from "src/firebase/types";
import CommentCard from "./CommentCard";


interface CommentsListProps {
    comments: ProductComment[];
    onEditComment: (commentId: string, description: string) => void;
    onDeleteComment: (commentId: string) => void;
}


const CommentsList = (props: CommentsListProps) => {
    return (
    <>
        <ul className="flex flex-col gap-6">
            {props.comments
                .filter(comment => !comment.isDeleted)
                .map((comment) => (
                    <li key={comment.id}>
                        <CommentCard comment={comment} onCommentEdit={props.onEditComment} onDeleteComment={props.onDeleteComment} />
                    </li>
                ))}
        </ul>
    </>
    )
}

export default CommentsList;
