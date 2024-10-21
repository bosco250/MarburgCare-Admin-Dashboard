import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateMessages = () => {
  // Renamed for React component convention
  const [data, setData] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmUpdateId, setConfirmUpdateId] = useState(null);
  const [formData, setFormData] = useState({
    sick: "",
    test: "",
    died: "",
    recovered: "",
  });

  const getData = async () => {
    const token = localStorage.getItem("token");
    const backend = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.get(`${backend}/updates/getupdate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      console.log(response.data, "Fetched messages");
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const backend = import.meta.env.VITE_BACKEND_URL;
    try {
      await axios.delete(`${backend}/updates/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData((prevData) => prevData.filter((message) => message._id !== id));
      setConfirmDeleteId(null);
      toast.success("update deleted successfully");
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    const token = localStorage.getItem("token");
    const backend = import.meta.env.VITE_BACKEND_URL;
    try {
      await axios.put(`${backend}/updates/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData((prevData) =>
        prevData.map((message) =>
          message._id === id ? { ...message, ...formData } : message
        )
      );
      setConfirmUpdateId(null);
      toast.success("Message updated successfully");
    } catch (error) {
      console.error("Error updating message:", error);
      toast.error("Failed to update message");
    }
  };

  return (
    <div className="mt-20 p-6 pl-10 flex gap-1 flex-wrap h-screen pt-9 bg-gray-100">
      <ToastContainer />
      {/* <h2 className="text-2xl font-bold mb-6 text-[#223A66]">Messages</h2> */}
      {data.length > 0 ? (
        data.map((message) => (
          <div
            key={message._id}
            className="flex gap-2 h-24 items-center hover:cursor-pointer mb-3"
          >
            <div className="flex flex-col p-4 bg-white shadow-md rounded-lg border border-[#E0E0E0] mt-12">
              <h3 className="font-semibold text-[16px] text-[#223A66]">
                Number of Sick: {message.sick || "loading.."}
              </h3>
              <span className="text-[12px] text-gray-600">
                Total Deaths Today: {message.died || "loading..."}
              </span>
              <p className="text-[14px] text-gray-700 w-5/6 mt-1">
                Recovered Cases Today: {message.recovered || "loading.."}
              </p>
              <p className="text-[14px] text-gray-700 w-5/6">
                Tests Conducted Today: {message.test || "loading.."}
              </p>
              <div className="text-[#46864c] flex gap-2 items-center mt-2">
                <p className="font-medium">Action</p>
                <p>
                  <FaPencilAlt
                    className="text-[#46864c] cursor-pointer hover:text-green-600"
                    onClick={() => {
                      setFormData({ status: message.status });
                      setConfirmUpdateId(message._id);
                    }}
                    title="Edit Status"
                  />
                </p>
                <p>
                  <MdDelete
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => setConfirmDeleteId(message._id)}
                    title="Delete Message"
                  />
                </p>
              </div>
            </div>

            {/* Update Dialog */}
            {/* Update Dialog */}
            {confirmUpdateId&& (
              <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-md h-[70vh]">
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-[#223A66]">
                      Number of Sick:
                    </label>
                    <input
                      type="text"
                      name="sick"
                      value={formData.sick}
                      onChange={handleChange}
                      className={`w-full pl-2 pr-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#223A66]`}
                    />

                    <label className="font-semibold text-[#223A66]">
                      Test:
                    </label>
                    <input
                      type="text"
                      name="test"
                      value={formData.test}
                      onChange={handleChange}
                      className={`w-full pl-2 pr-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#223A66]`}
                    />

                    <label className="font-semibold text-[#223A66]">
                      Number of Died:
                    </label>
                    <input
                      type="text"
                      name="died"
                      value={formData.died}
                      onChange={handleChange}
                      className={`w-full pl-2 pr-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#223A66]`}
                    />

                    <label className="font-semibold text-[#223A66]">
                      Number Recovered:
                    </label>
                    <input
                      type="text"
                      name="recovered"
                      value={formData.recovered}
                      onChange={handleChange}
                      className={`w-full pl-2 pr-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#223A66]`}
                    />
                  </div>

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
            {confirmDeleteId&&(
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
};

export default UpdateMessages; // Export with the updated name
