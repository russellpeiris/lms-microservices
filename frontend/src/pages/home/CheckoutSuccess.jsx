import { Link } from 'react-router-dom';
import SuccessIcon from '../../assets/icons8-success.svg';

const CheckoutSuccess = () => {
    return (
        <div style={{ backgroundColor: '#f7fafc', height: '100vh', width: '100vw', position: 'fixed' }}>
            <div
                style={{
                    backgroundColor: '#ffffff',
                    padding: '1.5rem',
                    marginTop: '12%',
                    marginLeft: '30%',
                    maxWidth: '600px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <SuccessIcon />
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.5rem', color: '#1a202c', fontWeight: '600', marginBottom: '1rem' }}>
                        Payment Complete!
                    </h3>
                    <p style={{ color: '#718096', marginBottom: '0.5rem' }}>
                        Thank you for completing your secure online payment.
                    </p>
                    <p style={{ color: '#718096', marginBottom: '2rem' }}>Have a great day!</p>
                    <div style={{ paddingTop: '2.5rem', textAlign: 'center' }}>
                        <Link
                            to={'/home'}
                            style={{
                                padding: '0.75rem 3rem',
                                backgroundColor: '#3182ce',
                                color: '#ffffff',
                                fontWeight: '600',
                                borderRadius: '4px',
                                textDecoration: 'none',
                            }}
                        >
                            Go Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccess;
