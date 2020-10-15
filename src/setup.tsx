import React from "react";
import { render } from "react-dom";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

import Camera from "./GameboyCamera";

const app = document.getElementById("app");

const Root = () => {
  return (
    <StyledContainer>
      <Camera />
    </StyledContainer>
  );
};

render(<Root />, app);
