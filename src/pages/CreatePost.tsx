

const CreatePost = () => {

    return (
        <>
            <div className='p-4 mx-auto flex flex-col gap-4 max-w-sm rounded'>
                <input type="text" placeholder="Image URL"/>
                <input type="text" placeholder="Product title"/>
                <input type="text" placeholder="Description"/>
                <input type="text" placeholder="Categories"/>
            </div>
        </>
    );
};

export default CreatePost;
