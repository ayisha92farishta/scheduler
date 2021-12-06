/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Application from "components/Application";

//Wrapping all the tests inside a describe() function
describe("Appointment", () => {
  /*
  A test that renders a React Component
*/
  it.skip("renders without crashing", () => {
  render(<Application />);
});

//next test

})
