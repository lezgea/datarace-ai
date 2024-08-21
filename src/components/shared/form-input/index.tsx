import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';


interface IFormInputProps {
    label: string;
    type: string;
    placeholder: string;
    errors: FieldErrors;
    register: UseFormRegister<any>;
    name: string; // This is necessary to connect the input with the form field
    icon?: JSX.Element;
    onClickIcon?: () => void;
}

export const FormInput: React.FC<IFormInputProps> = (props) => {
    let {
        label,
        type,
        placeholder,
        errors,
        icon,
        register,
        name,
        onClickIcon,
    } = props;

    return (
        <div className="relative">
            <div className="relative">
                <label htmlFor={name} className="block text-gray-700 mb-2">
                    {label}
                </label>
                <input
                    type={type}
                    id={name}
                    placeholder={placeholder}
                    className={`w-full h-[50px] bg-gray-50 px-5 py-2 pr-12 border ${errors[name] ? 'ring-2 ring-red-500' : 'border-gray-300'
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out transform`}
                    {...register(name)}
                />
                <div className="absolute h-[50px] right-5 bottom-0 flex items-center" onClick={onClickIcon}>
                    {icon}
                </div>
            </div>
            {
                errors[name] && (
                    <p className="text-red-500 text-sm mt-1">{(errors[name]?.message as string) || ''}</p>
                )
            }
        </div>
    )
}
