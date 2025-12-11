import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ProductView = () => {
    const [ProductData, setProductData] = useState([]) 
    useEffect(()=>{ getProduct() 
    }, [])

    const DelProduct = id =>{
        axios.delete( `http://localhost:3001/delproduct/${id}`)
        .then(Response=>{
            alert("Deleted Succesfully")
            getProduct()
        })
    }

    const getProduct= async() => {
        try{
            const result= await axios.get("http://localhost:3001/productview") 
            setProductData(result.data) 
        }
    catch(error){
        console.error("Error fetching products",error)
    }
}
  return (
    <div className="container mt-4 mb-5">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Product Details</h2>
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>UoM</th>
                  <th>Image</th>
                  <th>Stock</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {ProductData.length > 0 ? (
                  ProductData.map((data, index) => (
                    <tr key={data.id}>
                      <td>{index + 1}</td>
                      <td>{data.product_name}</td>
                      <td>{data.category}</td>
                      <td>{data.qty}</td>
                      <td>₹{parseFloat(data.price || 0).toLocaleString('en-IN')}</td>
                      <td>{data.uom}</td>
                      <td>
                        <img 
                          src={`../upload/${data.image}`} 
                          alt={data.product_name} 
                          className="img-thumbnail" 
                          style={{ maxWidth: "80px", maxHeight: "80px", objectFit: "cover" }}
                        />
                      </td>
                      <td>{data.stock}</td>
                      <td className="text-center">
                        <button 
                          className="btn btn-danger btn-sm" 
                          onClick={() => DelProduct(data.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center text-muted">No products found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )}
export default ProductView