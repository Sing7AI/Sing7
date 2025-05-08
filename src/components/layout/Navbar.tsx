import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <NavbarContainer>
      <NavbarContent>
        <LogoContainer>
          <Link href="/" passHref>
            <Logo>
              <svg width="120" height="48" viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <style>
                  {`
                    .title-text { font: bold 72px 'Arial', sans-serif; }
                    .blue { fill: #57b9f8; }
                    .yellow { fill: #f8ce57; }
                    .headphones { fill: #2a2a2a; }
                  `}
                </style>
                <path className="headphones" d="M250,50 C200,50 160,90 160,140 L160,160 C160,170 170,180 180,180 L190,180 C200,180 210,170 210,160 L210,140 C210,130 200,120 190,120 L180,120 L180,100 C180,80 210,60 250,60 C290,60 320,80 320,100 L320,120 L310,120 C300,120 290,130 290,140 L290,160 C290,170 300,180 310,180 L320,180 C330,180 340,170 340,160 L340,140 C340,90 300,50 250,50 Z"/>
                <text x="100" y="130" className="title-text blue">Sing</text>
                <text x="290" y="130" className="title-text yellow">7</text>
              </svg>
            </Logo>
          </Link>
        </LogoContainer>

        <NavLinks mobileMenuOpen={mobileMenuOpen}>
          <NavLink active={router.pathname === '/'}>
            <Link href="/" passHref>Home</Link>
          </NavLink>
          <NavLink active={router.pathname === '/studio'}>
            <Link href="/studio" passHref>Studio</Link>
          </NavLink>
          <NavLink active={router.pathname.startsWith('/marketplace')}>
            <Link href="/marketplace" passHref>Marketplace</Link>
          </NavLink>
          <NavLink active={router.pathname === '/brand'}>
            <Link href="/brand" passHref>Brand</Link>
          </NavLink>
          <NavLink active={router.pathname === '/docs'}>
            <Link href="/docs" passHref>Docs</Link>
          </NavLink>
        </NavLinks>

        <ActionButtons>
          <ConnectButton>Connect Wallet</ConnectButton>
        </ActionButtons>

        <MobileMenuButton onClick={toggleMobileMenu}>
          <MobileMenuIcon open={mobileMenuOpen} />
        </MobileMenuButton>
      </NavbarContent>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(10, 10, 30, 0.9);
  backdrop-filter: blur(10px);
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const NavbarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const LogoContainer = styled.div`
  flex-shrink: 0;
`;

const Logo = styled.a`
  display: block;
  cursor: pointer;
`;

interface NavLinksProps {
  mobileMenuOpen: boolean;
}

const NavLinks = styled.ul<NavLinksProps>`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    flex-direction: column;
    background-color: rgba(10, 10, 30, 0.95);
    transition: transform 0.3s ease-in-out;
    transform: ${({ mobileMenuOpen }) => mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)'};
    opacity: ${({ mobileMenuOpen }) => mobileMenuOpen ? '1' : '0'};
    pointer-events: ${({ mobileMenuOpen }) => mobileMenuOpen ? 'auto' : 'none'};
    padding: 1rem 0;
    z-index: 100;
  }
`;

interface NavLinkProps {
  active: boolean;
}

const NavLink = styled.li<NavLinkProps>`
  margin: 0 1rem;
  
  a {
    display: block;
    padding: 0.5rem 0;
    color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.textLight};
    font-weight: ${({ active }) => active ? '600' : '400'};
    position: relative;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
    
    ${({ active }) => active && `
      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #57b9f8;
      }
    `}
  }
  
  @media (max-width: 768px) {
    margin: 0;
    width: 100%;
    text-align: center;
    
    a {
      padding: 1rem 0;
      
      &:after {
        display: none;
      }
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ConnectButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.5rem 1.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #3a9fe7;
    transform: translateY(-2px);
  }
`;

interface MobileMenuIconProps {
  open: boolean;
}

const MobileMenuIcon = styled.span<MobileMenuIconProps>`
  display: block;
  width: 24px;
  height: 2px;
  background-color: ${({ open }) => open ? 'transparent' : 'white'};
  position: relative;
  transition: all 0.3s ease;
  
  &:before, &:after {
    content: '';
    display: block;
    width: 24px;
    height: 2px;
    background-color: white;
    position: absolute;
    transition: all 0.3s ease;
  }
  
  &:before {
    top: ${({ open }) => open ? '0' : '-8px'};
    transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
  }
  
  &:after {
    bottom: ${({ open }) => open ? '0' : '-8px'};
    transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

export default Navbar; 