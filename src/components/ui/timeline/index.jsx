import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import useMeasure from "react-use-measure";

const TimeLine = ({ heading, description, items }) => {
  return (
    <section className={styles.timelineSection}>
      <Container className={styles.timelineContainer}>
        <Row>
          {heading && (
            <Col xs={12} md={6}>
              <h2 className="markedTitle">{heading}</h2>
            </Col>
          )}
          {description && (
            <Col xs={12} md={6}>
              <p>{description}</p>
            </Col>
          )}
        </Row>

        <Row className={styles.timelineRow}>
          <div className={styles.timeline}>
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
      <div className={styles.timelineItem}>
        <div
          className={styles.timelineTrigger}
          role="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={styles.timelineMarker}>
            <div className={styles.timelineStep}>{index + 1}</div>
          </div>
          <div className={styles.timelineHeader}>
            <h5
              className={`${styles.timelineTitle} ${isOpen ? styles.open : ""}`}
            >
              {title}
            </h5>

            <div className={styles.timelineIcon}>
              {isOpen ? <ChevronUp /> : <ChevronDown />}
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
          </div>
        </div>
      </div>
    </Col>
  );
};

export default TimeLine;
