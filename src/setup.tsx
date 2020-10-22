import React from "react";
import { render } from "react-dom";
import styled, { createGlobalStyle } from "styled-components";

const StyledContainer = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const GlobalCSS = createGlobalStyle`
  :root {
    font-size: 18px;
  }
  body {
    background: black;//#ffcc00;
    margin: 0;
  }
  * {
    box-sizing: border-box;
    color: white;
    font-family: Nunito, sans-serif;
  }
`;

import Camera from "./GameboyCamera";

const app = document.getElementById("app");

const Root = () => {
  return (
    <StyledContainer>
      <GlobalCSS />
      <Camera />
    </StyledContainer>
  );
};

render(<Root />, app);
