import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import styles from './layout.module.css';
import { JSONData } from '@/utils/definitions';
import Head from 'next/head';
import Seo from '../seo';
export default function RootLayout({
  children,
  data,
  seo
}) {
  return (
    <>
      <Seo data={seo} />
      <Navbar data={data} />
      <div className={styles.fillVertical}>{children}</div>
      <Footer data={data} />
    </>
  );
}
