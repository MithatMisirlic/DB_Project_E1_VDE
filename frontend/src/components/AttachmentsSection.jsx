function AttachmentsSection({ handleChange }) {
    return (
        <>
            <hr className="my-4" />
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
        </>
    )
}

export default AttachmentsSection;
