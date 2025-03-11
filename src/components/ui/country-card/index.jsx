import Link from "next/link";
import styles from "./styles.module.css";
import DynamicImage from "../../dynamicImage";

const CountryCard = ({ name, slug, flag_image, hero_image, about }) => {
  return (
    <Link href={`/all-countries/${slug}`} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <div className={styles.bgImageWrapper}>
            <DynamicImage src={hero_image} objectFit="cover" />
          </div>
          {flag_image && (
            <div className={styles.flagImageWrapper}>
              <DynamicImage src={flag_image} objectFit="cover" />
            </div>
          )}
        </div>
        <div className={styles.contentContainer}>
          <h4>{name}</h4>
          <p className={styles.overview}>{about.overview}</p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
