import React, { useContext, useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import LOGO from '../../../assets/logo.png';
import { MyContext } from '../../../App';

const PasswordResetForm = () => {
  const context = useContext(MyContext);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    context.setIsHideSidebarAndHeader(true);
  }, []);

  // Basic email validation function
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Simulate a network request
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Password reset link has been sent!');
    }, 2000); // Simulate a 2-second delay
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-end p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center rounded-lg mb-4">
            <img src={LOGO} alt="Logo" className='w-20' />
          </div>
          <h2 className="text-2xl font-semibold text-[#223A66]">Reset the password</h2>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <form className="p-6 space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#223A66] text-white py-2 px-4 rounded-md hover:bg-[#31569a] focus:outline-none focus:ring-2 focus:ring-[#2d5193] focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'GET LINK'}
            </button>
          </form>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Remember the password? <a href="/login" className="text-[#223A66] hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetForm;
