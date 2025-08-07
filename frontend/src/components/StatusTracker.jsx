import React, { useState } from 'react';
import axios from 'axios';

function StatusTracker() {
    const [complaintId, setComplaintId] = useState('');
    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTrack = async (e) => {
        e.preventDefault();
        if (!complaintId) {
            setError('Please enter a Complaint ID.');
            return;
        }
        setLoading(true);
        setError('');
        setComplaint(null);

        try {
            // Fetch the specific complaint by its ID
            const response = await axios.get(`http://localhost:5000/api/complaints/${complaintId}`);
            setComplaint(response.data);
        } catch (err) {
            setError('Complaint not found or an error occurred.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Submitted':
                return 'bg-blue-100 text-blue-800';
            case 'In Progress':
                return 'bg-yellow-100 text-yellow-800';
            case 'Resolved':
                return 'bg-green-100 text-green-800';
            case 'Rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Track Your Complaint</h2>
            
            <form onSubmit={handleTrack} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={complaintId}
                    onChange={(e) => setComplaintId(e.target.value)}
                    placeholder="Enter your Complaint ID"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    type="submit"
                    className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
                    disabled={loading}
                >
                    {loading ? 'Tracking...' : 'Track'}
                </button>
            </form>

            {error && <div className="p-3 text-center bg-red-100 text-red-800 rounded-lg">{error}</div>}
            
            {complaint && (
                <div className="mt-6 border-t pt-6">
                    <h3 className="text-xl font-semibold mb-4">Complaint Details</h3>
                    <div className="space-y-3">
                        <p><strong>ID:</strong> {complaint._id}</p>
                        <p><strong>Title:</strong> {complaint.title}</p>
                        <p><strong>Category:</strong> {complaint.category}</p>
                        <p><strong>Submitted On:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
                        <p>
                            <strong>Status:</strong>
                            <span className={`ml-2 px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(complaint.status)}`}>
                                {complaint.status}
                            </span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StatusTracker;