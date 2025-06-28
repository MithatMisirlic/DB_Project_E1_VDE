import { useState } from 'react';
import axios from 'axios';
import './App.css';

function ApplicationForm() {
    const [form, setForm] = useState({
        systemType: '',
        plannedCommission: '',
        attachments: {
            applicationFormEnclosed: false,
            sitePlanAttached: false,
            dataSheetAttached: false,
            unitCertificatesAvailable: false,
            naProtectionCertificateEnclosed: false,
            powerFlowMonitoringCert: false,
            overviewCircuitDiagramAttached: false
        },
        subscriber: {
            firstName: '',
            lastName: '',
            street: '',
            houseNumber: '',
            zip: '',
            city: '',
            phone: '',
            email: ''
        },
        operator: {
            firstName: '',
            lastName: '',
            street: '',
            houseNumber: '',
            zip: '',
            city: '',
            phone: '',
            email: ''
        },
        plantAddress: {
            firstName: '',
            lastName: '',
            street: '',
            houseNumber: '',
            zip: '',
            city: '',
            phone: '',
            email: ''
        },
        installer: {
            company: '',
            place: '',
            registrationNumber: ''
        },
        place: '',
        signatureDate: '',
        signature: ''
    });

    const handleChange = (e, section = null) => {
        const { name, value, type, checked } = e.target;

        if (section === 'attachments') {
            setForm(prev => ({
                ...prev,
                attachments: {
                    ...prev.attachments,
                    [name]: checked
                }
            }));
            return;
        }

        if (section) {
            setForm(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [name]: type === 'checkbox' ? checked : value
                }
            }));
        } else {
            setForm(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/application', form);
            alert('Application submitted!');
            console.log(response.data);
        } catch (err) {
            alert('Submission failed.');
            console.error(err);
        }
    };

    return (
        <form className="paper-form" onSubmit={handleSubmit}>
            {/* Subscriber Section */}
            <h2 className="mb-3">Subscriber Information</h2>
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
                        <input name={field.name} className="form-control" onChange={(e) => handleChange(e, 'subscriber')} />
                    </div>
                ))}
            </div>

            {/* Operator Section */}
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
                        <input name={field.name} className="form-control" onChange={(e) => handleChange(e, 'operator')} />
                    </div>
                ))}
            </div>

            {/* Plant Address Section */}
            <h2 className="h4 fw-bold mt-5">
                <i className="bi bi-geo-alt-fill me-2" style={{ color: "#6f42c1" }}></i>
                Plant Address
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
                        <input name={field.name} className="form-control" onChange={(e) => handleChange(e, 'plantAddress')} />
                    </div>
                ))}
            </div>

            {/* System Installer Section */}
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

            <hr className="my-4" />

            {/* System Info */}
            <h2 className="mb-3">System Info</h2>
            <div className="row g-3 mb-3">
                <div className="col-md-6">
                    <label className="form-label">System Type</label>
                    <select name="systemType" className="form-select" onChange={handleChange}>
                        <option value="">Select Type</option>
                        <option value="New construction">New construction</option>
                        <option value="Extension">Extension</option>
                        <option value="Dismantling">Dismantling</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Planned Commission Date</label>
                    <input type="date" name="plannedCommission" className="form-control" onChange={handleChange} />
                </div>
            </div>

            <hr className="my-4" />

            {/* Attachments */}
            <h2 className="mb-3 mt-5">Attachments</h2>
            {[
                { label: 'Application Form Enclosed', name: 'applicationFormEnclosed' },
                { label: 'Site Plan Attached', name: 'sitePlanAttached' },
                { label: 'Data Sheet Attached', name: 'dataSheetAttached' },
                { label: 'Unit Certificates Available', name: 'unitCertificatesAvailable' },
                { label: 'NA Protection Certificate Enclosed', name: 'naProtectionCertificateEnclosed' },
                { label: 'Certificate for Power Flow Monitoring', name: 'powerFlowMonitoringCert' },
                { label: 'Overview Circuit Diagram Attached', name: 'overviewCircuitDiagramAttached' }
            ].map((checkbox, idx) => (
                <div key={idx} className="form-check mb-2">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name={checkbox.name}
                        onChange={(e) => handleChange(e, 'attachments')}
                    />
                    <label className="form-check-label">{checkbox.label}</label>
                </div>
            ))}

            <hr className="my-4" />

            {/* Place / Date / Signature */}
            <h2 className="mb-3 mt-5">Place / Date / Signature</h2>
            <div className="row g-3 mb-3">
                <div className="col-md-4">
                    <label className="form-label">Place</label>
                    <input name="place" className="form-control" onChange={handleChange} />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Date</label>
                    <input type="date" name="signatureDate" className="form-control" onChange={handleChange} />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Signature</label>
                    <input name="signature" className="form-control" onChange={handleChange} />
                </div>
            </div>

            <button type="submit" className="btn btn-primary mt-3">Submit Application</button>
        </form>
    );
}

export default ApplicationForm;
