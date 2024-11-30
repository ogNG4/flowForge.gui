import React, { forwardRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
    defaultValue?: string;
    readOnly?: boolean;
    onTextChange?: (value: string) => void;
    onSelectionChange?: (range: any) => void;
    height?: string;
}

const Editor = forwardRef<any, EditorProps>(
    ({ defaultValue, readOnly, onTextChange, onSelectionChange, height }, ref) => {
        const modules = {
            toolbar: {
                container: [
                    ['bold', 'italic', 'underline'],
                    [{ align: ['', 'center', 'right'] }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ size: ['small', 'normal', 'large', 'huge'] }],
                ],
            },
        };

        const formats = ['bold', 'italic', 'underline', 'align', 'list', 'size'];

        return (
            <div style={{ height: '300px' }}>
                <ReactQuill
                    ref={ref}
                    theme="snow"
                    defaultValue={defaultValue}
                    readOnly={readOnly}
                    modules={modules}
                    formats={formats}
                    onChange={onTextChange}
                    onChangeSelection={onSelectionChange}
                    style={{ height: '100%' }}
                />
                <style>{`
                    .ql-container {
                        height: calc(100% - 42px) !important;
                        border-bottom-left-radius: 4px;
                        border-bottom-right-radius: 4px;
                    }
                    .ql-editor {
                        min-height: 100%;
                    }
                    .ql-toolbar {
                        border-top-left-radius: 4px;
                        border-top-right-radius: 4px;
                    }
                `}</style>
            </div>
        );
    }
);

export default Editor;
