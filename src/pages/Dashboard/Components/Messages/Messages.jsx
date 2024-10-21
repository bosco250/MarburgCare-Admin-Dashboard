import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Messages() {
  const [data, setData] = useState([]); 
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmUpdateId, setConfirmUpdateId] = useState(null);
  const [formData, setFormData] = useState({ status: '' });

  const getData = async () => {
    const token = localStorage.getItem("token");
    const backend = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.get(`${backend}/messages/getmessages`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      });
      setData(response.data.data); // Set the state with the response data
      console.log(response.data, "emmykeen");
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []); // Runs only once when component mounts

  const handleDelete = async (id) => {
    try {
      const backend = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem('token');
      await axios.delete(`${backend}/messages/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        }
      });
      setData((prevData) => prevData.filter((message) => message._id !== id)); // Update state
      setConfirmDeleteId(null); // Close the confirmation dialog
      toast.success("Message deleted successfully");
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    const token = localStorage.getItem('token');
    const backend = import.meta.env.VITE_BACKEND_URL;
    try {
      await axios.put(`${backend}/messages/received/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData((prevData) =>
        prevData.map((message) =>
          message._id === id ? { ...message, ...formData } : message
        )
      );
      setConfirmUpdateId(null); // Close the update dialog
      toast.success("Message updated successfully if you chose received message sent to user");
    } catch (error) {
      console.error('Error updating message:', error);
      toast.error('Failed to update message');
    }
  };

  return (
    <div className="mt-16 p-6 pl-10">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-[#223A66]">Messages</h2>
      {data.length > 0 ? (
        data.map((message) => (
          <div key={message._id} className="flex gap-2 h-24 items-center hover:cursor-pointer mb-3">
            <div className="w-20 flex items-center justify-center">
              <div className="py-3 px-4 text-4xl rounded-full bg-gray-300 font-bold flex justify-center items-center text-[#223A66]">
                {message.fullName[0] || "loading..."}
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-[16px] text-[#223A66]">
                {message.fullName || "Dusengimana Jean Bosco"}
              </h3>
              <span className="text-[12px] mt--1">
                {message.email || "dusengiman06@gmail.com"}
              </span>
              <p className="text-[14px] w-5/6 line-clamp-2">
                {message.phoneNumber || "loading.."}
              </p>
              <p className="text-[14px] w-5/6 line-clamp-2">
                {message.topic || "loading.."}
              </p>
              <div className="text-[#46864c] flex gap-2">
                <p className="text-[#46864c]">{message.status}</p>
                <p>
                  <FaPencilAlt className="text-[#46864c]" onClick={() => {
                    setFormData({ status: message.status }); // Populate form data with current status
                    setConfirmUpdateId(message._id);
                  }} />
                </p>
                <p>
                  <MdDelete
                    className="text-red-500"
                    onClick={() => setConfirmDeleteId(message._id)}
                  />
                </p>
              </div>
            </div>

            {/* Update Dialog */}
            {confirmUpdateId === message._id && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-md">
                  <select
                    name="status"
                    value={message.status}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#223A66] appearance-none`}
                  >
                    <option value="">{message.status}</option>
                    <option value="received">received</option>
                    {/* Add more options as needed */}
                  </select>
                  <div className="flex justify-end mt-4">
                    <button
                      className="bg-[#46864c] text-white px-4 py-2 rounded mr-2"
                      onClick={() => handleUpdate(confirmUpdateId)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-[#223A66] text-white px-4 py-2 rounded"
                      onClick={() => setConfirmUpdateId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Delete Confirmation Dialog */}
            {confirmDeleteId === message._id && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-md">
                  <p>Are you sure you want to delete this message?</p>
                  <div className="flex justify-end mt-4">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => handleDelete(confirmDeleteId)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-[#223A66] text-white px-4 py-2 rounded"
                      onClick={() => setConfirmDeleteId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No messages available</p>
      )}
    </div>
  );
}

export default Messages;
