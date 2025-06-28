function SystemInfoSection({ handleChange }) {
    return (
        <>
            <hr className="my-4" />
            <h2 className="mb-3">System Info</h2>
            <div className="row g-3 mb-3">
                <div className="col-md-6">
                    <label className="form-label">System Type</label>
                    <select name="systemType" className="form-select" onChange={handleChange} required>
                        <option value="">Select Type</option>
                        <option value="New construction">New construction</option>
                        <option value="Extension">Extension</option>
                        <option value="Dismantling">Dismantling</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Planned Commission Date</label>
                    <input type="date" name="plannedCommission" className="form-control" onChange={handleChange} required />
                </div>
            </div>
        </>
    )
}

export default SystemInfoSection;
