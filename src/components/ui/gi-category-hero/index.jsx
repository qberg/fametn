import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import DynamicImage from "../../dynamicImage";

const GICategoryHero = ({ name, title, description, categoryImage }) => {
  return (
    <div className={styles.heroSection}>
      <Container fluid className={styles.heroContainer}>
        <Row className={styles.heroRow}>
          <Col lg={6} className={styles.nameImageCol}>
            <h1 className={styles.name} data-aos="fade-up">
              {name}
            </h1>
            <div
              className={styles.imageWrapper}
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <DynamicImage src={categoryImage} objectFit="cover" />
            </div>
          </Col>

          <Col lg={6} className={styles.contentCol}>
            <div className={styles.contentContainer}>
              <h2
                className={styles.title}
                data-aos="fade-up"
                data-aos-delay={200}
              >
                {title}
              </h2>
              <p
                className={styles.description}
                data-aos="fade-up"
                data-aos-delay={250}
              >
                {description}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GICategoryHero;
