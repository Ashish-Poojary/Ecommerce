import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [userAddress, setUserAddress] = useState(null);

    useEffect(() => {
        getOrders();
    }, []);

    const filteredOrders = filterStatus === 'all' 
        ? orders 
        : orders.filter(order => {
            const status = (order.order_status || '').toLowerCase();
            if (filterStatus === 'confirmed') return status === 'confirmed';
            if (filterStatus === 'pending') return status === 'pending';
            return true;
        });

    const getOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:3001/orders");
            if (response.data && Array.isArray(response.data)) {
                setOrders(response.data);
            } else {
                setOrders([]);
            }
        } catch (error) {
            setOrders([]);
            alert("Error loading orders: " + (error.response?.data?.error || error.message));
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' 
        });
    };

    const fetchUserAddress = async (email) => {
        try {
            const response = await axios.get(`http://localhost:3001/user/address/${email}`);
            setUserAddress(response.data);
            setShowAddressModal(true);
        } catch (error) {
            alert("Failed to fetch user address");
        }
    };

    const handleUserNameClick = (order) => {
        const paymentStatus = (order.payment_status || '').toLowerCase();
        if (paymentStatus === 'paid') {
            const email = order.user_email || order.user_id;
            if (email) {
                fetchUserAddress(email);
            }
        } else {
            alert("Address is only available for paid orders");
        }
    };


    return (
        <div className="container mt-4 mb-5">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2>Customer Orders</h2>
                        <div>
                            <select 
                                className="form-select form-select-sm" 
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                style={{ width: 'auto', display: 'inline-block' }}
                            >
                                <option value="all">All Orders</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                            </select>
                        </div>
                    </div>
                    {loading ? (
                        <div className="text-center">
                            <p>Loading orders...</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped table-hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th>#</th>
                                        <th>Order Date</th>
                                        <th>User Name</th>
                                        <th>User Email</th>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                        <th className="text-center">Payment Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.length > 0 ? (
                                        filteredOrders.map((order, index) => (
                                            <tr key={order.id || index}>
                                                <td>{index + 1}</td>
                                                <td>{formatDate(order.order_date)}</td>
                                                <td>
                                                    {(order.payment_status || '').toLowerCase() === 'paid' ? (
                                                        <span 
                                                            style={{ cursor: 'pointer', color: '#0d6efd', textDecoration: 'underline' }}
                                                            onClick={() => handleUserNameClick(order)}
                                                            title="Click to view address"
                                                        >
                                                            {order.user_name || order.user_id}
                                                        </span>
                                                    ) : (
                                                        <span>{order.user_name || order.user_id}</span>
                                                    )}
                                                </td>
                                                <td>{order.user_email || order.user_id}</td>
                                                <td>{order.product_name || 'N/A'}</td>
                                                <td>{order.qty}</td>
                                                <td>₹{parseFloat(order.price || 0).toLocaleString('en-IN')}</td>
                                                <td>₹{parseFloat(order.total || 0).toLocaleString('en-IN')}</td>
                                                <td className="text-center">
                                                    <span 
                                                        className={
                                                            order.payment_status === "Paid" || order.payment_status === "paid"
                                                                ? "badge bg-success"
                                                                : "badge bg-danger"
                                                        }
                                                    >
                                                        {order.payment_status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="text-center text-muted p-4">
                                                {orders.length === 0 ? (
                                                    <p>No orders found</p>
                                                ) : (
                                                    `No ${filterStatus} orders found`
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Address Modal */}
            {showAddressModal && userAddress && (
                <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Customer Address</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => {
                                        setShowAddressModal(false);
                                        setUserAddress(null);
                                    }}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <strong>Name:</strong> {userAddress.name}
                                </div>
                                <div className="mb-3">
                                    <strong>Address:</strong> {userAddress.address || 'N/A'}
                                </div>
                                <div className="mb-3">
                                    <strong>City:</strong> {userAddress.city || 'N/A'}
                                </div>
                                <div className="mb-3">
                                    <strong>Pincode:</strong> {userAddress.pincode || 'N/A'}
                                </div>
                                <div className="mb-3">
                                    <strong>Contact:</strong> {userAddress.contact || 'N/A'}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={() => {
                                        setShowAddressModal(false);
                                        setUserAddress(null);
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
