import React from 'react';
import styled, { keyframes } from 'styled-components';

interface SpinnerProps {
  size?: number;
  color?: string;
  thickness?: number;
  className?: string;
}

export const Spinner = ({
  size = 24,
  color = '#9c7af7',
  thickness = 2,
  className
}: SpinnerProps): JSX.Element => {
  return (
    <SpinnerContainer 
      size={size} 
      color={color} 
      thickness={thickness}
      className={className}
    />
  );
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

interface SpinnerContainerProps {
  size: number;
  color: string;
  thickness: number;
}

const SpinnerContainer = styled.div<SpinnerContainerProps>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  border: ${(props) => `${props.thickness}px solid rgba(255, 255, 255, 0.2)`};
  border-top-color: ${(props) => props.color};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export default Spinner; 