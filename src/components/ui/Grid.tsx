import React from 'react';
import styled from 'styled-components';

type GridSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type GridJustify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
type GridAlign = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

// Container Props
export interface GridContainerProps {
  children?: React.ReactNode;
  spacing?: GridSpacing;
  justifyContent?: GridJustify;
  alignItems?: GridAlign;
  direction?: GridDirection;
  wrap?: GridWrap;
  className?: string;
  fullWidth?: boolean;
}

// Item Props
export interface GridItemProps {
  children?: React.ReactNode;
  xs?: number | 'auto';
  sm?: number | 'auto';
  md?: number | 'auto';
  lg?: number | 'auto';
  xl?: number | 'auto';
  className?: string;
}

const getSpacingValue = (spacing: GridSpacing) => {
  return `${spacing * 0.5}rem`;
};

const GridContainer: React.FC<GridContainerProps> = ({
  children,
  spacing = 2,
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  direction = 'row',
  wrap = 'wrap',
  className,
  fullWidth = false,
  ...rest
}) => {
  return (
    <StyledGridContainer
      className={className}
      spacing={spacing}
      justifyContent={justifyContent}
      alignItems={alignItems}
      direction={direction}
      wrap={wrap}
      fullWidth={fullWidth}
      {...rest}
    >
      {children}
    </StyledGridContainer>
  );
};

const GridItem: React.FC<GridItemProps> = ({
  children,
  xs,
  sm,
  md,
  lg,
  xl,
  className,
  ...rest
}) => {
  return (
    <StyledGridItem
      className={className}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      {...rest}
    >
      {children}
    </StyledGridItem>
  );
};

const StyledGridContainer = styled.div<GridContainerProps>`
  display: flex;
  flex-wrap: ${props => props.wrap};
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  box-sizing: border-box;
  
  margin: -${props => getSpacingValue(props.spacing || 0)};
  
  & > * {
    padding: ${props => getSpacingValue(props.spacing || 0)};
  }
`;

const getWidthString = (width: number | 'auto') => {
  if (width === 'auto') return 'auto';
  return width === 12 ? '100%' : `${(width / 12) * 100}%`;
};

const StyledGridItem = styled.div<GridItemProps>`
  box-sizing: border-box;
  
  ${props => props.xs && `
    flex-basis: ${getWidthString(props.xs)};
    max-width: ${props.xs === 'auto' ? 'none' : getWidthString(props.xs)};
  `}
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    ${props => props.sm && `
      flex-basis: ${getWidthString(props.sm)};
      max-width: ${props.sm === 'auto' ? 'none' : getWidthString(props.sm)};
    `}
  }
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    ${props => props.md && `
      flex-basis: ${getWidthString(props.md)};
      max-width: ${props.md === 'auto' ? 'none' : getWidthString(props.md)};
    `}
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    ${props => props.lg && `
      flex-basis: ${getWidthString(props.lg)};
      max-width: ${props.lg === 'auto' ? 'none' : getWidthString(props.lg)};
    `}
  }
  
  @media (min-width: ${props => props.theme.breakpoints.xl}) {
    ${props => props.xl && `
      flex-basis: ${getWidthString(props.xl)};
      max-width: ${props.xl === 'auto' ? 'none' : getWidthString(props.xl)};
    `}
  }
`;

// For convenience
const Grid = {
  Container: GridContainer,
  Item: GridItem,
};

export { GridContainer, GridItem };
export default Grid; 