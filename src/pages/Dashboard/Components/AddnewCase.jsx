import { Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewCaseTemplateForm = () => {
  const [formData, setFormData] = useState({
    sick: "",
    test: "",
    died: "",
    recovered: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const backend = import.meta.env.VITE_BACKEND_URL; // Ensure correct environment variable

    try {
      const response = await axios.post(`${backend}/updates/register`, formData);

      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);

      console.log('Form submitted successfully:', response.data);

      toast.success("Added new case successfully");

      // Reset form data
      setFormData({
        sick: '',
        died: '',
        recovered: "",
        test: ""
      });

      setIsLoading(false);

    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error.response?.data?.message || 'Failed to submit form. Please try again later.';
      toast.error(errorMessage);

      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-32 pb-20 shadow-md rounded-lg">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-8 text-[#223A66] w-full text-center">
        Add a new case today
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Today Death
            </label>
            <input
              type="number"
              placeholder="Enter number of deaths today"
              name="died"
              value={formData.died}
              onChange={handleInputChange}
              className="w-full p-2 border-[1px] border-[#223A66] rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Active Case today
            </label>
            <input
              type="number"
              placeholder="Enter number of sick people"
              name="sick"
              value={formData.sick}
              onChange={handleInputChange}
              className="w-full p-2 border-[1px] border-[#223A66] rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recovered Cases
            </label>
            <input
              type="number"
              placeholder="Enter number of recovered people"
              name="recovered"
              value={formData.recovered}
              onChange={handleInputChange}
              className="w-full p-2 border-[1px] border-[#223A66] rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Test Cases
            </label>
            <input
              type="number"
              placeholder="Enter number of tests today"
              name="test"
              value={formData.test}
              onChange={handleInputChange}
              className="w-full p-2 border-[1px] border-[#223A66] rounded-md"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex w-full justify-end mt-10">
            <Button
              type="submit"
              className="!capitalize !font-bold text-white !bg-[#223A66]"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Add Changes'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewCaseTemplateForm;
