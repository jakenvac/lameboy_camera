import React from 'react';
import { render } from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import ReactGa from 'react-ga';
import Camera from './GameboyCamera';

const StyledContainer = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const StyledFooter = styled.footer`
  font-family: nunito, sans-serif;
  color: #ccc;
  text-align: center;
  font-size: 0.8rem;

  a {
    color: #ccc;
    &:visited {
      color: #ccc;
    }
    &:hover,
    &:active {
      cursor: pointer;
      color: white;
    }
  }
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
    font-family: Nunito, sans-serif;
  }
`;

const app = document.getElementById('app');

const Root = () => {
  ReactGa.initialize('UA-181467663-1');
  ReactGa.pageview('home');

  return (
    <StyledContainer>
      <img
        alt="Clicky"
        width="1"
        height="1"
        src="//in.getclicky.com/101284784ns.gif"
      />
      <GlobalCSS />
      <Camera />
      <StyledFooter>
        &copy; jakenvac {new Date().getFullYear()} |{' '}
        <a href="https://github.com/jakehl/lameboy_camera">github</a>
      </StyledFooter>
    </StyledContainer>
  );
};

render(<Root />, app);
