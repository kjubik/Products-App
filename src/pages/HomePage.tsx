import Select from "react-tailwindcss-select";
import { useState } from "react";
import { SelectValue } from "react-tailwindcss-select/dist/components/type";

const options = [
    { value: "fox", label: "🦊 Fox" },
    { value: "Butterfly", label: "🦋 Butterfly" },
    { value: "Honeybee", label: "🐝 Honeybee" }
];

const HomePage = () => {
    const [animal, setAnimal] = useState<SelectValue>([]);

    const handleChange = (value: SelectValue) => {
            console.log("value:", value);
            setAnimal(value);
    };

    return (
        <>
            <Select 
                    value={animal}
                    onChange={handleChange}
                    options={options} 
                    isMultiple={true}
                    primaryColor={'blue'}
            />
            {animal && Array.isArray(animal) && animal.map((item) => (
                    <div key={item.value}>{item.label}</div>
            ))}
        </>
    );
};

export default HomePage;
