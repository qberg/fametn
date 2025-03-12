import styles from "./styles.module.css";

import DynamicImage from "../../dynamicImage";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";

const CountryHero = ({ name, flag_image, map_image, hero_image, stats }) => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.bgImage}>
        {hero_image && (
          <div className={styles.bgImageWrapper}>
            <DynamicImage src={hero_image} objectFit="cover" />
            {/*<Image
            /* TODO: Image is of low quality
              src="/japan-hero.jpg"
              alt="Japan"
              layout="fill"
              objectFit="cover"
            />
	    */}
          </div>
        )}
        <div className={styles.bgOverlay}></div>
      </div>

      <Container fluid className={styles.heroContainer}>
        <Row className={styles.headerRow}>
          <Col md={3} className="d-none d-md-block">
            <div className={styles.mapImageWrapper} data-aos="fade-up">
              <DynamicImage src={map_image} objectFit="cover" />
            </div>
          </Col>
          <Col xs={12} md={9}>
            <Row className={styles.nameRow}>
              <Col className="d-flex flex-row justify-content-start align-items-center gap-2">
                <div className={styles.flagWrapper} data-aos="fade-up">
                  <DynamicImage src={flag_image} objectFit="cover" />
                </div>
                <div className={styles.name} data-aos="fade-up">
                  {name}
                </div>
              </Col>
            </Row>
            <Row>
              {stats.map((stat, index) => (
                <Col
                  key={index}
                  xs={12}
                  sm={6}
                  md={3}
                  className={styles.statCol}
                >
                  <div
                    className={styles.statItem}
                    data-aos="fade-up"
                    data-aos-delay={100 * index}
                  >
                    <div className={styles.statLine}></div>
                    <div>
                      <h2 className={styles.statValue}>{stat.value}</h2>
                      <div className={styles.statLabel}>{stat.description}</div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        {/* About the country Row */}
      </Container>
    </section>
  );
};

export default CountryHero;
