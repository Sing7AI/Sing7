import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps) => {
  return (
    <HeaderContainer className={className}>
      <Logo href="/">
        <span>Sing7</span>
      </Logo>
      <NavLinks>
        <NavLink href="/studio">Studio</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/docs">Docs</NavLink>
      </NavLinks>
      <ButtonContainer>
        <ActionButton href="/studio">Start Creating</ActionButton>
      </ButtonContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: rgba(10, 10, 30, 0.8);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  
  span {
    background: linear-gradient(90deg, #9c7af7 0%, #57b9f8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #c2c2e9;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #9c7af7;
  }
`;

const ButtonContainer = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const ActionButton = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: linear-gradient(90deg, #9c7af7 0%, #57b9f8 100%);
  color: white;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(156, 122, 247, 0.3);
  }
`;

export default Header; 