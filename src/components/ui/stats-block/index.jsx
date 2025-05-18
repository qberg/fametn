import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";

const StatsBlock = ({ narrative, stats }) => {
  const [firstWord, ...rest] = narrative?.split(" ") || [];
  const restOfText = rest.join(" ");

  return (
    <section className="margin">
      <Container>
        {/*Stats */}
        {stats.length > 0 && (
          <Row className={styles.statsRow}>
            {stats.map((stat, index) => (
              <Col key={index} xs={12} md={4} className={styles.statCol}>
                <StatCard {...stat} index={index} />
              </Col>
            ))}
          </Row>
        )}

        {/*narrative */}
        {narrative && (
          <Row className="margin">
            <Col xs={12} md={9} className={styles.narrativeCol}>
              <div className={styles.narrative}>
                <h3 data-aos="fade-up">
                  <span className={styles.firstWord}>{firstWord}</span>{" "}
                  <span className={styles.restText}>{restOfText}</span>
                </h3>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

const StatCard = ({ number, subtext, description, index }) => {
  return (
    <div
      className={styles.statCard}
      data-aos="fade-up"
      data-aos-delay={100 * index}
    >
      <div className={styles.stat}>
        <div className={styles.number} data-aos="fade-up">
          {number}
        </div>

        <div className={styles.subtext} data-aos="fade-up">
          {subtext}
        </div>
      </div>

      <div className={styles.statDesc}>
        <h3 data-aos="fade-up">{description}</h3>
      </div>
    </div>
  );
};

export default StatsBlock;
