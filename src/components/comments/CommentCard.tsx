import { Link } from "react-router-dom";
import { ProductComment } from "src/firebase/types";
import { convertTimestampToDate } from "src/utils/convertTimestampToDate";


interface CommentProps {
    comment: ProductComment;
}


const CommentCard = (props: CommentProps) => {

    return (
    <>
        <div className="flex flex-col gap-1">
            <div className="px-2 flex justify-between pb-1">
                <span className="font-semibold ">
                    {props.comment.creatorUsername}
                </span>
                <div className="flex gap-3 font-semibold">
                    <Link to='' className="text-slate-800/70 hover:text-slate-800">Edit</Link>
                    <button className="text-red-500/70 hover:text-red-500">Delete</button>
                </div>
            </div>
            <div className="outline outline-1 outline-slate-200 flex w-full px-4 py-2 rounded-full">
                <div className="">{props.comment.description}</div>
            </div>
            <span className="flex w-full justify-end px-2 text-slate-400 text-sm">
                {convertTimestampToDate(props.comment.creationDate)}
            </span>
        </div>
    </>
    )
}

export default CommentCard;
