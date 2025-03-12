import Link from "next/link";
import styles from "./styles.module.css";
import DynamicImage from "../../dynamicImage";

const CountryCard = ({ index, name, slug, flag_image, hero_image, about }) => {
  return (
    <Link href={`/exports/all-countries/${slug}`} className={styles.cardLink}>
      <div
        className={styles.card}
        data-aos="fade-up"
        data-aos-delay={100 * index}
      >
        <div className={styles.imageContainer} data-aos="fade-up">
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
          <h4 data-aos="fade-up">{name}</h4>
          <p className={styles.overview} data-aos="fade-up">
            {about.overview}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
