import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Logo from "../logo";

const RecoBlocks = ({ title, themes, rightBlock }) => {
  return (
    <section className={styles.recoSection}>
      <Container fluid className={styles.recoContainer}>
        <Row className={styles.recoRow}>
          {/* Left Block */}
          <Col xs={12} md={6} className={styles.leftBlock}>
            <div className={styles.leftBlockHeader}>
              <Link href="/">
                <div className={styles.logo}>
                  <Logo />
                </div>
              </Link>

              <Link href="/">
                <h1 className={styles.title}>{title}</h1>
              </Link>

              <p>Facilitating MSMEs Tamil Nadu</p>
            </div>

            <nav role="navigation" className={styles.leftBlockThemes}>
              <ul className={styles.themesList}>
                {themes.map((theme, index) => (
                  <Link
                    key={index}
                    href={`/content-recommendations/${theme.attributes.slug}`}
                  >
                    <li className={styles.themeItem}>
                      <h3 className={styles.themeName}>
                        {theme.attributes.name}
                      </h3>

                      <div className={styles.arrow}>
                        <ArrowRight width={30} height={30} />
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </nav>
          </Col>

          {/* Right Block */}
          <Col xs={12} md={6} className={styles.rightBlock}>
            <div className={styles.higlightsContainer}>
              <div className={styles.higlights}>
                {rightBlock.highlights.map((highlight, index) => (
                  <h5 key={index} className={styles.highlightText}>
                    {highlight.text}
                  </h5>
                ))}
              </div>

              <div className={styles.highlightsDesc}>
                {rightBlock.description}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default RecoBlocks;
