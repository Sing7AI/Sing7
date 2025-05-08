import React, { forwardRef } from 'react';
import styled from 'styled-components';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { 
      label, 
      error, 
      fullWidth = false, 
      className, 
      icon, 
      iconPosition = 'left',
      ...props 
    }, 
    ref
  ) => {
    return (
      <InputWrapper fullWidth={fullWidth} className={className}>
        {label && <Label>{label}</Label>}
        <InputContainer hasError={!!error}>
          {icon && iconPosition === 'left' && <IconWrapper position="left">{icon}</IconWrapper>}
          <StyledInput
            ref={ref}
            hasIcon={!!icon}
            iconPosition={icon ? iconPosition : undefined}
            hasError={!!error}
            {...props}
          />
          {icon && iconPosition === 'right' && <IconWrapper position="right">{icon}</IconWrapper>}
        </InputContainer>
        {error && <ErrorText>{error}</ErrorText>}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';

const InputWrapper = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
`;

const Label = styled.label`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.textSecondary};
`;

const InputContainer = styled.div<{ hasError?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid ${props => props.hasError 
    ? props.theme.colors.error 
    : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.small};
  background-color: ${props => props.theme.colors.background};
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${props => props.hasError 
      ? props.theme.colors.error 
      : props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.hasError 
      ? 'rgba(220, 53, 69, 0.2)' 
      : 'rgba(87, 185, 248, 0.2)'};
  }
`;

const StyledInput = styled.input<{ 
  hasError?: boolean; 
  hasIcon?: boolean;
  iconPosition?: 'left' | 'right';
}>`
  width: 100%;
  padding: 0.625rem;
  font-size: 1rem;
  border: none;
  background: transparent;
  color: ${props => props.theme.colors.text};
  outline: none;
  
  padding-left: ${props => (props.hasIcon && props.iconPosition === 'left' ? '2.5rem' : '0.625rem')};
  padding-right: ${props => (props.hasIcon && props.iconPosition === 'right' ? '2.5rem' : '0.625rem')};

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
    opacity: 0.7;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const IconWrapper = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.position === 'left' ? 'left: 0.75rem;' : 'right: 0.75rem;'}
  color: ${props => props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorText = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

export default Input;