import React from 'react';
import styled from 'styled-components';

type TypographyVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'h6' 
  | 'subtitle1' 
  | 'subtitle2' 
  | 'body1' 
  | 'body2' 
  | 'caption' 
  | 'overline';

interface TypographyProps {
  variant?: TypographyVariant;
  component?: React.ElementType;
  color?: 'inherit' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error';
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  noMargin?: boolean;
  gutterBottom?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  component,
  color = 'textPrimary',
  align = 'inherit',
  noMargin = false,
  gutterBottom = false,
  className,
  children,
  ...rest
}) => {
  const Component = getComponent(variant, component);
  
  return (
    <Component
      className={className}
      variant={variant}
      color={color}
      align={align}
      noMargin={noMargin}
      gutterBottom={gutterBottom}
      {...rest}
    >
      {children}
    </Component>
  );
};

const getComponent = (variant: TypographyVariant, component?: React.ElementType): React.ElementType => {
  if (component) return component;
  
  switch (variant) {
    case 'h1':
      return StyledH1;
    case 'h2':
      return StyledH2;
    case 'h3':
      return StyledH3;
    case 'h4':
      return StyledH4;
    case 'h5':
      return StyledH5;
    case 'h6':
      return StyledH6;
    case 'subtitle1':
      return StyledSubtitle1;
    case 'subtitle2':
      return StyledSubtitle2;
    case 'body1':
      return StyledBody1;
    case 'body2':
      return StyledBody2;
    case 'caption':
      return StyledCaption;
    case 'overline':
      return StyledOverline;
    default:
      return StyledBody1;
  }
};

interface StyledTypographyProps {
  color: TypographyProps['color'];
  align: TypographyProps['align'];
  noMargin: boolean;
  gutterBottom: boolean;
}

const baseStyles = (props: StyledTypographyProps) => `
  margin: ${props.noMargin ? '0' : props.gutterBottom ? '0 0 0.35em' : '0'};
  text-align: ${props.align === 'inherit' ? 'inherit' : props.align};
  color: ${getColor(props.color, props.theme)};
  font-family: ${props.theme.fonts.primary};
`;

const getColor = (color: TypographyProps['color'], theme: any) => {
  switch (color) {
    case 'primary':
      return theme.colors.primary;
    case 'secondary':
      return theme.colors.secondary;
    case 'textPrimary':
      return theme.colors.text;
    case 'textSecondary':
      return theme.colors.textSecondary;
    case 'error':
      return theme.colors.error;
    case 'inherit':
    default:
      return 'inherit';
  }
};

const StyledH1 = styled.h1<StyledTypographyProps>`
  ${baseStyles}
  font-size: 2.5rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  line-height: 1.2;
`;

const StyledH2 = styled.h2<StyledTypographyProps>`
  ${baseStyles}
  font-size: 2rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  line-height: 1.2;
`;

const StyledH3 = styled.h3<StyledTypographyProps>`
  ${baseStyles}
  font-size: 1.75rem;
  font-weight: ${props => props.theme.fontWeights.semiBold};
  line-height: 1.2;
`;

const StyledH4 = styled.h4<StyledTypographyProps>`
  ${baseStyles}
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontWeights.semiBold};
  line-height: 1.2;
`;

const StyledH5 = styled.h5<StyledTypographyProps>`
  ${baseStyles}
  font-size: 1.25rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  line-height: 1.2;
`;

const StyledH6 = styled.h6<StyledTypographyProps>`
  ${baseStyles}
  font-size: 1.125rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  line-height: 1.2;
`;

const StyledSubtitle1 = styled.h6<StyledTypographyProps>`
  ${baseStyles}
  font-size: 1rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  line-height: 1.5;
`;

const StyledSubtitle2 = styled.h6<StyledTypographyProps>`
  ${baseStyles}
  font-size: 0.875rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  line-height: 1.5;
`;

const StyledBody1 = styled.p<StyledTypographyProps>`
  ${baseStyles}
  font-size: 1rem;
  font-weight: ${props => props.theme.fontWeights.regular};
  line-height: 1.5;
`;

const StyledBody2 = styled.p<StyledTypographyProps>`
  ${baseStyles}
  font-size: 0.875rem;
  font-weight: ${props => props.theme.fontWeights.regular};
  line-height: 1.5;
`;

const StyledCaption = styled.span<StyledTypographyProps>`
  ${baseStyles}
  font-size: 0.75rem;
  font-weight: ${props => props.theme.fontWeights.regular};
  line-height: 1.5;
`;

const StyledOverline = styled.span<StyledTypographyProps>`
  ${baseStyles}
  font-size: 0.75rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  line-height: 1.5;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

// Export individual components for direct use
export const H1 = (props: Omit<TypographyProps, 'variant'>) => <Typography variant="h1" {...props} />;
export const H2 = (props: Omit<TypographyProps, 'variant'>) => <Typography variant="h2" {...props} />;
export const H3 = (props: Omit<TypographyProps, 'variant'>) => <Typography variant="h3" {...props} />;
export const H4 = (props: Omit<TypographyProps, 'variant'>) => <Typography variant="h4" {...props} />;
export const H5 = (props: Omit<TypographyProps, 'variant'>) => <Typography variant="h5" {...props} />;
export const H6 = (props: Omit<TypographyProps, 'variant'>) => <Typography variant="h6" {...props} />;
export const Subtitle1 = (props: Omit<TypographyProps, 'variant'>) => <Typography variant="subtitle1" {...props} />;
export const Subtitle2 = (props: Omit<TypographyProps, 'variant'>) => <Typography variant="subtitle2" {...props} />;
export const Body1 = (props: Omit<TypographyProps, 'variant'>) => <Typography variant="body1" {...props} />;
export const Body2 = (props: Omit<TypographyProps, 'variant'>) => <Typography variant="body2" {...props} />;
export const Caption = (props: Omit<TypographyProps, 'variant'>) => <Typography variant="caption" {...props} />;
export const Overline = (props: Omit<TypographyProps, 'variant'>) => <Typography variant="overline" {...props} />;

export default Typography; 