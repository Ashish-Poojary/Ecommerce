import axios from 'axios';
import React, { useState } from 'react'

const Category = () => {

  const [formData, setFormData] = useState({ category: "" })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const CategorytData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/category', formData);
      alert('Category added successfully');
      document.location = "http://localhost:3000/category"
    } catch (error) {
      console.error('Error', error);
      alert('Failed to add product. Please try again.');

    }

  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <h2 className="mb-4">Add Category</h2>
          <form onSubmit={CategorytData}>
            <div className="mb-3">
              <label className="form-label">Category Name</label>
              <input 
                type="text" 
                name="category"
                value={formData.category} 
                onChange={handleChange}
                className="form-control"
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

export default Category