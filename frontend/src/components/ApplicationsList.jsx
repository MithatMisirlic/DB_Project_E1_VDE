import { useState } from 'react';
import axios from 'axios';

function ApplicationsList({ onEdit }) {
    const [applications, setApplications] = useState([]);
    const [searchId, setSearchId] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchId.trim()) {
            try {
                const res = await axios.get('http://localhost:3001/application');
                setApplications(res.data);
            } catch (err) {
                console.error('Error fetching all:', err);
                setApplications([]);
            }
            return;
        }

        try {
            const res = await axios.get(`http://localhost:3001/application/${searchId}`);
            if (res.data) {
                setApplications([res.data]);
            } else {
                setApplications([]);
            }
        } catch (err) {
            console.error('Error searching by ID:', err);
            setApplications([]);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this application?')) return;

        try {
            await axios.delete(`http://localhost:3001/application/${id}`);
            setApplications(applications.filter(app => app.id !== id));
        } catch (err) {
            console.error('Error deleting application:', err);
        }
    };

    return (
        <div className="mt-5">
            <h2 className="mb-3">Submitted Applications</h2>

            <form className="mb-4" onSubmit={handleSearch}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Application ID or leave blank for all"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">Search</button>
                </div>
            </form>

            {applications.length === 0 ? (
                <p className="text-muted">No applications to display. Use search above.</p>
            ) : (
                <div className="row g-3">
                    {applications.map(app => (
                        <div key={app.id} className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Application ID: {app.id}</h5>
                                    <p className="card-text"><strong>System Type:</strong> {app.systemType}</p>
                                    <p className="card-text"><strong>Planned Commission:</strong> {new Date(app.plannedCommission).toLocaleDateString()}</p>

                                    <p className="card-text"><strong>Subscriber:</strong> {app.subscriber.firstName} {app.subscriber.lastName}</p>
                                    <p className="card-text"><strong>Operator:</strong> {app.operator.firstName} {app.operator.lastName}</p>
                                    <p className="card-text"><strong>Installer:</strong> {app.installer.company}</p>
                                    <p className="card-text"><strong>Plant Address:</strong> {app.plantAddress.street} {app.plantAddress.houseNumber}</p>

                                    <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(app.id)}>
                                        Delete
                                    </button>
                                    <button className="btn btn-secondary btn-sm" onClick={() => onEdit(app)}>
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ApplicationsList;
