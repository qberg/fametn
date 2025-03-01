import { Col, Container, Row } from "react-bootstrap";
import Bluepill from "../../bluepill";
import styles from "./styles.module.css";
import DynamicImage from "../../dynamicImage";

const HightlightItem = ({ heading, description }) => {
  return (
    <div className={styles.highlightItem} data-aos="fade-up">
      <h3 className={styles.highlightHeading}>{heading}</h3>
      <p className={styles.hightlightDescription}>{description}</p>
    </div>
  );
};

const Highlights = ({ super_title, title, points, image_1, image_2 }) => {
  return (
    <div className={styles.highlightsContainer}>
      <Container>
        <Bluepill text={super_title} />
        <hr></hr>
        <h2 className={styles.title} data-aos="fade-up">
          {title}
        </h2>

        <Row className={styles.contentRow}>
          <Col lg={6} className={styles.highlightsCol}>
            <div className={styles.highlightsList}>
              {points &&
                points.map((item, index) => (
                  <HightlightItem
                    key={index}
                    heading={item.heading}
                    description={item.description}
                  />
                ))}
            </div>
          </Col>

          <Col className="h-100 d-flex" lg={6}>
            <div className={styles.imagesContainer}>
              <div
                data-aos="fade-up"
                data-aos-delay={200}
                className={styles.backImage}
              >
                <DynamicImage src={image_1} objectFit="cover" />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay={300}
                className={styles.frontImage}
              >
                <DynamicImage src={image_2} objectFit="cover" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Highlights;
