import Link from "next/link";
import DynamicImage from "../../dynamicImage";
import styles from "./sectorcards.module.css";
import { Col, Row } from "react-bootstrap";

const FeatureItem = ({ feature }) => {
  return (
    <Col xs={6} md={3} className={styles.featureCol}>
      <div className={styles.featureItem}>
        <div className={styles.featureNumber}>{feature.Number}</div>
        <div className={styles.featureText}>{feature.Information}</div>
      </div>
    </Col>
  );
};

const SectorCard = ({ sector }) => {
  return (
    <div className={styles.sectorCard} data-aos="fade-up">
      <div className={styles.sectorImageContainer}>
        {sector.background_image && (
          <div className={styles.bgImageWrapper}>
            <DynamicImage objectFit="cover" src={sector.background_image} />
          </div>
        )}

        <div className={styles.sectorContent}>
          <h2 className={styles.sectorTitle}>{sector.title}</h2>
          <p className={styles.sectorDescription}>{sector.description}</p>
          {sector.cta_link && (
            <Link href={sector.cta_link}>
              <div className={styles.ctaButton}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="24"
                  height="24"
                >
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                </svg>
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className={styles.featuresContainer}>
        <Row>
          {sector.features &&
            sector.features.map((feature) => (
              <FeatureItem key={feature.id} feature={feature} />
            ))}
        </Row>
      </div>
    </div>
  );
};

export default SectorCard;
