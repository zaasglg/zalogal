import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    error?: string;
}

export function RichTextEditor({ value, onChange, placeholder, className, error }: RichTextEditorProps) {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'align',
        'link', 'image'
    ];

    return (
        <div className={`rich-text-editor ${className || ''}`}>
            <div className={error ? 'border border-red-500 rounded-lg' : ''}>
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={onChange}
                    modules={modules}
                    formats={formats}
                    placeholder={placeholder}
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
            <style>{`
                .rich-text-editor .ql-container {
                    min-height: 200px;
                    font-size: 16px;
                    border-bottom-left-radius: 0.5rem;
                    border-bottom-right-radius: 0.5rem;
                }
                .rich-text-editor .ql-toolbar {
                    border-top-left-radius: 0.5rem;
                    border-top-right-radius: 0.5rem;
                }
                .rich-text-editor .ql-editor {
                     min-height: 200px;
                }
            `}</style>
        </div>
    );
}
