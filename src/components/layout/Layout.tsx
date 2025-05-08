import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'Sing7 - Web3 Music Creation Platform',
  description = 'Create, mint, and share music NFTs with Sing7'
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

const Main = styled.main`
  min-height: calc(100vh - 140px); /* Adjust based on navbar and footer height */
  padding-top: 80px; /* Height of navbar */
`;

export default Layout; 