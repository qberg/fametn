import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.css";
import Bluepill from "../bluepill";
import DynamicImage from "../dynamicImage";
import YellowArrowButton from "../yellow_arrow_button";

export default function EnergyCard({ data }) {
    return (
        <Container className="my-5">
            <Bluepill text={data.subtitle} />
            <h2 data-aos="fade-up" className="mt-3">
                {data.heading}
            </h2>
            <hr data-aos="fade-up" className="my-4"></hr>
            <Row>
                <Col lg={7}>
                    <div data-aos="fade-up" className={styles.img}>
                        <DynamicImage src={data.image} objectFit="cover" />
                    </div>
                </Col>
                <Col lg={5}>
                <div data-aos="fade-up">
                    {data.description}
                </div>
                <div data-aos="fade-up" className="mt-3">
                    <YellowArrowButton text={data.link_text} link={data.link} />
                </div>
                </Col>
            </Row>
        </Container>
    );
}