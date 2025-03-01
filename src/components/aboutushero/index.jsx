import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import YellowArrowButton, { JustArrowButton } from "../yellow_arrow_button";

export default function AboutUsHero({ data }) {
    const videoData = data.video.data.attributes;
    const videoUrl = process.env.NEXT_PUBLIC_IMG_ENDPOINT + videoData.url;
    const videoType = videoData.mime;

    return (
        <>
            <Container className="my-5 pt-4">
                <Row>
                    <Col lg={6}>
                        <h1 data-aos="fade-up" className={styles.heading}>
                            <span>
                                {data.heading}&nbsp;
                            </span>
                            <span className={styles.yellow}>
                                {data.heading_yellow}
                            </span>
                        </h1>
                    </Col>
                    <Col lg={6}>
                        <p data-aos-delay={100} data-aos="fade-up" className="small">
                            {data.description}
                        </p>
                        <div className="d-flex">
                            <div data-aos-delay={100} data-aos="fade-up" className="my-auto me-4">
                                <YellowArrowButton text={data.cta_1.text} link={data.cta_1.url} />
                            </div>
                            <div data-aos-delay={200} data-aos="fade-up" className="my-auto">
                                <JustArrowButton text={data.cta_2.text} link={data.cta_2.url} />
                            </div>
                        </div>
                    </Col>
                </Row>


            </Container>
            <Container fluid className={`my-5  ${styles.videoholder}`}>
                <Container>
                    <video data-aos="fade-up" className={styles.video} controls>
                        <source src={videoUrl} type={videoType} />
                    </video>
                </Container>
            </Container>
        </>)
}