import type { AppProps } from 'next/app'
import {useEffect } from 'react'
import './global.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        AOS.init({
             duration: 800,
             once: true,
           })
     }, [])
  return <Component {...pageProps} />
}