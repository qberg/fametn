"use client";

import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";

import YellowArrowButton from "@/components/yellow_arrow_button";
import ExportsWorldMap from "@/components/ui/exports-world-map";
import Bluepill from "../../bluepill";

const ExportsGlobalNetwork = ({
  super_title,
  title,
  desc,
  cta_text,
  cta_link,
}) => {
  return (
    <section className={styles.globalSection}>
      <Container className="my-5">
        <Bluepill text={super_title} />
        <hr></hr>
        <Row className={styles.headerRow}>
          <Col md={12}>
            <h2 className={styles.title} data-aos="fade-up">
              {title}
            </h2>
          </Col>
          <Col md={8}>
            <p className={styles.desc} data-aos="fade-up" data-aos-delay={100}>
              {desc}
            </p>
          </Col>
          <Col md={4} className={styles.ctaWrapper}>
            <div data-aos="fade-up" data-aos-delay={200}>
              <YellowArrowButton text={cta_text} url={cta_link} />
            </div>
          </Col>
        </Row>
        <Row className={styles.mapRow}>
          <ExportsWorldMap />
        </Row>
      </Container>
    </section>
  );
};

export default ExportsGlobalNetwork;
