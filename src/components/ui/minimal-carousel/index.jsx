import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import DynamicImage from "../../dynamicImage";
import { ArrowRight, MoveLeft, MoveRight } from "lucide-react";
import { useState } from "react";

const MinimalCarousel = ({ sectionId, heading, slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!slides || slides.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const currentSlide = slides[currentIndex];

  return (
    <section id={sectionId} className={`${styles.section}`} data-aos="fade-up">
      <Container>
        <Row className={styles.carRow}>
          <Col
            xs={{ span: 12, order: 2 }}
            md={{ span: 5, order: 1 }}
            className={styles.contentCol}
          >
            <div className={styles.contentFlex}>
              <div className={styles.contentWrapper}>
                <h3 className={styles.slideTitle} data-aos="fade-up">
                  {currentSlide.title}
                </h3>

                <div className={styles.seperator} data-aos="fade-up"></div>

                <p className={styles.slideDescription} data-aos="fade-up">
                  {currentSlide.description}
                </p>

                <div className={styles.slideCta} data-aos="fade-up">
                  <a
                    href={currentSlide.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className={styles.ctaText}>
                      {currentSlide.ctaText}
                      <span className={styles.ctaArrow}>
                        <ArrowRight />
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </Col>

          <Col
            xs={{ span: 12, order: 1 }}
            md={{ span: 5, order: 2 }}
            className={styles.imageCol}
          >
            <div className={styles.imageWrapper}>
              <div className={styles.image} data-aos="fade-up">
                <DynamicImage src={currentSlide.image} objectFit="cover" />
              </div>
            </div>
          </Col>

          <Col
            xs={{ span: 12, order: 3 }}
            md={{ span: 2, order: 3 }}
            className={styles.controlsCol}
          >
            <div className={styles.controlsFlex}>
              <div className={styles.controls}>
                <div
                  className={`${styles.round}`}
                  role="button"
                  onClick={handlePrev}
                  aria-label="Previous Slide"
                  data-aos="fade-up"
                  data-aos-delay={50}
                >
                  <MoveLeft />
                </div>

                <div
                  className={`${styles.round}`}
                  role="button"
                  onClick={handleNext}
                  aria-label="Next Slide"
                  data-aos="fade-up"
                  data-aos-delay={100}
                >
                  <MoveRight />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MinimalCarousel;
