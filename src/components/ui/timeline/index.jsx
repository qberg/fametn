import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import useMeasure from "react-use-measure";

const TimeLine = ({ heading, description, items }) => {
  return (
    <section className={styles.timelineSection} data-aos="fade-up">
      <Container className={styles.timelineContainer}>
        <Row>
          {heading && (
            <Col xs={12} md={6} data-aos="fade-up">
              <h2 className="markedTitle">{heading}</h2>
            </Col>
          )}
          {description && (
            <Col xs={12} md={6} data-aos="fade-up">
              <p>{description}</p>
            </Col>
          )}
        </Row>

        <Row className={styles.timelineRow}>
          <div className={styles.timeline} data-aos="fade-up">
            {items &&
              items.map((item, index) => (
                <TimeLineItem key={index} {...item} index={index} />
              ))}
          </div>
        </Row>
      </Container>
    </section>
  );
};

const TimeLineItem = ({ title, description, ctaLink, ctaText, index }) => {
  const [ref, { height }] = useMeasure();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Col xs={12} md={{ span: 6, offset: 3 }} className={styles.timelineCol}>
      <div
        className={styles.timelineItem}
        data-aos="fade-up"
        data-aos-delay={50 * index}
      >
        <div
          className={styles.timelineTrigger}
          role="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={styles.timelineMarker} data-aos="fade-up">
            <div className={styles.timelineStep}>{index + 1}</div>
          </div>
          <div className={styles.timelineHeader}>
            <h5
              data-aos="fade-up"
              className={`${styles.timelineTitle} ${isOpen ? styles.open : ""}`}
            >
              {title}
            </h5>

            <div
              data-aos="fade-up"
              className={`${styles.timelineIcon} ${isOpen ? styles.open : ""}`}
            >
              <ChevronDown />
            </div>
          </div>
        </div>

        {/*Content */}

        <div
          className={`${styles.timelineContent}`}
          style={{ height: isOpen ? height : 0 }}
        >
          <div ref={ref} className={styles.timelineContentInner}>
            <p className={styles.timelineDesc}>{description}</p>
            {ctaLink && (
              <a className={styles.ctaLink} href={ctaLink}>
                <span className={styles.ctaText}>{ctaText}</span>
                <span className={styles.ctaIcon}>
                  <ArrowRight size={20} />{" "}
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </Col>
  );
};

export default TimeLine;
