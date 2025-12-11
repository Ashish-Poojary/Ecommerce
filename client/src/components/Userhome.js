import React, { useEffect, useState } from "react";
import axios from "axios";
import slider1 from "../images/slider1.png";
import slider2 from "../images/slider2.png";
import slider3 from "../images/slider3.jpg";

const Userhome = () => {
  const [ProductList, setProductList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [userName, setUserName] = useState("");

  useEffect(() => {
    getProducts();
    // Get user name from localStorage or fetch from server
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    } else {
      // If not in localStorage, fetch from server
      fetchUserName();
    }
  }, []);

  const fetchUserName = async () => {
    const uid = localStorage.getItem("u");
    if (uid) {
      try {
        const response = await axios.get(`http://localhost:3001/user/name/${uid}`);
        if (response.data && response.data.name) {
          setUserName(response.data.name);
          localStorage.setItem("userName", response.data.name);
        }
      } catch (error) {
        setUserName(uid);
      }
    }
  };

  const getProducts = async () => {
    try {
      const result = await axios.get("http://localhost:3001/productview");
      setProductList(result.data);
      } catch (error) {
        alert("Error loading products");
      }
  };

  const Addcart = (id) => {
    const uid = localStorage.getItem("u");
    axios.post(`http://localhost:3001/addcart/${id}/${uid}`)
      .then((response) => {
        alert("Added to Cart Successfully");
        window.location.reload();
      })
      .catch((error) => {
        alert("Failed to add to cart");
      });
  };

  // Filter products based on search query
  const filteredProducts = ProductList.filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="container-fluid bg-warning p-2">
        <h1 className="text-white text-center">Welcome: {userName || localStorage.getItem("u")}</h1>
      </div>

      {/* Image Slider */}
      <div className="container mt-3">
        <div id="slider" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#slider" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#slider" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#slider" data-bs-slide-to="2"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={slider1} alt="Slide 1" className="d-block w-100" />
            </div>
            <div className="carousel-item">
              <img src={slider2} alt="Slide 2" className="d-block w-100" />
            </div>
            <div className="carousel-item">
              <img src={slider3} alt="Slide 3" className="d-block w-100" />
            </div>
          </div>
          <button className="carousel-control-prev" data-bs-target="#slider" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" data-bs-target="#slider" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mt-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Products List */}
      <div className="container mt-4 mb-5">
        <h2 className="text-center mb-4">Our Products</h2>
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
                <div className="card h-100">
                  <div className="card-body text-center">
                    <img
                      src={`../upload/${product.image}`}
                      alt={product.product_name}
                      className="img-fluid mb-3"
                      style={{ maxHeight: "200px", objectFit: "contain" }}
                    />
                    <h5 className="card-title">{product.product_name}</h5>
                    <p className="card-text">
                      <strong className="text-danger fs-4">₹{parseFloat(product.price).toLocaleString('en-IN')}</strong>
                    </p>
                    <button className="btn btn-danger btn-sm" onClick={() => Addcart(product.id)}>
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

export default Userhome;