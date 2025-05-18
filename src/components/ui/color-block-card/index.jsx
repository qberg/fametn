import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import DynamicImage from "../../dynamicImage";
import YellowArrowButton from "../../yellow_arrow_button";

const ColorBlockCard = ({
  heading,
  subtitle,
  description,
  link,
  link_text,
  image,
}) => {
  return (
    <article className={styles.card}>
      <Container>
        <Row className={`${styles.cardRow} ${styles.responsiveHeight}`}>
          {/*Content*/}
          <Col
            xs={{ span: 12, order: 1 }}
            md={{ span: 4, offset: 1, order: 2 }}
            data-aos="fade-up"
          >
            <div className={styles.contentContainer}>
              <h2
                className={styles.heading}
                data-aos="fade-up"
                data-aos-delay={50}
              >
                {heading}
              </h2>

              <p data-aos="fade-up" data-aos-delay={50}>
                {description}
              </p>

              <div
                className={styles.ctaDesktop}
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <YellowArrowButton text={link_text} link={link} />
              </div>
            </div>
          </Col>

          {/*Image*/}
          <Col
            xs={{ span: 12, order: 2 }}
            md={{ span: 6, order: 1, offset: 0 }}
            className={styles.imageCol}
            data-aos="fade-up"
          >
            <div className={styles.imageWrapper} data-aos="fade-right">
              <DynamicImage src={image} objectFit="cover" />
            </div>
          </Col>

          <Col
            className={styles.ctaMobile}
            xs={{ span: 12, order: 3 }}
            data-aos="fade-up"
          >
            <YellowArrowButton text={link_text} link={link} />
          </Col>
        </Row>
      </Container>
    </article>
  );
};

export default ColorBlockCard;
