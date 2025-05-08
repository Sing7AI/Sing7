import React from 'react';
import styled from 'styled-components';

export type AlertSeverity = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  severity?: AlertSeverity;
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
  variant?: 'filled' | 'outlined' | 'standard';
}

const Alert: React.FC<AlertProps> = ({
  severity = 'info',
  title,
  children,
  onClose,
  className,
  variant = 'standard',
  ...rest
}) => {
  return (
    <StyledAlert 
      className={className} 
      severity={severity} 
      variant={variant}
      {...rest}
    >
      {getIcon(severity)}
      <AlertContent>
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertMessage>{children}</AlertMessage>
      </AlertContent>
      {onClose && (
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      )}
    </StyledAlert>
  );
};

const getIcon = (severity: AlertSeverity) => {
  switch (severity) {
    case 'info':
      return <InfoIcon />;
    case 'success':
      return <SuccessIcon />;
    case 'warning':
      return <WarningIcon />;
    case 'error':
      return <ErrorIcon />;
    default:
      return <InfoIcon />;
  }
};

const InfoIcon = () => (
  <AlertIcon>
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  </AlertIcon>
);

const SuccessIcon = () => (
  <AlertIcon>
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  </AlertIcon>
);

const WarningIcon = () => (
  <AlertIcon>
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </svg>
  </AlertIcon>
);

const ErrorIcon = () => (
  <AlertIcon>
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  </AlertIcon>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const getBackgroundColor = (severity: AlertSeverity, variant: AlertProps['variant'], theme: any) => {
  if (variant === 'filled') {
    switch (severity) {
      case 'info':
        return theme.colors.primary;
      case 'success':
        return theme.colors.success;
      case 'warning':
        return theme.colors.warning;
      case 'error':
        return theme.colors.error;
      default:
        return theme.colors.primary;
    }
  }
  
  if (variant === 'outlined') {
    return 'transparent';
  }
  
  // standard variant
  switch (severity) {
    case 'info':
      return `rgba(87, 185, 248, 0.1)`;
    case 'success':
      return `rgba(72, 187, 120, 0.1)`;
    case 'warning':
      return `rgba(246, 173, 85, 0.1)`;
    case 'error':
      return `rgba(220, 53, 69, 0.1)`;
    default:
      return `rgba(87, 185, 248, 0.1)`;
  }
};

const getColor = (severity: AlertSeverity, variant: AlertProps['variant'], theme: any) => {
  if (variant === 'filled') {
    return '#ffffff';
  }
  
  switch (severity) {
    case 'info':
      return theme.colors.primary;
    case 'success':
      return theme.colors.success;
    case 'warning':
      return theme.colors.warning;
    case 'error':
      return theme.colors.error;
    default:
      return theme.colors.primary;
  }
};

const getBorderColor = (severity: AlertSeverity, variant: AlertProps['variant'], theme: any) => {
  if (variant !== 'outlined') {
    return 'transparent';
  }
  
  switch (severity) {
    case 'info':
      return theme.colors.primary;
    case 'success':
      return theme.colors.success;
    case 'warning':
      return theme.colors.warning;
    case 'error':
      return theme.colors.error;
    default:
      return theme.colors.primary;
  }
};

const StyledAlert = styled.div<Omit<AlertProps, 'children' | 'title' | 'onClose'>>`
  display: flex;
  align-items: flex-start;
  padding: 12px 16px;
  border-radius: ${props => props.theme.borderRadius.small};
  margin-bottom: 1rem;
  background-color: ${props => getBackgroundColor(props.severity || 'info', props.variant, props.theme)};
  color: ${props => getColor(props.severity || 'info', props.variant, props.theme)};
  border: 1px solid ${props => getBorderColor(props.severity || 'info', props.variant, props.theme)};
`;

const AlertIcon = styled.span`
  display: flex;
  align-items: center;
  padding-right: 12px;
  margin-top: 2px;
`;

const AlertContent = styled.div`
  flex: 1;
  padding: 0;
`;

const AlertTitle = styled.div`
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: 4px;
`;

const AlertMessage = styled.div`
  font-size: 0.875rem;
`;

const CloseButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
  margin-left: 8px;
  color: inherit;
  display: flex;
  align-items: center;
  opacity: 0.8;
  
  &:hover {
    opacity: 1;
  }
`;

export default Alert; 