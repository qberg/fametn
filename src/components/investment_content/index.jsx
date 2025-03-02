import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.css";
import Bluepill from "../bluepill";
import DynamicImage from "../dynamicImage";
import YellowArrowButton from "../yellow_arrow_button";

export default function InvestmentContent({ data }) {
  const videourl =
    process.env.NEXT_PUBLIC_IMG_ENDPOINT +
    data.section_2_video.data.attributes.url;
  const videoType = data.section_2_video.data.attributes.mime;
  return (
    <>
      <Container className="mt-5">
        <Bluepill text={data.section_2.subtitle} />
        <h2 data-aos="fade-up" className="mt-3">
          {data.section_2.title}
        </h2>
        <p data-aos="fade-up">{data.section_2.description}</p>
        <div data-aos="fade-up" className={`my-2 ${styles.videoblock}`}>
          <video className={styles.actualVideo} controls>
            <source src={videourl} type={videoType} />
          </video>
        </div>
        <Row className="mt-5">
          <Col lg={7}>
            <div data-aos="fade-up" className={styles.imageblock}>
              <DynamicImage src={data.section_3.image} objectFit="cover" />
            </div>
          </Col>
          <Col lg={5}>
            <div data-aos="fade-up">{data.section_3.description}</div>
            <div data-aos="fade-up" className="mt-2">
              <YellowArrowButton
                text={data.section_3.link_text}
                link={data.section_3.link}
              />
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="my-5 pb-5">
        <Bluepill text={data.section_4.subtitle} />
        <h2 data-aos="fade-up" className="mt-3">
          {data.section_4.title}
        </h2>
        <p data-aos="fade-up">{data.section_4.description}</p>
        <Row className="mt-4">
          {data.section_4_cards.map((each, index) => {
            return (
              <Col md={6} lg={4} key={index}>
                <div data-aos="fade-up" className={styles.card}>
                  <div className={styles.cardimg}>
                    <DynamicImage src={each.image} objectFit="cover" />
                  </div>
                  <h5 className="mt-3">{each.heading}</h5>
                  <div className={`small mb-4 ${styles.descp}`}>
                    {each.description}
                  </div>
                  <div className="mt-auto">
                    <YellowArrowButton text={each.link_text} link={each.link} />
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

