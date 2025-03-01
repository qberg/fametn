import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import Bluepill from "../bluepill"
import YellowArrowButton from "../yellow_arrow_button"
import DynamicImage from "../dynamicImage"

export default function OdopSection2({ data }) {
    return (<Container className="my-5">
        <Bluepill text={data.subtitle} />
        <hr></hr>
        <Row className="mt-5">
            <Col lg={6}>
                <h2 data-aos="fade-up">{data.heading}</h2>
                <p data-aos="fade-up" className="small">
                    {data.description}
                </p>
                <div data-aos="fade-up">
                    <YellowArrowButton text={data.link_text} link={data.link} />
                </div>
            </Col>
            <Col lg={6}>
                <div data-aos="fade-up" className={styles.imgholder}>
                    <DynamicImage src={data.image} objectFit="cover" />
                </div>
            </Col>
        </Row>
    </Container>)
}