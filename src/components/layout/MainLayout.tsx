import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useWallet } from '../../hooks/useWallet';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { connected, address, balance } = useSelector((state: RootState) => state.wallet);
  const { connect, disconnect } = useWallet();
  
  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  const isActive = (path: string) => {
    return router.pathname === path || router.pathname.startsWith(`${path}/`);
  };
  
  return (
    <LayoutContainer>
      <Header>
        <LogoContainer>
          <Link href="/" passHref>
            <Logo>Sing7</Logo>
          </Link>
          <LogoTagline>Web3 Music Creation</LogoTagline>
        </LogoContainer>
        
        <Navigation>
          <NavItem active={isActive('/studio')}>
            <Link href="/studio" passHref>
              <NavLink>Studio</NavLink>
            </Link>
          </NavItem>
          <NavItem active={isActive('/marketplace')}>
            <Link href="/marketplace" passHref>
              <NavLink>Marketplace</NavLink>
            </Link>
          </NavItem>
          <NavItem active={isActive('/mint')}>
            <Link href="/mint" passHref>
              <NavLink>Mint NFT</NavLink>
            </Link>
          </NavItem>
        </Navigation>
        
        <WalletContainer>
          {connected ? (
            <>
              <WalletInfo>
                <WalletBalance>{balance ? `${parseFloat(balance).toFixed(4)} ETH` : '0 ETH'}</WalletBalance>
                <WalletAddress>{truncateAddress(address || '')}</WalletAddress>
              </WalletInfo>
              <WalletButton onClick={disconnect}>Disconnect</WalletButton>
            </>
          ) : (
            <WalletButton onClick={connect}>Connect Wallet</WalletButton>
          )}
        </WalletContainer>
      </Header>
      
      <Content>{children}</Content>
      
      <Footer>
        <FooterContent>
          <FooterLinks>
            <FooterLink href="https://github.com/Sing7AI/Sing7" target="_blank" rel="noopener noreferrer">
              GitHub
            </FooterLink>
            <FooterLink href="https://x.com/Sing_7_" target="_blank" rel="noopener noreferrer">
              Twitter
            </FooterLink>
          </FooterLinks>
          <FooterCopyright>&copy; {new Date().getFullYear()} Sing7. All rights reserved.</FooterCopyright>
        </FooterContent>
      </Footer>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #121212;
  color: #FFFFFF;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background-color: #1A1A1A;
  border-bottom: 1px solid #2A2A2A;
  position: sticky;
  top: 0;
  z-index: 100;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Logo = styled.a`
  font-size: 24px;
  font-weight: 700;
  color: #BF5AF2;
  text-decoration: none;
  margin: 0;
`;

const LogoTagline = styled.span`
  font-size: 12px;
  color: #9E9E9E;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 8px;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

interface NavItemProps {
  active: boolean;
}

const NavItem = styled.div<NavItemProps>`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.active ? '#BF5AF2' : 'transparent'};
    transition: background-color 0.2s;
  }
`;

const NavLink = styled.a`
  color: #FFFFFF;
  text-decoration: none;
  padding: 8px 16px;
  font-weight: 500;
  transition: color 0.2s;
  
  &:hover {
    color: #BF5AF2;
  }
`;

const WalletContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const WalletInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const WalletBalance = styled.div`
  font-weight: 600;
  color: #FFFFFF;
`;

const WalletAddress = styled.div`
  font-size: 14px;
  color: #9E9E9E;
`;

const WalletButton = styled.button`
  background-color: #BF5AF2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #A347D1;
  }
`;

const Content = styled.main`
  flex: 1;
`;

const Footer = styled.footer`
  background-color: #1A1A1A;
  border-top: 1px solid #2A2A2A;
  padding: 24px 32px;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 24px;
`;

const FooterLink = styled.a`
  color: #9E9E9E;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #BF5AF2;
  }
`;

const FooterCopyright = styled.div`
  font-size: 14px;
  color: #9E9E9E;
`;

export default MainLayout; 