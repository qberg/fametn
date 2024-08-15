import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import styles from './layout.module.css';
import { JSONData } from '@/utils/definitions';
import Head from 'next/head';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    //search operation
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://www.clarity.ms" />
      </Head>
      <Navbar onSearch={handleSearch} />
      <div className={styles.fillVertical}>{children}</div>
      <Footer />
    </>
  );
}
