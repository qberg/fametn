import { Col, Container, Row } from "react-bootstrap";
import styles from "./exportpagescards.module.css";
import YellowArrowButton from "../../yellow_arrow_button";
import DynamicImage from "../../dynamicImage";

const PageCard = ({
  badge,
  title,
  description,
  cta_text,
  cta_link,
  image,
  imagePosition,
}) => {
  return (
    <div className={styles.cardContainer}>
      <Container>
        <div className={styles.card}>
          <Row className={imagePosition === "left" ? "flex-row-reverse" : ""}>
            <Col lg={6} className={styles.contentCol}>
              <div className={styles.badge}>{badge}</div>
              <h2 className={styles.cardTitle}>{title}</h2>
              <p className={styles.cardDescription}>{description}</p>
              <div className={styles.ctaWrapper}>
                <YellowArrowButton text={cta_text} link={cta_link} />
              </div>
            </Col>
            <Col lg={6} className={styles.imageCol}>
              <div className={styles.imageWrapper}>
                {image && <DynamicImage objectFit="cover" src={image} />}
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

const ExportPagesCards = ({ data }) => {
  return (
    <div className={styles.cardsContainer}>
      {data &&
        data.map((item, index) => (
          <PageCard
            key={item.id || index}
            {...item}
            imagePosition={index % 2 === 0 ? "right" : "left"}
          />
        ))}
    </div>
  );
};

export default ExportPagesCards;
