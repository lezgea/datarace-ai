import { CloseIcon, PenIcon } from '@assets/icons';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';


interface IFormEditInputProps {
    label?: string;
    type: string;
    placeholder: string;
    errors: FieldErrors;
    register: UseFormRegister<any>;
    name: string; // This is necessary to connect the input with the form field
    icon?: JSX.Element;
    onClickIcon?: () => void;
}

export const FormEditInput: React.FC<IFormEditInputProps> = (props) => {
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

    const [editable, setEditable] = React.useState<boolean>(false);

    return (
        <div className="relative select-none">
            <div className="relative">
                {
                    !!label &&
                    <label htmlFor={name} className="block text-lg text-gray-900 font-medium mb-2">
                        {label}
                    </label>
                }
                <input
                    disabled={!editable}
                    type={type}
                    id={name}
                    placeholder={placeholder}
                    className={`w-full h-[45px] py-2 pr-12 text-gray-600 border ${editable ? 'border-primaryLight px-5' : 'border-none bg-white'} rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryLight transition duration-200 ease-in-out transform`}
                    {...register(name)}
                />
                <div onClick={() => setEditable(!editable)} className="absolute h-[50px] -right-10 top-8 bottom-0 flex items-center cursor-pointer">
                    {editable ? <CloseIcon /> : <PenIcon className="w-7 h-7" fill="#dedede" />}
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
