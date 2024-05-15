import { Link } from 'react-router-dom';

const CheckoutFailed = () => {
    return (
        <div className="bg-gray-100 h-screen">
            <div className="bg-white p-6 md: mx-auto">
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        Payment Attempt Failed!
                    </h3>
                    <p className="text-gray-600 my-2">Try again later.</p>
                    <p>Have a grate day!</p>
                    <div className="py-10 text-center">
                        <Link to={'/home'} className="px-12  bg-blue text-white font-semibold py-3">
                            Go Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutFailed;
