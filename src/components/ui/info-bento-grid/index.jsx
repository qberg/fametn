import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";

const InfoBentoGrid = ({ overview, export_goods, location }) => {
  return (
    <section className={styles.bentoGridSection}>
      <Container>
        <Row className={styles.bentoRow}>
          <Col className={styles.bigGrid} lg={6} md={12}>
            <div
              className={`${styles.contentWrapper} ${styles.overviewBox}`}
              data-aos="fade-up"
            >
              <h3 className={styles.title}>Overview</h3>
              <p className={styles.contentText}>{overview}</p>
            </div>
          </Col>
          <Col className={styles.smallGridsColumn} lg={6} md={12}>
            <div
              className={`${styles.contentWrapper} ${styles.exportBox}`}
              data-aos="fade-up"
            >
              <h3 className={styles.title}>Export Goods</h3>
              <p className={styles.contentText}>{export_goods}</p>
            </div>
            <div
              className={`${styles.contentWrapper} ${styles.locationBox}`}
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <h3 className={styles.title}>Location</h3>
              <p className={styles.contentText}>{location}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default InfoBentoGrid;
