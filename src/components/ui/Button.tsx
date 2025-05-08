import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface ButtonLinkProps extends ButtonBaseProps, React.HTMLProps<HTMLAnchorElement> {
  href: string;
  as?: string;
}

export interface ButtonButtonProps extends ButtonBaseProps, React.HTMLProps<HTMLButtonElement> {
  as?: string;
}

export type ButtonProps = ButtonButtonProps | ButtonLinkProps;

// Helper to determine if props are ButtonLinkProps
const isLinkProps = (props: ButtonProps): props is ButtonLinkProps => {
  return 'href' in props;
};

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>((props, ref) => {
  const {
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    className,
    children,
    ...rest
  } = props;

  const buttonStyles = {
    variant,
    size,
    fullWidth,
    className,
  };

  if (isLinkProps(props)) {
    const { href, ...linkRest } = props;
    return (
      <Link href={href} legacyBehavior passHref>
        <StyledAnchor ref={ref as React.Ref<HTMLAnchorElement>} {...buttonStyles} {...linkRest}>
          {children}
        </StyledAnchor>
      </Link>
    );
  }

  return (
    <StyledButton ref={ref as React.Ref<HTMLButtonElement>} {...buttonStyles} {...rest}>
      {children}
    </StyledButton>
  );
});

Button.displayName = 'Button';

// Shared button styles
const buttonStyles = ({ variant, size, fullWidth, theme }: ButtonBaseProps & { theme: any }) => `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.fonts.primary};
  font-weight: ${theme.fontWeights.medium};
  border-radius: ${theme.borderRadius.round};
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  border: none;
  outline: none;
  width: ${fullWidth ? '100%' : 'auto'};

  /* Size Styles */
  ${size === 'small' ? `
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  ` : size === 'large' ? `
    padding: 0.8rem 2rem;
    font-size: 1.1rem;
  ` : `
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
  `}

  /* Variant Styles */
  ${variant === 'secondary' ? `
    background-color: ${theme.colors.secondary};
    color: #0a0a1e;
    &:hover {
      background-color: #f0c240;
      transform: translateY(-2px);
    }
    &:active {
      transform: translateY(0);
    }
  ` : variant === 'outline' ? `
    background-color: transparent;
    color: ${theme.colors.primary};
    border: 2px solid ${theme.colors.primary};
    &:hover {
      background-color: rgba(87, 185, 248, 0.1);
      transform: translateY(-2px);
    }
    &:active {
      transform: translateY(0);
    }
  ` : variant === 'text' ? `
    background-color: transparent;
    color: ${theme.colors.primary};
    padding: 0.4rem 0.6rem;
    &:hover {
      text-decoration: underline;
    }
  ` : `
    background-color: ${theme.colors.primary};
    color: white;
    &:hover {
      background-color: #3a9fe7;
      transform: translateY(-2px);
    }
    &:active {
      transform: translateY(0);
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const StyledButton = styled.button<ButtonBaseProps & { theme: any }>`
  ${buttonStyles}
`;

const StyledAnchor = styled.a<ButtonBaseProps & { theme: any }>`
  ${buttonStyles}
`;

export default Button;
