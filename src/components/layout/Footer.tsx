import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterLogo>
            <svg width="80" height="32" viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          </FooterLogo>
          <FooterText>
            Create, mint, and share music NFTs with Sing7, the Web3 music creation platform.
          </FooterText>
        </FooterSection>

        <FooterLinks>
          <FooterLinkColumn>
            <FooterLinkHeading>Platform</FooterLinkHeading>
            <FooterLink>
              <Link href="/studio">Studio</Link>
            </FooterLink>
            <FooterLink>
              <Link href="/marketplace">Marketplace</Link>
            </FooterLink>
            <FooterLink>
              <Link href="/explore">Explore</Link>
            </FooterLink>
          </FooterLinkColumn>
          
          <FooterLinkColumn>
            <FooterLinkHeading>Resources</FooterLinkHeading>
            <FooterLink>
              <Link href="/docs">Documentation</Link>
            </FooterLink>
            <FooterLink>
              <Link href="/brand">Brand</Link>
            </FooterLink>
            <FooterLink>
              <Link href="/faq">FAQ</Link>
            </FooterLink>
          </FooterLinkColumn>
          
          <FooterLinkColumn>
            <FooterLinkHeading>Company</FooterLinkHeading>
            <FooterLink>
              <Link href="/about">About</Link>
            </FooterLink>
            <FooterLink>
              <Link href="/blog">Blog</Link>
            </FooterLink>
            <FooterLink>
              <Link href="/contact">Contact</Link>
            </FooterLink>
          </FooterLinkColumn>
        </FooterLinks>
      </FooterContent>
      
      <FooterBottom>
        <Copyright>© {new Date().getFullYear()} Sing7. All rights reserved.</Copyright>
        <FooterBottomLinks>
          <FooterBottomLink>
            <Link href="/terms">Terms</Link>
          </FooterBottomLink>
          <FooterBottomLink>
            <Link href="/privacy">Privacy</Link>
          </FooterBottomLink>
        </FooterBottomLinks>
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: rgba(10, 10, 30, 0.95);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem 0 1.5rem;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 250px;
`;

const FooterLogo = styled.div`
  margin-bottom: 1rem;
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  max-width: 300px;
`;

const FooterLinks = styled.div`
  display: flex;
  flex: 2;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1.5rem;
  }
`;

const FooterLinkColumn = styled.div`
  flex: 1;
  min-width: 120px;
  
  @media (max-width: 480px) {
    min-width: 100%;
  }
`;

const FooterLinkHeading = styled.h4`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 1rem;
  font-weight: 600;
`;

const FooterLink = styled.div`
  margin-bottom: 0.75rem;
  
  a {
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: color 0.2s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 3rem auto 0;
  padding: 1.5rem 1.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const FooterBottomLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const FooterBottomLink = styled.div`
  a {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.875rem;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export default Footer; 