import React, { useState, useEffect } from "react";
import DashboardBox from "./Components/DashboardBox";
import { FaEye, FaPencilAlt, FaUserCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { HiDotsVertical } from "react-icons/hi";
import { IoSkullSharp, IoTimerOutline } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io"; // Recovered Cases
import { GiVirus } from "react-icons/gi"; // Active Cases
import Chart from "react-google-charts";
import { Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [data1, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [formData, setFormData] = useState({ status: "received" });
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmUpdateId, setConfirmUpdateId] = useState(null);

  const totalPages = Math.ceil(data1.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data1.slice(indexOfFirstItem, indexOfLastItem);

  const getData = async () => {
    const token = localStorage.getItem("token");
    const backend = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.get(`${backend}/gethealths`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.data);
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
      await axios.delete(`${backend}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData((prevData) => prevData.filter((message) => message._id !== id));
      setConfirmDeleteId(null);
      toast.success("Health deleted successfully");
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete");
    }
  };

  const [dataN, setDataN] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const getDataN = async () => {
    const token = localStorage.getItem("token");
    const backend = import.meta.env.VITE_BACKEND_URL;
    
    try {
      const response = await axios.get(`${backend}/updates/getupdate`, {
      
      });
      setDataN(response.data);
      console.log(response.data, "Fetched updates");
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message); // Set error message
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  };

  useEffect(() => {
    getDataN();
  }, []);

  const handleUpdate = async (id) => {
    const token = localStorage.getItem("token");
    const backend = import.meta.env.VITE_BACKEND_URL;
    try {
      await axios.put(`${backend}/received/${id}`, formData, {
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
      toast.success("Health updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ToastContainer />
      {currentItems.length > 0 ? (
        <div className="right-content w-100">
          <div className="row dashboardBoxWrapperRow">
            {/* Dashboard Boxes */}
            <div className="col-md-8">
              <div className="dashboardBoxWrapper d-flex">
                <DashboardBox
                  color={["#1da256", "#48d483"]}
                  totalName="Total Cases"
                  totalValue={dataN[0].test}
                  icon={<FaUserCircle />}
                  grow={true}
                />
                <DashboardBox
                  color={["#c012e2", "#eb64fe"]}
                  totalName="Recovered Cases"
                  totalValue={dataN[0].recovered}
                  icon={<IoMdHeart />}
                />
                <DashboardBox
                  color={["#632929", "#c96767"]}
                  totalName="Total Deaths"
                  totalValue={dataN[0].died}
                  icon={<IoSkullSharp />}
                />
                <DashboardBox
                  color={["#e1950e", "#f3cd29"]}
                  totalName="Active Cases"
                  totalValue={dataN[0].sick}
                  icon={<GiVirus />}
                />
              </div>
            </div>

            {/* Chart Section */}
            <div className="col-md-4">
              <div className="box">
                <div className="d-flex w-100 align-items-center bottomEle justify-content-space-between">
                  <h6 className="text-white mb-0 mt-0">Total Cases Data</h6>
                  <div className="ml-auto">
                    <span
                      className="ml-auto toggleIcon"
                      onClick={handleMenuOpen}
                    >
                      <HiDotsVertical />
                    </span>
                    <Menu
                      id="long-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      PaperProps={{
                        style: {
                          width: "20ch",
                        },
                      }}
                    >
                      <MenuItem onClick={handleMenuClose}>
                        <IoTimerOutline /> Last Day
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose}>
                        <IoTimerOutline /> Last Week
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose}>
                        <IoTimerOutline /> Last Month
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose}>
                        <IoTimerOutline /> Last Year
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
                <h3 className="text-white font-weight-bold margin-top-5">
                  $1,256,789.00
                </h3>
                <p>$45,000.00 allocated for patient care last month</p>

                <Chart
                  chartType="PieChart"
                  data={[]}
                  options={{ title: "Case Breakdown", pieHole: 0.4 }}
                  width={"100%"}
                  height={"170px"}
                />
              </div>
            </div>
          </div>

          {/* Table for patient records */}
          <div className="card shadow border-0 p-3">
            <h3 className="hd">Marburg Care Service - Patient Records</h3>

            <div className="table-responsive mt-3">
              <table className="table table-bordered v-align">
                <thead className="thead-dark">
                  <tr>
                    <th>UID</th>
                    <th>PATIENT NAME</th>
                    <th>EMAIL</th>
                    <th>TELEPHONE</th>
                    <th>SECTOR</th>
                    <th>DISTRICT</th>
                    <th>CREATED AT</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((health) => (
                    <tr key={health._id}>
                      <td>{health._id}</td>
                      <td>{health.fullName}</td>
                      <td>{health.email}</td>
                      <td>{health.phoneNumber}</td>
                      <td>{health.sector}</td>
                      <td>{health.district}</td>
                      <td>{health.createdAt}</td>
                      <td>
                        <div className="actions d-flex align-items-center">
                          <Button className="error" color="error">
                            <MdDelete
                              onClick={() => setConfirmDeleteId(health._id)}
                            />
                          </Button>
                          <div className="flex gap-1">
                            <span className="tx-sm text-[#46864c]">
                              {health.status}
                            </span>
                            <span>
                              <FaPencilAlt
                                size={15}
                                className="text-[#46864c]"
                                onClick={() => setConfirmUpdateId(health._id)}
                              />
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className=" flex w-full justify-end">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                  className="pagination"
                />
              </div>

              {/* Modals for confirmation */}
              {confirmDeleteId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded shadow">
                    <h4 className="mb-2">Confirm Delete</h4>
                    <p>Are you sure you want to delete this record?</p>
                    <div className="mt-4 flex justify-end">
                      <button
                        className="mr-2 btn"
                        onClick={() => setConfirmDeleteId(null)}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn"
                        onClick={() => handleDelete(confirmDeleteId)}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {confirmUpdateId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded shadow">
                    <h4 className="mb-2">Update Status</h4>
                    <p>Are you sure you want to update this record?</p>
                    <div className="mt-4">
                      <select
                        name="status"
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="w-full pl-10 pr-10 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#223A66] appearance-none"
                      >
                        <option value="received">Received</option>
                        <option value="pending">Pending</option>
                        <option value="processed">Processed</option>
                      </select>
                      <div className="mt-4 flex justify-end">
                        <button
                          className="mr-2 btn"
                          onClick={() => setConfirmUpdateId(null)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn"
                          onClick={() => handleUpdate(confirmUpdateId)}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}

export default Dashboard;
