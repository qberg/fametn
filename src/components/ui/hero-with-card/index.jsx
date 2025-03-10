import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import DynamicImage from "../../dynamicImage";

const HeroWithCard = ({ title, banner, card_title, card_desc }) => {
  return (
    <Container fluid className={styles.heroSection}>
      {banner && (
        <div className={styles.bannerWrapper}>
          <DynamicImage objectFit="cover" src={banner} />
        </div>
      )}

      <Container className={styles.contentContainer}>
        <Row className={styles.heroContent}>
          <Col className={styles.heroContentCol} lg={12}>
            <h1 className={styles.heroTitle} data-aos="fade-up">
              {title}
            </h1>
          </Col>
        </Row>

        <Row
          className={styles.cardContainer}
          data-aos="fade-up"
          data-aos-delay={200}
        >
          <Col lg={{ span: 8, offset: 2 }} md={10} sm={12}>
            <div className={styles.card}>
              <h2
                className={styles.cardTitle}
                data-aos="fade-up"
                data-aos-delay={250}
              >
                {card_title}
              </h2>
              <p
                className={styles.cardDesc}
                data-aos="fade-up"
                data-aos-delay={300}
              >
                {card_desc}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HeroWithCard;
