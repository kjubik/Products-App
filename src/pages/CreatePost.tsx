import { useState } from "react";
import Select from "react-select";

const CreatePost = () => {

    const [descriptionLength, setDescriptionLength] = useState(0);

    const handleDescriptionInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionLength(e.target.value.length);
    }

    const customSelectStyles = {
        control: (baseStyles: any) => ({
            ...baseStyles,
            color: 'text-red-400',
        }),
    }

    return (
        <>
            <div className='p-4 mx-auto flex flex-col gap-4 max-w-sm rounded'>
                <input type="url" placeholder="Paste image URL"
                className="rounded px-3 py-2 outline outline-1 outline-slate-200
                focus:outline-2 focus:outline-blue-400"/>
                <input type="text" placeholder="Product title"
                className="focus:outline-none bg-inherit text-2xl font-semibold"/>
                <div className="flex flex-col gap-1">
                    <textarea onInput={handleDescriptionInput} placeholder="Write a description" maxLength={200}
                    className="rounded px-3 py-2 outline outline-1 outline-slate-200
                    pb-20 resize-none focus:outline-2 focus:outline-blue-400"/>
                    <div className="min-w-full text-right text-sm text-slate-400">{descriptionLength}/200 characters</div>
                </div>
                <input type="text" placeholder="Search for category"
                className="rounded px-3 py-2 outline outline-1 outline-slate-200
                focus:outline-2 focus:outline-blue-400"/>

                <Select
                    options={[{value: '1', label: 'one'}, {value: '2', label: 'two'}]} 
                    isMulti
                    name="categories"
                    styles={customSelectStyles}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
            </div>
        </>
    );
};

export default CreatePost;
