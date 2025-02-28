import { Col, Container, Row } from "react-bootstrap";
import styles from "./herowithstats.module.css";
import DynamicImage from "../../dynamicImage";

const StatItem = ({ value, description, index }) => {
  return (
    <Col className={styles.statCol}>
      <div
        className={styles.statItem}
        data-aos="fade-up"
        data-aos-delay={300 + index * 100}
      >
        <div className={styles.statValue}>{value}</div>
        <div className={styles.statDescription}>{description}</div>
      </div>
    </Col>
  );
};

export default function HeroWithStats({
  title,
  description,
  background_image,
  impact_numbers,
}) {
  return (
    <Container fluid className={styles.heroContainer}>
      {background_image && (
        <div className={styles.bgImageWrapper}>
          <DynamicImage objectFit="cover" src={background_image} />
          <div className={styles.overlay}></div>
        </div>
      )}
      <Container className={styles.contentContainer}>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle} data-aos="fade-up">
                {title}
              </h1>
              <p
                className={styles.heroDescription}
                data-aos="fade-up"
                data-aos-delay={100}
              >
                {description}
              </p>
            </div>
          </Col>
        </Row>

        <div className={styles.statsContainer}>
          <Row
            className={styles.statsRow}
            data-aos="fade-up"
            data-aos-delay={200}
          >
            {impact_numbers &&
              impact_numbers.map((stat, index) => (
                <StatItem
                  key={stat.id}
                  value={stat.value}
                  description={stat.description}
                  index={index}
                />
              ))}
          </Row>
        </div>
      </Container>
    </Container>
  );
}
