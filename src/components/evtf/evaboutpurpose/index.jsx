import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import EvHeading from "../heading"
import DynamicImage from "../../dynamicImage"

export default function EvAboutPurpose({ data }) {
    return (<Container className="my-5 py-4">
        <Row>
            <Col lg={6}>
                <h2 data-aos="fade-up">
                    {data.heading}
                </h2>
                <div data-aos="fade-up" className="small">
                    {data.description}
                </div>
            </Col>
            <Col lg={6}>
                <div data-aos="fade-up" className={styles.img}>
                    <DynamicImage src={data.image} objectFit="cover" />
                </div>
            </Col>
        </Row>
    </Container>)
}