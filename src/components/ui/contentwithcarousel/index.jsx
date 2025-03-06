"use client";
import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Bluepill from "../../bluepill";
import styles from "./styles.module.css";
import YellowArrowButton from "../../yellow_arrow_button";
import DynamicImage from "../../dynamicImage";

const ContentWithCarousel = ({
  supertitle,
  title,
  description,
  carousel,
  cta_name,
  cta_link,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = carousel?.images?.data || [];

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <Container className="my-2">
      <Row>
        <Col xs={12}>
          <Bluepill text={supertitle} />
          <hr className={styles.divider} />
        </Col>
      </Row>

      <Row className="mt-1">
        <Col lg={5}>
          <h2 className={styles.title} data-aos="fade-up">
            {title}
          </h2>
          <p className={styles.description} data-aos="fade-up">
            {description}
          </p>
          <div data-aos="fade-up" data-aos-delay={100}>
            <YellowArrowButton text={cta_name} link={cta_link} />
          </div>
        </Col>

        <Col
          lg={7}
          className={styles.carouselContainer}
          data-aos="fade-up"
          data-aos-delay={200}
        >
          <div className={styles.carousel}>
            <div
              className={styles.carouselTrack}
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {images.map((image, index) => (
                <div key={index} className={styles.carouselSlide}>
                  <DynamicImage
                    src={{ data: image }}
                    objectFit="cover"
                    altname={`Slide ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.carouselDots}>
            {images.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentSlide ? styles.active : ""}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContentWithCarousel;
