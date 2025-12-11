import React, { useState } from 'react'
import axios from'axios'

const Feedback = () => {
    const [formData,setFormData]=useState({userid:"",about_product:"",about_service:"",comments:""})
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
      const SendFeedbackData = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3001/feedback', formData);
          alert('Feedback submitted successfully');
          document.location="http://localhost:3000/feedback"
        } catch (error) {
          console.error('Error sending message:', error);
          alert('Failed to send message. Please try again.');
        }
      };
  return (
    <div className="container mt-4 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="mb-4">Give Feedback</h2>
          <form onSubmit={SendFeedbackData}>
            <div className="mb-3">
              <label className="form-label">User ID</label>
              <input 
                type="text" 
                name="userid" 
                value={formData.userid} 
                onChange={handleChange} 
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">About Product</label>
              <textarea 
                name="about_product" 
                value={formData.about_product} 
                onChange={handleChange} 
                className="form-control"
                rows="3"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">About Services</label>
              <textarea 
                name="about_service" 
                value={formData.about_service} 
                onChange={handleChange} 
                className="form-control"
                rows="3"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Comments</label>
              <textarea 
                name="comments" 
                value={formData.comments} 
                onChange={handleChange} 
                className="form-control"
                rows="4"
                required
              />
            </div>

            <div className="mt-3">
              <button className="btn btn-success" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Feedback
