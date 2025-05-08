import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Spinner } from '../../../components/ui/Spinner';

describe('Spinner Component', () => {
  it('renders with default props', () => {
    const { container } = render(<Spinner />);
    const spinnerElement = container.firstChild as HTMLElement;
    
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveStyle({
      width: '24px',
      height: '24px',
      borderTopColor: '#BF5AF2',
    });
  });

  it('renders with custom size', () => {
    const { container } = render(<Spinner size={40} />);
    const spinnerElement = container.firstChild as HTMLElement;
    
    expect(spinnerElement).toHaveStyle({
      width: '40px',
      height: '40px',
    });
  });

  it('renders with custom color', () => {
    const { container } = render(<Spinner color="#FF5757" />);
    const spinnerElement = container.firstChild as HTMLElement;
    
    expect(spinnerElement).toHaveStyle({
      borderTopColor: '#FF5757',
    });
  });

  it('renders with custom thickness', () => {
    const { container } = render(<Spinner thickness={4} />);
    const spinnerElement = container.firstChild as HTMLElement;
    
    expect(spinnerElement).toHaveStyle({
      border: '4px solid rgba(255, 255, 255, 0.2)',
    });
  });

  it('applies custom className', () => {
    const { container } = render(<Spinner className="custom-spinner" />);
    const spinnerElement = container.firstChild as HTMLElement;
    
    expect(spinnerElement).toHaveClass('custom-spinner');
  });
}); 