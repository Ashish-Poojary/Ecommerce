import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    try {
      const response = await axios.get("http://localhost:3001/admin/stats");
      setStats(response.data);
    } catch (error) {
      alert("Error loading dashboard");
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Admin Dashboard</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card border-primary">
                <div className="card-body">
                  <h5 className="card-title text-primary">Total Users</h5>
                  <p className="card-text fs-3 fw-bold">{stats.totalUsers}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card border-success">
                <div className="card-body">
                  <h5 className="card-title text-success">Total Products</h5>
                  <p className="card-text fs-3 fw-bold">{stats.totalProducts}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card border-info">
                <div className="card-body">
                  <h5 className="card-title text-info">Total Orders</h5>
                  <p className="card-text fs-3 fw-bold">{stats.totalOrders}</p>
                </div>
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <div className="card border-danger">
                <div className="card-body">
                  <h5 className="card-title text-danger">Total Revenue</h5>
                  <p className="card-text fs-3 fw-bold">₹{parseFloat(stats.totalRevenue || 0).toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;