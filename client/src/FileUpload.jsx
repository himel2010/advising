import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const FileUpload = ({ onFileUpload }) => {
    const [file, setFile] = useState(null);

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
        handleFileUpload(acceptedFiles[0]);
    };

    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('gradesheet', file);

        try {
            const response = await axios.post('http://your-backend-url/upload', formData);
            onFileUpload(response.data);  // Pass the data back to the parent component
        } catch (error) {
            console.error('File upload failed:', error);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop a gradesheet, or click to select one</p>
            </div>
            <button
                onClick={() => handleFileUpload(file)}
                disabled={!file}
            >
                Upload
            </button>
        </div>
    );
};

export default FileUpload;
