import { ProductComment } from "src/firebase/types";


interface CommentsListProps {
    comments: ProductComment[];
}


const CommentsList = (props: CommentsListProps) => {
    return (
    <>
        <ul>
            {props.comments.map((comment) => (
                <li key={comment.id}>
                    <p>{comment.description}</p>
                </li>
            ))}
        </ul>
    </>
    )
}

export default CommentsList;
