"use client";

import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface ITextEditorProps {
    label?: string;
    name: string;
    initialValue?: string,
    register: UseFormRegister<any>;
    setValue: UseFormSetValue<any>; // Added setValue prop
};

const TextEditor: React.FC<ITextEditorProps> = (props) => {
    const { name, label, initialValue, register, setValue } = props;

    // Register the field with react-hook-form
    useEffect(() => {
        register(name);
    }, [register, name]);

    const handleEditorChange = (content: string) => {
        setValue(name, content);
    };

    return (
        <>
            {label && (
                <label htmlFor={name} className="block font-semibold text-gray-700">
                    {label}
                </label>
            )}
            <Editor
                id={name}
                apiKey='ph415vw3hy5asd60xywrf8et7mdh21vf9bjwezyld0gnou6v'
                init={{
                    plugins: [
                        // Core editing features
                        'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                        // Your account includes a free trial of TinyMCE premium features
                        // Try the most popular premium features until Nov 11, 2024:
                        'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
                        // Early access to document converters
                        'importword', 'exportword', 'exportpdf'
                    ],
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    mergetags_list: [
                        { value: 'First.Name', title: 'First Name' },
                        { value: 'Email', title: 'Email' },
                    ],
                    ai_request: (request: any, respondWith: any) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                    exportpdf_converter_options: { 'format': 'Letter', 'margin_top': '1in', 'margin_right': '1in', 'margin_bottom': '1in', 'margin_left': '1in' },
                    exportword_converter_options: { 'document': { 'size': 'Letter' } },
                    importword_converter_options: { 'formatting': { 'styles': 'inline', 'resets': 'inline', 'defaults': 'inline', } },
                    // Add the following properties
                    content_css: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap',
                    font_formats: 'Poppins=poppins;',
                }}
                initialValue={initialValue}
                onEditorChange={handleEditorChange} // Capture editor content changes
            />
        </>
    );
};

export default TextEditor;
