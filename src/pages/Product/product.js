import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../component/Header/header";
import Footer from "../../component/Footer/footer";
import Gototop from "../../component/GoToTop/gototop";
import Sidebar from "../../component/Sidebar/sidebar";
import "./product_styles.css";

export default function Product() {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("userData"));
    const { product } = location.state || {};
    return (
        <div>
            <Header firstName={user.firstName} lastName={user.lastName}/>
            <div className="dashboard-container">
                <Sidebar />
                <div className="container">
                    <img
                        className="card-poster flex"
                        src={product.image} ></img>
                    {product ? (
                        <div className="card-body">
                            <h5 class="card-title">{product.title}</h5>
                            <p class="card-description">{product.description} </p>
                            <p class="card-genre">{product.genre} </p>
                            <p class="card-rating">⭐{product.rating} </p>
                            <p class="card-text">{product.year} </p>
                            <button className="download-btn">Watch now</button>
                        </div>) : (
                        <p>No product data found.</p>
                    )}

                </div>
            </div>
            <Gototop />
            <Footer />
        </div>
    );

};