"use client";

import React, { useEffect } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import JoditEditor, { Jodit } from 'jodit-react';


interface ITextEditorProps {
    label?: string;
    name: string;
    initialValue?: string,
    register: UseFormRegister<any>;
    setValue: UseFormSetValue<any>; // Added setValue prop
};

const TextEditor: React.FC<ITextEditorProps> = (props) => {
    const { name, label, initialValue, register, setValue } = props;

    const editor = React.useRef(null);

    // Register the field with react-hook-form
    useEffect(() => {
        register(name);
    }, [register, name]);

    const handleEditorChange = (content: string) => {
        setValue(name, content);
    };

    const config = {
        readonly: false,
        height: 600,
        // buttons: ['bold', 'italic', 'underline', 'link', 'unlink', 'source'],
        uploader: {
            insertImageAsBase64URI: true,
        },
        controls: {
            paragraph: {
                list: Jodit.atom({
                    p: 'Pharagraph',
                    // h1: 'Heading 1',
                    h2: 'Heading 2',
                    h3: 'Heading 3',
                    h4: 'Heading 4',
                    h5: 'Heading 5',
                    h6: 'Heading 6',
                    blockquote: 'Quote',
                    div: 'Div',
                    pre: 'Source code'
                })
            }
        }
    };

    return (
        <div>
            {label && (
                <label htmlFor={name} className="block font-semibold text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <JoditEditor
                ref={editor}
                value={initialValue || ''}
                config={config}
                className="bg-primary"
                onBlur={handleEditorChange}
                onChange={handleEditorChange}
            />
        </div>
    );
};

export default TextEditor;
