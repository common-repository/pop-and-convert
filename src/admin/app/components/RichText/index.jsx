import { __ } from "@wordpress/i18n";
import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';

export default ({ callback, value }) => {
    const [text, setText] = useState(value || '');
    const quillRef = useRef(); // Create a ref

    // Handle text change
    const handleChange = (value) => {
        if (quillRef.current) {
            const editor = quillRef.current.getEditor();
            const unprivilegedEditor = quillRef.current.makeUnprivilegedEditor(editor);
            if (unprivilegedEditor.getText().trim() === '') {
                editor.setContents([]);
                value = '';
            }
        }
        setText(value);
        callback(value);
    };

    // modules
    var toolbarOptions = [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'align': [] }],
        ['bold', 'italic', 'underline', 'link'],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ];

    return (
        <>
            <ReactQuill ref={quillRef} placeholder={__('Enter a description', 'pop-and-convert')} value={text} onChange={(value) => handleChange(value)} modules={{ toolbar: toolbarOptions }} />
        </>
    );
};
