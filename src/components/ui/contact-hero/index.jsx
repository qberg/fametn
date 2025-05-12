import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import Breadcrumps from "@/components/breadcrumps";
import YellowArrowButton from "../../yellow_arrow_button";

const ContactHero = ({ breadcrumps, title, description, ctaText, ctaLink }) => {
  return (
    <section className={styles.heroSection}>
      <Breadcrumps items={breadcrumps} />
      <Container className={styles.heroContainer}>
        <Row className={styles.heroRow}>
          <Col xs={12} md={6} className={styles.heroCol}>
            <h1 data-aos="fade-up" data-aos-delay={50}>
              {title}
            </h1>
            <div className={styles.heroContent}>
              <p data-aos="fade-up" data-aos-delay={100}>
                {description}
              </p>
              <div
                className={styles.heroCta}
                data-aos="fade-up"
                data-aos-delay={150}
              >
                <YellowArrowButton text={ctaText} link={ctaLink} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactHero;
