import { ProductComment } from "src/firebase/types";
import CommentCard from "./CommentCard";


interface CommentsListProps {
    comments: ProductComment[];
}


const CommentsList = (props: CommentsListProps) => {
    return (
    <>
        <ul className="flex flex-col gap-6">
            {props.comments.map((comment) => (
                <li key={comment.id}>
                    <CommentCard comment={comment} />
                </li>
            ))}
        </ul>
    </>
    )
}

export default CommentsList;
