import React, { useContext, useEffect, useState } from 'react';
import { Home, User, Mail, Lock, Eye, Facebook } from 'lucide-react';
import Logo from '../../../assets/logo.png';
import { MyContext } from '../../../App';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    context.setIsHideSidebarAndHeader(true);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  // Simple form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Simulate form submission with loader
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      context.setIsHideSidebarAndHeader(false);
      navigate('/login');
    }, 2000); // Simulate server response delay
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex items-center justify-center p-10">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-[#223A66] mb-2">
              MARBURG CARE SERVICE DASHBOARD
            </h1>
            <p className="text-gray-600 mb-8">
              Welcome to the Marburg Care Service dashboard. Manage patient information, treatment records, and essential care service operations seamlessly.
            </p>
            {/* <button onClick={() => context.setIsHideSidebarAndHeader(false)} className="bg-[#223A66] text-white px-4 py-2 rounded-md flex items-center">
              <Home className="mr-2" size={18} />
              <Link to="/">GO TO HOME</Link>
            </button> */}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-white p-10">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center rounded-full mb-4">
              <img src={Logo} className="w-20" alt="" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Register a new account</h2>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <User className="absolute top-3 left-3 text-gray-400" size={18} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={`w-full pl-10 pr-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b61a6]`}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div className="relative">
              <Mail className="absolute top-3 left-3 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#3d6abb]`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="relative">
              <Lock className="absolute top-3 left-3 text-gray-400" size={18} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b63ad]`}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div className="relative">
              <Lock className="absolute top-3 left-3 text-gray-400" size={18} />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={`w-full pl-10 pr-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#4370c2]`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-[#223A66] focus:ring-[#3e61a3] border-gray-300 rounded" />
              <label className="ml-2 block text-sm text-gray-900">
                I agree to the all Terms & Conditions
              </label>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#223A66] hover:bg-[#3f67b2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#365ca1]"
              disabled={isLoading}
            >
              {isLoading ? 'Signing up...' : 'SIGN UP'}
            </button>
          </form>
          
          <div className="text-center text-sm">
            <span className="text-gray-500">Already have an account? </span>
            <Link to="/login" className="font-medium text-[#223A66] hover:text-[#4a68a0]">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
