import { DownloadIcon } from "lucide-react";
import styles from "./styles.module.css";

const DownloadButton = ({ ctaLink, ctaText }) => {
  return (
    <div data-aos="fade-up" className={styles.ctaWrapper}>
      <a href={ctaLink} target="_blank" rel="noopener noreferrer">
        <span className={styles.ctaText}>{ctaText || "Download"}</span>

        <span className={styles.ctaIcon}>
          <DownloadIcon size={18} />
        </span>
      </a>
    </div>
  );
};

export default DownloadButton;
