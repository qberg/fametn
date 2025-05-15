import { Container, Row, Col } from "react-bootstrap";
import styles from "./faqcomponent.module.css";
import DynamicImage from "../dynamicImage";
import FaqSection from "../faq";

export default function FaqComponent({ data, marked = false }) {
  const hasImage = data?.image?.data;
  return (
    <Container className="my-5 py-5">
      <Row>
        <Col lg={6}>
          <h2 className={marked ? "markedTitle" : ""} data-aos="fade-up">
            {data.title}
          </h2>
          <p data-aos="fade-up" className="mt-3">
            {data.description}
          </p>
          {hasImage && (
            <div data-aos="fade-up" className={`mt-5 ${styles.imgwrap}`}>
              <DynamicImage src={data.image} objectFit="contain" />
            </div>
          )}
        </Col>
        <Col lg={6}>
          {data.questions_and_answers.map((each, index) => {
            return (
              <div key={index} data-aos="fade-up">
                <FaqSection
                  key={index}
                  question={each.heading}
                  answer={each.description}
                />
              </div>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}

