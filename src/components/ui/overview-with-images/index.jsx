import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import YellowArrowButton from "../../yellow_arrow_button";
import DynamicImage from "../../dynamicImage";
import Marquee from "../marquee";

const OverviewWithImages = ({
  super_title,
  title,
  description,
  cta_text,
  cta_link,
  featured_image_title,
  featured_image,
  gallery_images,
}) => {
  return (
    <section className={styles.overviewSection}>
      <Container fluid className={styles.container}>
        <Row className={styles.overviewRow}>
          <Col lg={6} className={styles.contentCol}>
            <div className={styles.topContent}>
              <span className={styles.superTitle} data-aos="fade-up">
                {super_title}
              </span>
              <h2 className={styles.title} data-aos="fade-up">
                {title}
              </h2>
              <p
                className={styles.description}
                data-aos="fade-up"
                data-aos-delay={100}
              >
                {description}
              </p>
              <YellowArrowButton
                text={cta_text}
                link={cta_link}
                data-aos="fade-up"
                data-aos-delay={100}
              />
            </div>
            <div className={styles.imageGridContainer}>
              {gallery_images?.data?.length > 0 && (
                <div className={styles.imageGrid}>
                  {gallery_images.data.map((image, index) => (
                    <div
                      key={index}
                      className={styles.gridImageWrapper}
                      data-aos="fade-up"
                      data-aos-delay={200 * index}
                    >
                      <DynamicImage src={{ data: image }} objectFit="cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Col>
          <Col lg={6} className={styles.imageCol}>
            <div
              className={styles.featureImageContainer}
              data-aos="fade-up"
              data-aos-delay={200}
            >
              {featured_image?.data && (
                <div className={styles.featureImageWrapper}>
                  <DynamicImage src={featured_image} objectFit="cover" />
                  {featured_image_title && (
                    <div className={styles.featureImageOverlay}>
                      <h3 className={styles.featureImageTitle}>
                        {featured_image_title}
                      </h3>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <Marquee text="GI Tagged Products" length={20} />
    </section>
  );
};

export default OverviewWithImages;
