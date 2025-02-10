import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import Bluepill from "../bluepill"
import DynamicImage from "../dynamicImage"
import YellowArrowButton from "../yellow_arrow_button"

export default function LeanSubHero({ data }) {
    return (<Container className="my-5 py-4">
        <Bluepill text={data.subtitle} />
        <Row className="mt-5 gx-5">
            <Col lg={6}>
                <div data-aos="fade-up" className={styles.imgwrap}>
                    <DynamicImage src={data.image} objectFit="cover" />
                </div>
            </Col>
            <Col lg={6}>
                <h2 data-aos="fade-up">
                    {data.heading}
                </h2>
                <p data-aos="fade-up">
                    {data.description}
                </p>
                <div data-aos="fade-up">
                    <YellowArrowButton text={data.link_text} link={data.link} />
                </div>
            </Col>
        </Row>
    </Container>)
}