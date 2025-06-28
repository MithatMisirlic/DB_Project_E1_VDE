function FooterSection({ handleChange }) {
    return (
        <>
            <hr className="my-4" />
            <h2 className="mb-3 mt-5">Place / Date / Signature</h2>
            <div className="row g-3 mb-3">
                <div className="col-md-4">
                    <label className="form-label">Place</label>
                    <input
                        name="place"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Date</label>
                    <input
                        type="date"
                        name="signatureDate"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Signature</label>
                    <input
                        name="signature"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
            </div>
        </>
    )
}

export default FooterSection;
