import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import DynamicImage from "../dynamicImage"
import YellowArrowButton from "../yellow_arrow_button"

export default function AwardsSection({ data }) {
    return (<Container className="my-5 py-4">
        <Row className="gx-5">
            <Col lg={6}>
                <div data-aos="fade-up" className={styles.imgbox}>
                    <DynamicImage src={data.image} objectFit="cover" />
                </div>
            </Col>
            <Col lg={6}>
                <div className="my-5">
                    <h3 data-aos="fade-up">
                        {data.heading}
                    </h3>
                    <div data-aos="fade-up" className="small my-2 mb-4">
                        {data.description}
                    </div>
                    <div data-aos="fade-up">
                        <YellowArrowButton text={data.link_text} url={data.link} />
                    </div>
                </div>
            </Col>

        </Row>
    </Container>)
}