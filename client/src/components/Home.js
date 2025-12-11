import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import axios from 'axios';

import slider1 from "../images/slider1.png";
import slider2 from "../images/slider2.png";
import slider3 from "../images/slider3.jpg";

const Home = () => {
  const [ProductList, setProductList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();  // Initialize navigate function

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const result = await axios.get("http://localhost:3001/productview");
      setProductList(result.data);
    } catch (error) {
      alert("Error loading products");
    }
  };

  const filteredProducts = ProductList.filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Redirect to login when "Add to Cart" is clicked
  const handleAddToCart = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="container mt-4 mb-4">
        <div className="row">
          <div id="slider" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#slider" data-bs-slide-to="0" className="active"></button>
              <button type="button" data-bs-target="#slider" data-bs-slide-to="1"></button>
              <button type="button" data-bs-target="#slider" data-bs-slide-to="2"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={slider1} alt="Slide 1" className="d-block w-100" style={{ maxHeight: "400px", objectFit: "cover" }} />
              </div>
              <div className="carousel-item">
                <img src={slider2} alt="Slide 2" className="d-block w-100" style={{ maxHeight: "400px", objectFit: "cover" }} />
              </div>
              <div className="carousel-item">
                <img src={slider3} alt="Slide 3" className="d-block w-100" style={{ maxHeight: "400px", objectFit: "cover" }} />
              </div>
            </div>
            <button type="button" className="carousel-control-prev" data-bs-target="#slider" data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button type="button" className="carousel-control-next" data-bs-target="#slider" data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-4 mb-5">
        <div className="row">
          <div className="col-12 mb-4">
            <h2 className="text-center mb-3">Products</h2>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            filteredProducts.map((data) => (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={data.id}>
                <div className="card h-100">
                  <div className="card-body text-center">
                    <img
                      src={`../upload/${data.image}`}
                      alt={data.product_name}
                      className="img-fluid mb-3"
                      style={{ maxHeight: "200px", objectFit: "contain" }}
                    />
                    <h5 className="card-title">{data.product_name}</h5>
                    <p className="card-text">
                      <strong className="text-danger fs-4">₹{parseFloat(data.price).toLocaleString('en-IN')}</strong>
                    </p>
                    <button className="btn btn-danger btn-sm" onClick={handleAddToCart}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center text-muted mt-4">No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
