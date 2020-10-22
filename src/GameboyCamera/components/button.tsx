import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const StyledButton = styled.button<{ color?: string }>`
  border: 2px solid #ffcc00;
  background: ${(p) => p.color ?? "#ffcc00"};
  color: black;
  border-radius: 2rem;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0.5rem;
  transition: background-color 300ms, color 300ms;
  &:hover {
    @media (hover: hover) and (pointer: fine) {
      background: black;
      color: ${(p) => p.color ?? "#ffcc00"};
      cursor: pointer;
    }
  }
  &:active {
    background: black;
    color: ${(p) => p.color ?? "#ffcc00"};
    cursor: pointer;
  }
`;

type LameButtonProps = {
  children?: ReactNode;
  color?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

const LameButton: FC<LameButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

const StyledShutterButton = styled(StyledButton)`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 100%;
  path {
    color: black;
  }
  &:hover {
    @media (hover: hover) and (pointer: fine) {
      background: black;
      path {
        color: #ffcc00;
      }
      cursor: pointer;
    }
  }
  &:active {
    background: black;
    path {
      color: #ffcc00;
    }
    cursor: pointer;
  }
`;

const LameShutterButton: FC<LameButtonProps> = ({ ...props }) => {
  return (
    <StyledShutterButton {...props}>
      <FontAwesomeIcon color="black" size={"2x"} icon={faCamera} />
    </StyledShutterButton>
  );
};

export { LameButton, LameShutterButton };
