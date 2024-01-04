import React, { useEffect, useState } from "react";
import { Card, Footer, Navbar } from "../components";
import axios from "axios";

/**
 * Home component that displays the food items and categories.
 * It provides functionality to search for food items.
 * The food items and categories are fetched from the server.
 */
const Home = () => {
  // State to manage the food items and categories
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  // State to manage the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Function to fetch the food items and categories from the server
  const itemData = async () => {
    try {
      const response = await axios.get(
        "https://xomatobackend.onrender.com/api/user/getAllFoodItems"
      );
      if (response.data.data) {
        setFoodItems(response.data.data.foodItems);
        setFoodCategory(response.data.data.foodCategory);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch the food items and categories when the component mounts
  useEffect(() => {
    itemData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Navbar component */}
      <Navbar />

      {/* Carousel and Search Bar */}
      <div
        style={{ objectFit: "contain", height: "600px", overflow: "hidden" }}
      >
        {/* Carousel component */}
        <div id="carouselExampleFade" className="carousel slide carousel-fade">
          <div className="carousel-inner" id="carousel">
            {/* Search bar in side carousel component*/}
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center" role="search">
                <input
                  className="form-control me-2 w-75"
                  type="search"
                  placeholder="Search in here..."
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item object-fit-none active">
              <img
                src="https://source.unsplash.com/random/900×700/?burger"
                className="d-block w-100 h-25"
                alt="..."
                style={{ filter: "brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900×700/?pastry"
                className="d-block w-100 h-25"
                alt="..."
                style={{ filter: "brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900×700/?barbeque"
                className="d-block w-100 h-25"
                alt="..."
                style={{ filter: "brightness(30%)" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Food Categories and Items */}
      <div className="container">
        {foodCategory.length > 0 &&
          foodCategory.map((data) => {
            return (
              <div className="row mb-3" key={data._id}>
                <div className="m-3 fs-3">{data.CategoryName}</div>
                <hr />
                {foodItems.length > 0 &&
                  foodItems
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name
                          .toLowerCase()
                          .includes(searchTerm.toLocaleLowerCase())
                    )
                    .map((filterItem) => {
                      return (
                        <div
                          className="col-12 col-md-6 col-lg-3"
                          key={filterItem._id}
                        >
                          <Card
                            foodItem={filterItem}
                            options={filterItem.options[0]}
                          />
                        </div>
                      );
                    })}
              </div>
            );
          })}
      </div>

      {/* Footer component */}
      <Footer />
    </>
  );
};

export default Home;
