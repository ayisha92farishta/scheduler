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
  In case of skipping --> xit or test.skip
*/

  it("renders without crashing", () => {
  render(<Application />);
});

//next test

})

describe("Mock-function", () => {
  it("doesn't call the function", () => {
    const fn = jest.fn();
    expect(fn).toHaveBeenCalledTimes(0);
  })
  it("calls the function", () => {
    const fn = jest.fn();
    fn()
    expect(fn).toHaveBeenCalledTimes(1);
  })

  it("calls the function with specific arguments", () => {
    const fn = jest.fn();
    fn(10);
    expect(fn).toHaveBeenCalledWith(10);
   });

   it("uses the mock implementation", () => {
    const fn = jest.fn((a, b) => a*b);
    fn(2, 2);
    expect(fn).toHaveReturnedWith(4);
   });
  

})
