import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

// Import font styles
import '../styles/fonts.css';

const BrandPage = () => {
  return (
    <>
      <Head>
        <title>Sing7 | Brand Assets</title>
        <meta name="description" content="Brand guidelines and resources for Sing7 Web3 Music Creation Platform" />
      </Head>

      <Container>
        <Header>
          <h1>Sing7 Brand Guidelines</h1>
          <p>This page contains all brand assets and usage guidelines for the Sing7 platform</p>
        </Header>

        <Section>
          <h2>Logo</h2>
          <LogoContainer>
            <LogoCard>
              <h3>Color Version</h3>
              <div className="logo-display">
                <img src="/assets/images/sing7-logo-enhanced.svg" alt="Sing7 Color Logo" />
              </div>
              <a href="/assets/images/sing7-logo-enhanced.svg" download>Download SVG</a>
            </LogoCard>
            
            <LogoCard>
              <h3>Monochrome Version</h3>
              <div className="logo-display dark">
                <img src="/assets/branding/sing7-logo-monochrome.svg" alt="Sing7 Monochrome Logo" />
              </div>
              <a href="/assets/branding/sing7-logo-monochrome.svg" download>Download SVG</a>
            </LogoCard>
            
            <LogoCard>
              <h3>Dark Mode</h3>
              <div className="logo-display light">
                <img src="/assets/branding/sing7-logo-dark-mode.svg" alt="Sing7 Dark Mode Logo" />
              </div>
              <a href="/assets/branding/sing7-logo-dark-mode.svg" download>Download SVG</a>
            </LogoCard>
          </LogoContainer>
        </Section>

        <Section>
          <h2>Color Scheme</h2>
          <div className="palette-container">
            <img 
              src="/assets/branding/color-palette.svg" 
              alt="Sing7 Color Palette" 
              style={{ width: '100%', maxWidth: '600px' }}
            />
            <a href="/assets/branding/color-palette.svg" download>Download SVG</a>
          </div>
        </Section>

        <Section>
          <h2>Primary Colors</h2>
          <ColorGrid>
            <ColorCard color="#57b9f8">
              <div className="color-info">
                <h3>Blue</h3>
                <code>#57b9f8</code>
              </div>
            </ColorCard>
            <ColorCard color="#f8ce57">
              <div className="color-info">
                <h3>Yellow</h3>
                <code>#f8ce57</code>
              </div>
            </ColorCard>
            <ColorCard color="#2a2a2a">
              <div className="color-info white">
                <h3>Dark Gray</h3>
                <code>#2a2a2a</code>
              </div>
            </ColorCard>
          </ColorGrid>
        </Section>

        <Section>
          <h2>Secondary Colors</h2>
          <ColorGrid>
            <ColorCard color="#0a0a1e">
              <div className="color-info white">
                <h3>Dark Background</h3>
                <code>#0a0a1e</code>
              </div>
            </ColorCard>
            <ColorCard color="#23234b" opacity="0.5">
              <div className="color-info white">
                <h3>Card Background</h3>
                <code>#23234b80</code>
              </div>
            </ColorCard>
            <ColorCard color="#ffffff">
              <div className="color-info">
                <h3>Light Text</h3>
                <code>#ffffff</code>
              </div>
            </ColorCard>
            <ColorCard color="#c2c2e9">
              <div className="color-info">
                <h3>Secondary Text</h3>
                <code>#c2c2e9</code>
              </div>
            </ColorCard>
          </ColorGrid>
        </Section>

        <Section>
          <h2>Accent Colors</h2>
          <ColorGrid>
            <ColorCard color="#30D158">
              <div className="color-info">
                <h3>Success</h3>
                <code>#30D158</code>
              </div>
            </ColorCard>
            <ColorCard color="#FF5757">
              <div className="color-info">
                <h3>Error</h3>
                <code>#FF5757</code>
              </div>
            </ColorCard>
            <ColorCard color="#FFD60A">
              <div className="color-info">
                <h3>Warning</h3>
                <code>#FFD60A</code>
              </div>
            </ColorCard>
          </ColorGrid>
        </Section>

        <Section>
          <h2>Typography</h2>
          <FontSection>
            <FontCard>
              <h3 className="font-inter">Inter</h3>
              <p className="font-inter">Primary font, used for UI elements and body text</p>
              <div className="weights font-inter">
                <p style={{ fontWeight: 400 }}>Regular 400</p>
                <p style={{ fontWeight: 500 }}>Medium 500</p>
                <p style={{ fontWeight: 600 }}>SemiBold 600</p>
                <p style={{ fontWeight: 700 }}>Bold 700</p>
              </div>
            </FontCard>
            <FontCard>
              <h3 className="font-montserrat">Montserrat</h3>
              <p className="font-montserrat">Secondary font, used for headings and emphasis</p>
              <div className="weights font-montserrat">
                <p style={{ fontWeight: 600 }}>SemiBold 600</p>
                <p style={{ fontWeight: 700 }}>Bold 700</p>
              </div>
            </FontCard>
            <FontCard>
              <h3 className="font-roboto-mono">Roboto Mono</h3>
              <p className="font-roboto-mono">Monospace font, used for code blocks and technical information</p>
              <div className="weights font-roboto-mono">
                <p style={{ fontWeight: 400 }}>Regular 400</p>
              </div>
            </FontCard>
          </FontSection>
        </Section>

        <Section>
          <h2>Downloads</h2>
          <ResourceLinks>
            <a href="/assets/branding/sing7-logo-enhanced.svg" download>
              Color Logo (SVG)
            </a>
            <a href="/assets/branding/sing7-logo-monochrome.svg" download>
              Monochrome Logo (SVG)
            </a>
            <a href="/assets/branding/sing7-logo-dark-mode.svg" download>
              Dark Mode Logo (SVG)
            </a>
            <a href="/assets/branding/color-palette.svg" download>
              Color Palette (SVG)
            </a>
          </ResourceLinks>
        </Section>
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #0a0a1e;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.header`
  margin-bottom: 3rem;
  text-align: center;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #0a0a1e;
  }
  
  p {
    font-size: 1.2rem;
    color: #666;
  }
`;

const Section = styled.section`
  margin-bottom: 4rem;
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 0.5rem;
  }
  
  .palette-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const LogoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LogoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  h3 {
    margin-bottom: 1rem;
  }
  
  .logo-display {
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    border-radius: 4px;
    
    &.dark {
      background-color: #0a0a1e;
    }
    
    &.light {
      background-color: #f0f0f0;
    }
    
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  
  a {
    padding: 0.5rem 1rem;
    background-color: #57b9f8;
    color: white;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      background-color: #3a9fe7;
    }
  }
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

interface ColorCardProps {
  color: string;
  opacity?: string;
}

const ColorCard = styled.div<ColorCardProps>`
  height: 120px;
  border-radius: 8px;
  background-color: ${props => props.color};
  opacity: ${props => props.opacity || 1};
  display: flex;
  align-items: flex-end;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  .color-info {
    width: 100%;
    background-color: white;
    padding: 0.75rem;
    
    &.white {
      color: white;
      background-color: rgba(0, 0, 0, 0.7);
    }
    
    h3 {
      margin: 0;
      font-size: 1rem;
    }
    
    code {
      font-family: 'Roboto Mono', monospace;
      font-size: 0.85rem;
      color: #666;
    }
    
    &.white code {
      color: #f0f0f0;
    }
  }
`;

const FontSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FontCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  .weights {
    p {
      margin-bottom: 0.5rem;
    }
  }
`;

const ResourceLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  
  a {
    padding: 0.75rem 1.25rem;
    background-color: #f0f0f0;
    border-radius: 4px;
    text-decoration: none;
    color: #0a0a1e;
    font-weight: 500;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

export default BrandPage; 