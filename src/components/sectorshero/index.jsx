import { Col, Container, Row } from "react-bootstrap";
import YellowArrowButton from "../yellow_arrow_button";
import DynamicImage from "../dynamicImage";
import styles from "./sectorshero.module.css";

const SectorsHero = ({ hero, hero_img }) => {
  return (
    <Container fluid className={styles.heroContainer}>
      <Container>
        <Row className={styles.heroRow}>
          <Col lg={6} className={styles.contentCol}>
            <div className={styles.contentBox} data-aos="fade-up">
              <h1 className={styles.title}>{hero.title}</h1>
              <p className={styles.description}>{hero.description}</p>
              {hero.cta_name && (
                <div className={styles.ctaWrapper}>
                  <YellowArrowButton
                    text={hero.cta_name}
                    link={hero.cta_link}
                  />
                </div>
              )}
            </div>
          </Col>
          {/*Image Block*/}
          <Col lg={6} className={styles.imageCol}>
            <div
              className={styles.imageWrapper}
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <DynamicImage objectFit="cover" src={hero_img.image} />
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default SectorsHero;
