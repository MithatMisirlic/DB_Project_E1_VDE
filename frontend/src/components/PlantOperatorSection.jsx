function PlantOperatorSection({ handleChange }) {
    return (
        <>
            <h2 className="h4 fw-bold mt-5">
                <i className="bi bi-person-badge me-2" style={{ color: "#6f42c1" }}></i>
                Plant Operator
            </h2>
            <hr />
            <div className="row g-3">
                {[
                    { label: 'First Name', name: 'firstName' },
                    { label: 'Last Name', name: 'lastName' },
                    { label: 'Street', name: 'street' },
                    { label: 'House Number', name: 'houseNumber' },
                    { label: 'ZIP', name: 'zip' },
                    { label: 'City', name: 'city' },
                    { label: 'Phone', name: 'phone' },
                    { label: 'Email', name: 'email' }
                ].map((field, idx) => (
                    <div key={idx} className={`col-md-${field.name === 'street' || field.name === 'city' ? '8' : '4'}`}>
                        <label className="form-label">{field.label}</label>
                        <input
                            name={field.name}
                            className="form-control"
                            onChange={(e) => handleChange(e, 'operator')}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default PlantOperatorSection;
