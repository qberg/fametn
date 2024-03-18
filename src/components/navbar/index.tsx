import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <li className={styles.navbarItem}>
          <Link href="/">
            <span className={styles.navbarLink}>Home</span>
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link href="/about">
            <span className={styles.navbarLink}>About</span>
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link href="/services">
            <span className={styles.navbarLink}>Services</span>
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link href="/contact">
            <span className={styles.navbarLink}>Contact</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
