import React from "react";

/**
 * Carousel component that displays a carousel of images with a search bar.
 * The carousel has a fade effect and contains three images.
 * The search bar is positioned on top of the carousel images.
 * The carousel also has previous and next buttons for navigation.
 */
const Carousel = () => {
  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      style={{ objectFit: "contain !important" }}
    >
      <div className="carousel-inner" id="carousel">
        <div className="carousel-caption" style={{ zIndex: "10" }}>
          {/* Search bar form */}
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success text-white bg-success"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
        {/* Carousel items */}
        <div className="carousel-item active">
          <img
            src="https://source.unsplash.com/random/900×700/?burger"
            className="d-block w-100"
            alt="..."
            style={{ filter: "brightness(30%)" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://source.unsplash.com/random/900×700/?pastry"
            className="d-block w-100"
            alt="..."
            style={{ filter: "brightness(30%)" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://source.unsplash.com/random/900×700/?barbeque"
            className="d-block w-100"
            alt="..."
            style={{ filter: "brightness(30%)" }}
          />
        </div>
      </div>
      {/* Carousel navigation buttons */}
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
  );
};

export default Carousel;

