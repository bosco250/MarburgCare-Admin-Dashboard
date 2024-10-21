import React, { useContext, useState, useEffect } from 'react';
import { Mail, Lock } from 'lucide-react';
import Logo from '../../../assets/logo.png';
import { MyContext } from '../../../App';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// Custom Spinner component
const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
    ></path>
  </svg>
);

const LoginForm = () => {
  const navigate = useNavigate();
  const context = useContext(MyContext);

  // State for form values, errors, and loading state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    context.setIsHideSidebarAndHeader(true);
  }, [context]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Reset errors on change
  };

  // Validate inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    const frontend = import.meta.env.VITE_BACKEND_URL; // Make sure the env var is prefixed correctly

    try {
      const response = await axios.post(`${frontend}/users/login`, formData);

      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);
      console.log('Form submitted successfully:', response.data);

      toast.success("Logged in successfully!"); // Success toast

      // Reset form data
      setFormData({
        email: '',
        password: '',
      });

      setTimeout(() => {
        context.setIsHideSidebarAndHeader(false);
        navigate('/dashboard');
        setIsLoading(false);
      }, 3000);

    } catch (error) {
      console.error('Error in login form:', error);

      // Check if there's a response from the server
      const errorMessage = error.response?.data?.message || 'Failed to login. Please try again later.';

      // Show the error message in the toast
      alert(errorMessage)

      setIsLoading(false); // Ensure loading state is turned off on error
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-center items-center p-4 w-[1300px]">
      <ToastContainer />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center rounded-lg mb-4">
            <img src={Logo} className="w-20" alt="Logo" />
          </div>
          <h2 className="text-2xl font-semibold text-[#223A66]">Login to MarburgCare</h2>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <form className="p-6 space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-[#223A66]`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="relative">
              <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-[#223A66]`}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#223A66] text-white py-2 px-4 rounded-md hover:bg-[#3d63a8] focus:outline-none focus:ring-2 focus:ring-[#223A66] focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : 'SIGN IN'}
            </button>
          </form>

          <div className="px-6 pb-6">
            <button
              onClick={() => navigate('/forgotPassword')}
              className="w-full text-sm text-gray-600 hover:underline focus:outline-none"
            >
              FORGOT PASSWORD
            </button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-[#223A66] hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
