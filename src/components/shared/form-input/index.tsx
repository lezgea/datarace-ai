import { capitalize } from 'lodash';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';


interface IFormInputProps {
    label?: string;
    type?: string;
    placeholder: string;
    errors: FieldErrors;
    register: UseFormRegister<any>;
    name: string;
    nonCapitalize?: boolean,
    icon?: JSX.Element;
    isTextarea?: boolean;
    labelStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    onClickIcon?: () => void;
}

export const FormInput: React.FC<IFormInputProps> = (props) => {
    let {
        isTextarea,
        label,
        type,
        nonCapitalize,
        placeholder,
        errors,
        icon,
        register,
        name,
        labelStyle,
        inputStyle,
        onClickIcon,
    } = props;

    return (
        <div className="relative w-full">
            <div className="relative">
                {
                    !!label &&
                    <label htmlFor={name} className="block font-semibold text-gray-700 mb-2" style={labelStyle}>
                        {label}
                    </label>
                }
                {
                    isTextarea
                        ?
                        <textarea
                            id={name}
                            placeholder={placeholder}
                            className={`w-full h-[200px] px-5 py-4 pr-12 border ${errors[name] ? 'ring-2 ring-red' : 'border-gray-300'
                                } rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryLight transition duration-200 ease-in-out transform`}
                            style={inputStyle}
                            {...register(name)}
                        />
                        :
                        <input
                            type={type}
                            id={name}
                            placeholder={placeholder}
                            autoCapitalize={nonCapitalize ? "none" : "off"}
                            className={`w-full h-[50px] px-5 py-2 pr-12 border ${errors[name] ? 'ring-2 ring-red' : 'border-gray-300'
                                } rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryLight transition duration-200 ease-in-out transform`}
                            style={inputStyle}
                            {...register(name, {
                                onChange: (e) => {
                                    e.target.value = nonCapitalize ? e.target.value.toLowerCase() : e.target.value;
                                }
                            })}
                        />
                }
                {
                    icon &&
                    <div className="absolute h-[50px] right-5 bottom-0 flex items-center" onClick={onClickIcon}>
                        {icon}
                    </div>
                }
            </div>
            {
                errors[name] && (
                    <p className="text-gray-400 text-sm mt-1">{(errors[name]?.message as string) || ''}</p>
                )
            }
        </div>
    )
}
