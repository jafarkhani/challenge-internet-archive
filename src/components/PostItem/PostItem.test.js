import React from "react";
import ReactDOM from 'react-dom';
import {MemoryRouter } from 'react-router-dom';
import {render, cleanup, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";

import PostItem from "./PostItem";

afterEach(cleanup);

describe("PostItem", ()=> {

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <PostItem />
      </MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
//......................................................

  it("renders correctly", () => {
    const {getByTestId} = render(
      <MemoryRouter>
        <PostItem />
      </MemoryRouter>  
    );
    expect(getByTestId("loading")).toBeTruthy();
  });
  //......................................................

  it("load identifier data", async () => {

    jest.spyOn(global, "fetch").mockImplementation(() =>    
      Promise.resolve({      
        json: () => Promise.resolve({
          metadata : [],
          files : [],
          reviews : []
        })    
      })  
    );
    await act(async () => {      
      render(
        <MemoryRouter>
        <PostItem identifier="test"/>
      </MemoryRouter>);
    });

    expect(screen.getByTestId("post-video")).toBeTruthy();
    
  });
  //......................................................

  it("error on load identifier data", async () => {

    jest.spyOn(global, "fetch").mockImplementation(() =>    
      Promise.resolve({      
        json: () => Promise.resolve({})    
      })  
    );

    await act(async () => {      
      render(
        <MemoryRouter>
        <PostItem identifier="test"/>
      </MemoryRouter>);
    });

    expect(screen.getByTestId("error")).toBeTruthy();
    
  });
  //......................................................
})


