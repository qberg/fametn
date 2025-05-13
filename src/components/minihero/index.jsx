import styles from "./minihero.module.css";
import { Row, Col, Container } from "react-bootstrap";
import YellowArrowButton from "../yellow_arrow_button";
import DynamicImage from "../dynamicImage";

export default function Minihero({ data }) {
  return (
    <Container className={styles.container}>
      <Row>
        <Col md={5}>
          <h2 data-aos="fade-up" className={styles.title}>
            {data.heading}
          </h2>
          <h2 data-aos="fade-up" className={styles.subtitle}>
            {data.subtitle}
          </h2>
          <p data-aos="fade-up" className="mt-3">
            {data.description}
          </p>
          <div data-aos="fade-up">
            <YellowArrowButton text={data.link_text} link={data.link} />
          </div>
        </Col>
        <Col md={7}>
          <div data-aos="fade-up" data-aos-delay={200} className={styles.image}>
            <DynamicImage objectFit="contain" src={data.image} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

