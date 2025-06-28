function SystemInstallerSection({ handleChange }) {
    return (
        <>
            <h2 className="h4 fw-bold mt-5">
                <i className="bi bi-building me-2" style={{ color: "#6f42c1" }}></i>
                System Installer (Specialist Electrical Company)
            </h2>
            <hr />

            <div className="row g-3">
                <div className="col-md-12">
                    <label className="form-label">Company</label>
                    <input
                        name="company"
                        className="form-control"
                        onChange={(e) => handleChange(e, 'installer')}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Place</label>
                    <input
                        name="place"
                        className="form-control"
                        onChange={(e) => handleChange(e, 'installer')}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Registration Number with Network Operator</label>
                    <input
                        name="registrationNumber"
                        className="form-control"
                        onChange={(e) => handleChange(e, 'installer')}
                    />
                </div>
            </div>
        </>
    )
}

export default SystemInstallerSection;
