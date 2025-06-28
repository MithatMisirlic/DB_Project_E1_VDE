import ApplicationForm from './components/ApplicationForm.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className="bg-light min-vh-100 py-4">
            <div className="container px-3" style={{ maxWidth: '960px' }}>
                <div className="bg-white p-4 rounded shadow-sm border">
                    <h1 className="text-center">Power Plant Registration - Form E.1</h1>
                    <p className="text-center text-muted mb-4">Submit data under VDE-AR-N 4105.</p>
                    <ApplicationForm />
                </div>
            </div>
        </div>
    );
}

export default App;
