import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import styles from "./layout.module.css";
import Seo from "../seo";
import GoogleAnalytics from "../googleanalytics";
import MicrosoftClarity from "../microsoft_clarity";
import EvNavbar from "@/components/evnavbar";
import EvFooter from "@/components/evfooter";

export default function RootLayout({ children, data, seo }) {
  return (
    <>
      <Seo data={seo} />
      <Navbar data={data} />
      <div className={styles.fillVertical}>{children}</div>
      <Footer data={data} />
      <GoogleAnalytics />
      <MicrosoftClarity />
    </>
  );
}

export function EvLayout({ children, data, seo }) {
  return (
    <>
      <Seo data={seo} />
      <EvNavbar data={data} />
      <div className={styles.evfillVertical}>{children}</div>
      <EvFooter data={data} />

      <GoogleAnalytics />
      <MicrosoftClarity />
    </>
  );
}

export function MinLayout({ children, data, seo }) {
  return (
    <>
      <Seo data={seo} />
      <div className={styles.minfillVertical}>{children}</div>
      <GoogleAnalytics />
      <MicrosoftClarity />
    </>
  );
}

