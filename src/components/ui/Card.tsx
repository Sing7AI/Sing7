import React from 'react';
import styled from 'styled-components';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevation?: 'flat' | 'low' | 'medium' | 'high';
  padding?: 'none' | 'small' | 'medium' | 'large';
  border?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  elevation = 'low',
  padding = 'medium',
  border = false,
  fullWidth = false,
  onClick,
  ...rest
}) => {
  return (
    <StyledCard
      className={className}
      elevation={elevation}
      padding={padding}
      border={border}
      fullWidth={fullWidth}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledCard>
  );
};

const getElevationStyles = (elevation: CardProps['elevation'], theme: any) => {
  switch (elevation) {
    case 'flat':
      return 'box-shadow: none;';
    case 'low':
      return `box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);`;
    case 'medium':
      return `box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);`;
    case 'high':
      return `box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);`;
    default:
      return `box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);`;
  }
};

const getPaddingStyles = (padding: CardProps['padding']) => {
  switch (padding) {
    case 'none':
      return '0';
    case 'small':
      return '0.75rem';
    case 'large':
      return '2rem';
    case 'medium':
    default:
      return '1.5rem';
  }
};

const StyledCard = styled.div<Omit<CardProps, 'children'>>`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ padding }) => getPaddingStyles(padding)};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  ${({ elevation, theme }) => getElevationStyles(elevation, theme)}
  ${({ border, theme }) => border && `border: 1px solid ${theme.colors.border};`}
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  ${({ onClick }) =>
    onClick &&
    `
    cursor: pointer;
    &:hover {
      transform: translateY(-2px);
    }
  `}
`;

export default Card; 