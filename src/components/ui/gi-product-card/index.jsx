import { FmdGoodOutlined, VerifiedOutlined } from "@mui/icons-material";
import DynamicImage from "../../dynamicImage";
import styles from "./styles.module.css";

const GIProductCard = ({
  name,
  description,
  location,
  issuedDate,
  featuredImage,
}) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <DynamicImage src={featuredImage} objectFit="cover" />
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <h3 className={styles.productName}>{name}</h3>
        <div className={styles.metaInfo}>
          <div className={styles.location}>
            <FmdGoodOutlined />
            <span>{location}</span>
          </div>
          <div className={styles.date}>
            <span className={styles.dateIcon}>
              <VerifiedOutlined />
            </span>
            <span>{issuedDate}</span>
          </div>
        </div>

        <div className={`${styles.descriptionWrapper}`}>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default GIProductCard;
