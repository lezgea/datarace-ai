"use client"

import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface TagInputProps {
    label?: string;
    tags: { name: string }[];
    setTags: (tags: { name: string }[]) => void;
    placeholder?: string;
}

const TagInput: React.FC<TagInputProps> = ({ tags, setTags, label, placeholder }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
            event.preventDefault(); // Prevent form submission
            if (tags.length > 30) {
                toast.warning('You have exceeded the maximum number of tags (30) allowed!');
                return;
            }
            setTags([...tags, { name: inputValue.trim() }]); // Add new tag
            setInputValue(''); // Clear the input
        }
    };

    const handleDelete = (tagToDelete: string) => {
        setTags(tags.filter(tag => tag.name !== tagToDelete)); // Remove the tag
    };

    const handleChange = (value: string) => {
        if (value.length > 30) {
            toast.warning('You have exceeded the maximum number of symbols (30) allowed!');
            return;
        }
        setInputValue(value);
    }


    return (
        <div className="flex flex-col">
            {
                !!label &&
                <label className="block font-semibold text-gray-700">
                    {label}
                </label>
            }
            <div className="flex flex-wrap gap-2 my-2">
                {tags.map((tag, index) => (
                    <span key={index} className="bg-primaryLight text-lg text-white px-3 py-1 rounded-lg flex items-center">
                        {tag.name}
                        <button
                            type='button'
                            onClick={() => handleDelete(tag.name)}
                            className="ml-2 text-lg text-red-500"
                        >
                            &times;
                        </button>
                    </span>
                ))}
            </div>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={`w-full h-[50px] px-5 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryLight transition duration-200 ease-in-out transform`}
            />
        </div>
    );
};

export default TagInput;
