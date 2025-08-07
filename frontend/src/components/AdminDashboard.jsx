import React, { useState, useEffect } from 'react';
// 1. Import the custom 'api' instance instead of the default 'axios'
import api from '../api'; // Adjust the path if api.js is in a different folder

function AdminDashboard() {
    // State to store the list of complaints from the API
    const [complaints, setComplaints] = useState([]);
    // State to handle loading feedback while fetching data
    const [loading, setLoading] = useState(true);
    // State to store any errors that occur during fetching
    const [error, setError] = useState('');

    // This function fetches all complaints from the backend when the component first loads
    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                // 2. Use the 'api' instance. It automatically includes the token and base URL.
                const response = await api.get('/complaints');
                // Store the fetched data in the state
                setComplaints(response.data);
            } catch (err) {
                // The interceptor in api.js will handle 401 errors automatically.
                // This will catch other errors, like network issues.
                setError('Failed to fetch complaints. Please try again.');
                console.error(err);
            } finally {
                // Set loading to false once the request is complete
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []); // The empty dependency array [] ensures this effect runs only once

    // This function handles updating the status of a complaint
    const handleStatusChange = async (id, newStatus) => {
        try {
            // 3. Use the 'api' instance for the PUT request as well. It's already configured.
            await api.put(`/complaints/${id}`, { status: newStatus });
            
            // Update the local state immediately to reflect the change in the UI
            setComplaints(prevComplaints =>
                prevComplaints.map(complaint =>
                    complaint._id === id ? { ...complaint, status: newStatus } : complaint
                )
            );
        } catch (err) {
            console.error('Failed to update status', err);
            alert('Failed to update status. Please try again.');
        }
    };

    // Show a loading message while data is being fetched
    if (loading) {
        return <p className="text-center text-gray-500 mt-10">Loading complaints...</p>;
    }

    // Show an error message if the fetch failed
    if (error) {
        return <p className="text-center text-red-500 mt-10">{error}</p>;
    }

    return (
        <div className="max-w-7xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase">Title</th>
                            {/* I added a placeholder for Category as it was in your table but not in the previous code */}
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase">Category</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase">Date</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase">Evidence</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {complaints.map((complaint) => (
                            <tr key={complaint._id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 font-medium">{complaint.title}</td>
                                <td className="py-3 px-4">{complaint.category || 'General'}</td>
                                <td className="py-3 px-4 text-sm">{new Date(complaint.createdAt).toLocaleDateString()}</td>
                                <td className="py-3 px-4">
                                    {complaint.filePath ? (
                                        <a
                                            href={`http://localhost:5000/${complaint.filePath}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 hover:text-indigo-800 hover:underline"
                                        >
                                            View File
                                        </a>
                                    ) : (
                                        <span className="text-gray-400">N/A</span>
                                    )}
                                </td>
                                <td className="py-3 px-4">
                                    <select
                                        value={complaint.status}
                                        onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                    >
                                        <option value="Submitted">Submitted</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Resolved">Resolved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashboard;