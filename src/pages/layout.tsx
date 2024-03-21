
// import { Inter } from "next/font/google";
// import Navbar from "@/components/navbar";
// import Footer from "@/components/footer";

// import styles from "./layout.module.css"

// const inter = Inter({ subsets: ["latin"] });



// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <>
//         <Navbar />
//         <div className={styles.fillVertical}>
//           {children}        
//         </div>
//         <Footer />
//     </>
//   );
// }
import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import styles from './layout.module.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    //search operation
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className={styles.fillVertical}>{children}</div>
      <Footer />
    </>
  );
}
