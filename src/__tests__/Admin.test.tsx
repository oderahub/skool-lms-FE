// import { describe, it, expect } from "vitest";
// import { render, screen, fireEvent } from "@testing-library/react";
// import { vi } from "vitest";
// import LandingPage from "../pages/LandingPage/LandingPage";

// // Mock useNavigate from react-router-dom
// const mockedUseNavigate = vi.fn();
// vi.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"), // Use actual implementation for other components
//   useNavigate: () => mockedUseNavigate,
// }));

// describe("LandingPage", () => {
//   it("allows admin login with correct email", async () => {
//     // Render the component
//     render(<LandingPage />);

//     // Fill out the form with admin email
//     fireEvent.change(screen.getByLabelText(/email address/i), {
//       target: { value: "Admin@gmail.com" },
//     });
//     fireEvent.change(screen.getByLabelText(/password/i), {
//       target: { value: "password123" },
//     });

//     // Submit the form
//     fireEvent.click(screen.getByText(/login/i));

//     // Check if useNavigate is called
//     expect(mockedUseNavigate).toBeCalled();

//     // Optionally, restore the mock to ensure it doesn't affect other tests
//     mockedUseNavigate.mockRestore();
//   });
// });

// describe("Test", () => {
//   it("testing vitest", () => {
//     expect(true).toBeTruthy();
//   });
// });
// import React from "react";
// import { describe, it, expect, vi } from "vitest";
// import { render, screen, fireEvent } from "@testing-library/react";
// import LandingPage from "../pages/LandingPage/LandingPage";
// import * as ReactRouterDom from "react-router-dom";

// describe("Test", () => {
//   it("testing vitest", () => {
//     expect(true).toBeTruthy();
//   });
// });

// const mockedUseNavigate = vi.fn();
// vi.mock("react-router-dom", () => ({
//   ...ReactRouterDom, // Use actual implementation for other components
//   useNavigate: () => mockedUseNavigate,
// }));

// describe("LandingPage", () => {
//   it("allows admin login with correct email", async () => {
//     // Render the component
//     render(<LandingPage />);

//     // Fill out the form with admin email
//     fireEvent.change(screen.getByLabelText(/email address/i), {
//       target: { value: "admin@gmail.com" },
//     });
//     fireEvent.change(screen.getByLabelText(/password/i), {
//       target: { value: "123456" },
//     });

//     // Submit the form
//     fireEvent.click(screen.getByText(/login/i));

//     // Check if useNavigate is called
//     expect(mockedUseNavigate).toBeCalled();

//     // Optionally, restore the mock to ensure it doesn't affect other tests
//     mockedUseNavigate.mockRestore();
//   });
// });
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LandingPage from "../pages/LandingPage/LandingPage";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter to wrap the component

describe("LandingPage", () => {
  it("allows admin login with correct email", async () => {
    // Mock useNavigate from react-router-dom
    const mockedUseNavigate = vi.fn();
    vi.mock("react-router-dom", () => ({
      ...require("react-router-dom"),
      useNavigate: () => mockedUseNavigate,
    }));

    // Render the component wrapped in BrowserRouter
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    // Fill out the form with admin email
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "admin@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123456" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/login/i));

    // Check if useNavigate is called
    expect(mockedUseNavigate).toBeCalled();

    // Optionally, restore the mock to ensure it doesn't affect other tests
    mockedUseNavigate.mockRestore();
  });
});
