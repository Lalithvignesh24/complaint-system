import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FaFileUpload, FaCamera } from 'react-icons/fa';

function ComplaintForm() {
    const [formData, setFormData] = useState({ title: '', description: '', category: 'Sanitation' });
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Create a ref to access the hidden file input element
    const fileInputRef = useRef(null);

    const handleTextChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    // Click handler for the "Upload File" button
    const handleUploadClick = () => {
        fileInputRef.current.setAttribute('accept', 'image/*,application/pdf');
        // Make sure the 'capture' attribute is removed for gallery access
        fileInputRef.current.removeAttribute('capture');
        fileInputRef.current.click();
    };

    // Click handler for the "Use Camera" button
    const handleCameraClick = () => {
        fileInputRef.current.setAttribute('accept', 'image/*');
        // This 'capture' attribute tells the browser to open the camera
        fileInputRef.current.setAttribute('capture', 'environment');
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!formData.title || !formData.description) {
            setError('Title and description are required.');
            return;
        }

        const submissionData = new FormData();
        submissionData.append('title', formData.title);
        submissionData.append('description', formData.description);
        submissionData.append('category', formData.category);
        if (file) {
            submissionData.append('evidenceFile', file);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/complaints', submissionData);
            setMessage(`Complaint submitted successfully! Your Complaint ID is: ${response.data.complaintId}`);
            setFormData({ title: '', description: '', category: 'Sanitation' });
            setFile(null);
            e.target.reset();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to submit complaint.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Submit a Complaint</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title, Description, and Category inputs remain the same */}
                <div>
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleTextChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea name="description" rows="5" value={formData.description} onChange={handleTextChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required></textarea>
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select name="category" value={formData.category} onChange={handleTextChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="Sanitation">Sanitation</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Ragging / Bullying">Ragging / Bullying</option>
                        <option value="Security">Security</option>
                        <option value="Faculty">Faculty</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Updated Evidence Upload Section with two buttons */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Upload Evidence
                    </label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden" // The actual input is hidden
                    />
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={handleUploadClick}
                            className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-200 transition"
                        >
                            <FaFileUpload />
                            Upload File
                        </button>
                        <button
                            type="button"
                            onClick={handleCameraClick}
                            className="flex-1 flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-100 transition"
                        >
                            <FaCamera />
                            Use Camera
                        </button>
                    </div>
                    {file && (
                        <p className="text-sm text-gray-500 mt-3">
                            Selected: {file.name}
                        </p>
                    )}
                </div>
                
                {message && <div className="p-4 text-center bg-green-100 text-green-800 rounded-lg font-medium">{message}</div>}
                {error && <div className="p-4 text-center bg-red-100 text-red-800 rounded-lg font-medium">{error}</div>}

                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 duration-300">
                    Submit Anonymously
                </button>
            </form>
        </div>
    );
}

export default ComplaintForm;