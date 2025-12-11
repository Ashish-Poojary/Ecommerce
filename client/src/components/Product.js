import React, { useState } from 'react'
import axios from 'axios'

const Product = () => {
  const [formData,setFormData]=useState({product_name:"",category:"",
    qty:"",price:"",uom:"",stock:""})

    const [file,setFile] = useState("")

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const setImgFile = (e) => {
            setFile(e.target.files[0])
        }

        const SendProductData = async (e) => {
            e.preventDefault();
            try {
              const formDataToSend = new FormData();
              formDataToSend.append('product_name', formData.product_name);
              formDataToSend.append('category', formData.category);
              formDataToSend.append('qty', formData.qty);
              formDataToSend.append('price', formData.price);
              formDataToSend.append('uom', formData.uom);
              formDataToSend.append('stock', formData.stock);
              formDataToSend.append('file', file); // Append the image file
          
              const config = {
                headers: { 'Content-Type': 'multipart/form-data' },
              };
          
              await axios.post('http://localhost:3001/product',formDataToSend,config)
              .then((response)=>{
                alert('Product added successfully');
                document.location = 'http://localhost:3000/product';
              })
            } catch (error) {
              console.error('Error sending data:', error);
              alert('Failed to send data. Please try again.');
            }
          };
          


  return (  
    <div className="container mt-4 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="mb-4">Add Product</h2>
          <form onSubmit={SendProductData}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Product Name</label>
                <input 
                  type="text" 
                  name="product_name" 
                  value={formData.product_name} 
                  onChange={handleChange} 
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Category</label>
                <input 
                  type="text" 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Quantity</label>
                <input 
                  type="text" 
                  name="qty" 
                  value={formData.qty} 
                  onChange={handleChange} 
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Price</label>
                <input 
                  type="number" 
                  name="price" 
                  value={formData.price}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Unit of Measure (UoM)</label>
                <input 
                  type="text" 
                  name="uom" 
                  value={formData.uom}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Stock</label>
                <input 
                  type="number" 
                  name="stock" 
                  value={formData.stock}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Product Image</label>
                <input 
                  type="file" 
                  name="image"
                  onChange={setImgFile}
                  className="form-control"
                  accept="image/*"
                  required
                />
              </div>
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

export default Product
