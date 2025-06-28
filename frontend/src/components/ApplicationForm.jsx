import { useState } from 'react';
import axios from 'axios';
import '../App.css';

import SubscriberSection from './SubscriberSection';
import PlantOperatorSection from './PlantOperatorSection';
import PlantAddressSection from './PlantAddressSection';
import SystemInstallerSection from './SystemInstallerSection';
import SystemInfoSection from './SystemInfoSection';
import AttachmentsSection from './AttachmentsSection';
import FooterSection from './FooterSection';
import ApplicationsList from './ApplicationsList';

const EMPTY_FORM = {
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
    signature: '',
    sameAsSubscriber: false
};

function ApplicationForm() {
    const [form, setForm] = useState(EMPTY_FORM);
    const [editingId, setEditingId] = useState(null);
    const [status, setStatus] = useState({ loading: false, success: '', error: '' });

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

    const handleSameAsSubscriber = () => {
        setForm(prev => ({
            ...prev,
            sameAsSubscriber: !prev.sameAsSubscriber,
            operator: !prev.sameAsSubscriber ? { ...prev.subscriber } : {
                firstName: '',
                lastName: '',
                street: '',
                houseNumber: '',
                zip: '',
                city: '',
                phone: '',
                email: ''
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.subscriber.firstName || !form.subscriber.lastName) {
            setStatus({ loading: false, success: '', error: 'Please fill in required Subscriber fields.' });
            return;
        }

        setStatus({ loading: true, success: '', error: '' });

        try {
            if (editingId) {
                await axios.put(`http://localhost:3001/application/${editingId}`, form);
                setStatus({ loading: false, success: 'Application updated successfully!', error: '' });
            } else {
                await axios.post('http://localhost:3001/application', form);
                setStatus({ loading: false, success: 'Application submitted successfully!', error: '' });
            }

            setForm(EMPTY_FORM);
            setEditingId(null);
        } catch (err) {
            setStatus({ loading: false, success: '', error: 'Submission failed. Please try again.' });
            console.error(err);
        }
    };

    const startEditing = (app) => {
        setForm({
            systemType: app.systemType || '',
            plannedCommission: app.plannedCommission ? app.plannedCommission.split('T')[0] : '',
            attachments: app.attachments || EMPTY_FORM.attachments,

            subscriber: {
                firstName: app.subscriber?.firstName || '',
                lastName: app.subscriber?.lastName || '',
                street: app.subscriber?.street || '',
                houseNumber: app.subscriber?.houseNumber || '',
                zip: app.subscriber?.zip || '',
                city: app.subscriber?.city || '',
                phone: app.subscriber?.phone || '',
                email: app.subscriber?.email || ''
            },

            operator: {
                firstName: app.operator?.firstName || '',
                lastName: app.operator?.lastName || '',
                street: app.operator?.street || '',
                houseNumber: app.operator?.houseNumber || '',
                zip: app.operator?.zip || '',
                city: app.operator?.city || '',
                phone: app.operator?.phone || '',
                email: app.operator?.email || ''
            },

            plantAddress: {
                firstName: app.plantAddress?.firstName || '',
                lastName: app.plantAddress?.lastName || '',
                street: app.plantAddress?.street || '',
                houseNumber: app.plantAddress?.houseNumber || '',
                zip: app.plantAddress?.zip || '',
                city: app.plantAddress?.city || '',
                phone: app.plantAddress?.phone || '',
                email: app.plantAddress?.email || ''
            },

            installer: {
                company: app.installer?.company || '',
                place: app.installer?.place || '',
                registrationNumber: app.installer?.registrationNumber || ''
            },

            place: app.place || '',
            signatureDate: app.signatureDate ? app.signatureDate.split('T')[0] : '',
            signature: app.signature || '',
            sameAsSubscriber: false
        });
        setEditingId(app.id);
    };


    return (
        <>
            <form className="paper-form" onSubmit={handleSubmit}>
                <SubscriberSection handleChange={handleChange} />
                <PlantOperatorSection handleChange={handleChange} sameAsSubscriber={form.sameAsSubscriber} handleSameAsSubscriber={handleSameAsSubscriber} />
                <PlantAddressSection handleChange={handleChange} />
                <SystemInstallerSection handleChange={handleChange} />
                <SystemInfoSection handleChange={handleChange} />
                <AttachmentsSection handleChange={handleChange} />
                <FooterSection handleChange={handleChange} />

                <button type="submit" className="btn btn-primary mt-3" disabled={status.loading}>
                    {status.loading
                        ? (editingId ? 'Saving Changes...' : 'Submitting...')
                        : (editingId ? 'Submit Changes' : 'Submit Application')}
                </button>

                <div className="mt-4">
                    {status.error && <div className="alert alert-danger">{status.error}</div>}
                    {status.success && <div className="alert alert-success">{status.success}</div>}
                </div>
            </form>

            <ApplicationsList onEdit={startEditing} />
        </>
    );
}

export default ApplicationForm;
