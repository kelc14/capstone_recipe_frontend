import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

/**  SMOKE TEST */
it("renders without crashing", function () {
  render(
    <MemoryRouter>
      {" "}
      <App />
    </MemoryRouter>
  );
});

/**  SNAPSHOT TEST */
it("renders without crashing", function () {
  const { asFragment } = render(
    <MemoryRouter>
      {" "}
      <App />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

/** IF WE CLICK ON LOGIN, IT BRINGS US TO LOGIN PAGE */

describe("logging in works", () => {
  it("goes to login page when clicked in navbar", () => {
    const { getByText, getAllByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // sign up btn should be present, as well as login button
    expect(getByText("Sign Up")).toBeInTheDocument();
    const loginLink = getAllByText("Log in");
    // console.log(loginLink);
    fireEvent.click(loginLink[1]);
    expect(getByText("Username:")).toBeInTheDocument();
    expect(getByText("Password:")).toBeInTheDocument();
  });
});
