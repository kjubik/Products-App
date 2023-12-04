import { useNavigate } from "react-router-dom";

const CreatePostButton = () => {
    const navigate = useNavigate();

    return (
    <>
        <button onClick={() => navigate("/new-product")}
        className="rounded-full bg-blue-500 text-white font-semibold 
        px-4 py-1 flex items-center justify-around text-lg
        shadow-md shadow-blue-200 hover:bg-blue-700">
            Create post
        </button>
    </>
    )
}

export default CreatePostButton;
