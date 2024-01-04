import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { act, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Home from "../screens/Home.jsx";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// Mock Axios for API call
jest.mock("axios");

// Mock response for Axios
const mockResponse = {
  data: {
    data: {
      foodItems: [
        {
          _id: "1",
          name: "Burger",
          CategoryName: "Fast Food",
          options: [{ option: "default" }],
        },
      ],
      foodCategory: [
        {
          _id: "2",
          CategoryName: "Fast Food",
        },
      ],
    },
  },
};

beforeEach(() => {
  axios.get.mockResolvedValue(mockResponse);
});

describe("Home", () => {
  // Fetches food items and categories from server on mount
  it("should fetch food items and categories from server on mount", async () => {
    // Act
    render(
      <Router>
        <Home />
      </Router>
    );

    // Assert
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:3001/api/user/getAllFoodItems"
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Burger")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Fast Food")).toBeInTheDocument();
    });
  });

  // Filters food items based on search term
  it("should filter food items based on search term", async () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    // Act
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      userEvent.type(screen.getByRole("searchbox"), "Burger");
    });

    // Assert
    await waitFor(() => {
      expect(screen.getByText("Burger")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText("Pizza")).not.toBeInTheDocument();
    });
  });

  // Renders food categories and items
  it("should render food categories and items", async () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    // Assert
    await waitFor(() => {
      expect(screen.getByText("Fast Food")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Burger")).toBeInTheDocument();
    });
  });

  // Displays search bar in carousel
  it("should display search bar in carousel", async () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    // Assert
    await waitFor(() => {
      expect(screen.getByRole("searchbox")).toBeInTheDocument();
    });
  });
});
