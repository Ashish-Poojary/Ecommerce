import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const MyCart = () => {
  const uid = localStorage.getItem("u");
  const [myOrderList, setMyOrderList] = useState([]);
  const [orderAmount, setOrderAmount] = useState(0);

  const getMyOrders = useCallback(async () => {
    try {
      const result = await axios.get(`http://localhost:3001/mycart/${uid}`);
      setMyOrderList(result.data);
      // Calculate total only from pending orders
      const totalAmount = result.data.reduce((total, item) => {
        const orderStatus = (item.order_status || '').toLowerCase();
        if (orderStatus === 'pending') {
          const itemTotal = typeof item.total === 'number' ? item.total : parseFloat(item.total) || 0;
          return total + itemTotal;
        }
        return total;
      }, 0);
      setOrderAmount(totalAmount);
    } catch (error) {
      alert("Error loading cart");
    }
  }, [uid]);

  useEffect(() => {
    getMyOrders();
  }, [getMyOrders]);

  const removeOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deleteorder/${id}`);
      alert("Order removed successfully");
      getMyOrders();
    } catch (error) {
      alert("Failed to remove the order");
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">My Order Details</h2>
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover">
          <thead className="table-success">
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Order Date</th>
              {/* <th>Order Time</th> */}
              <th>Order Status</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myOrderList.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center">
                  No items in your cart.
                </td>
              </tr>
            ) : (
              myOrderList.map((order, index) => {
                const orderTotal = typeof order.total === 'number' ? order.total : parseFloat(order.total) || 0;
                const orderPrice = typeof order.price === 'number' ? order.price : parseFloat(order.price) || 0;
                const formatDate = (dateString) => {
                  if (!dateString) return '';
                  const date = new Date(dateString);
                  return date.toLocaleDateString('en-GB', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit' 
                  });
                };
                return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.product_name}</td>
                  <td>{order.qty}</td>
                  <td>₹{orderPrice.toLocaleString('en-IN')}</td>
                  <td>₹{orderTotal.toLocaleString('en-IN')}</td>
                  <td>{formatDate(order.order_date)}</td>
                  {/* <td>{order.order_time}</td> */}
                  <td
                    className={
                      (order.order_status || '').toLowerCase() === "pending"
                        ? "text-warning fs-4 fw-bold"
                        : "text-success fs-4 fw-bold"
                    }
                  >
                    {order.order_status || 'N/A'}
                  </td>
                  <td
                    className={
                      order.payment_status === "pending" || order.payment_status === "unpaid"
                        ? "text-danger fs-4 fw-bold"
                        : "text-success fs-4 fw-bold"
                    }
                  >
                    {order.payment_status}
                  </td>
                  <td className="text-center">
                    {(order.order_status || '').toLowerCase() === "pending" ? (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeOrder(order.id)}
                        title="Remove Order"
                        aria-label="Remove Order"
                      >
                        Delete
                      </button>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>
                </tr>
                );
              })
            )}
            {myOrderList.length > 0 && orderAmount > 0 && (
              <tr className="bg-success text-dark">
                <td colSpan="4" className="text-end fw-bold">Total (Pending Orders):</td>
                <td className="text-dark fs-3 fw-bold">₹{orderAmount.toLocaleString('en-IN')}</td>
                <td colSpan="5"></td>
              </tr>
            )}
          </tbody>
            </table>
          </div>
          {myOrderList.length > 0 && (
            <div className="mt-4 text-end">
              <button
                className="btn btn-warning btn-lg"
                disabled={orderAmount === 0}
                onClick={() => window.location.href = `paybill_next/${orderAmount}`}
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCart;
