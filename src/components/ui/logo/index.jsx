import Link from "next/link";
import styles from "./styles.module.css";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link href="/">
        <picture>
          <img className="me-3" src="/tn_logo.png" alt="Logo" />
          <img
            data-aos-delay={50}
            className="me-3"
            src="/Line 1.png"
            alt="Logo"
          />
          <img data-aos-delay={100} src="/fame_tn_logo.png" alt="Logo" />
        </picture>
      </Link>
    </div>
  );
};

export default Logo;
