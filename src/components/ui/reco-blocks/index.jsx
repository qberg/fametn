import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import Link from "next/link";

const RecoBlocks = ({ title, themes }) => {
  return (
    <section className={styles.recoSection}>
      <Container fluid className={styles.recoContainer}>
        <Row className={styles.recoRow}>
          {/* Left Block */}
          <Col xs={12} md={6} className={styles.leftBlock}>
            <div className={styles.leftBlockHeader}>
              <h2>{title}</h2>

              <p>One stop answers to all your business queries</p>
            </div>

            <nav role="navigation" className={styles.leftBlockThemes}>
              <ul className={styles.themesList}>
                {themes.map((theme, index) => (
                  <Link
                    key={index}
                    href={`/content-recommendations/${theme.attributes.slug}`}
                  >
                    <li className={styles.themeItem}>
                      <h3>{theme.attributes.name}</h3>
                    </li>
                  </Link>
                ))}
              </ul>
            </nav>
          </Col>

          {/* Right Block */}
          <Col xs={12} md={6} className={styles.rightBlock}>
            <h2 className={styles.leftBlockHeader}>Right Block</h2>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default RecoBlocks;
