import { Col, Container, Row } from "react-bootstrap"
import styles from "./styles.module.css"
import DynamicImage from "../../dynamicImage"
import EvHeading from "../heading"
import EvButton from "../button"

export default function EvAbout({ data }) {
    return (
        <Container className="my-5 py-4">
            <Row className="gx-5">
                <Col lg={6}>
                <div className="h-100 d-flex flex-column">
                    <div data-aos="fade-up" className="mb-4">
                        <EvHeading text={data.subtitle} />
                    </div>
                    <div className="mt-auto">
                        <h2 data-aos="fade-up">
                            {data.heading}
                        </h2>
                        <p data-aos="fade-up" className="small">
                            {data.description}
                        </p>
                    </div>
                    <div data-aos="fade-up" className="mt-4">
                        <EvButton link={data.link} text={data.link_text} />
                    </div>
                </div>
                </Col>
                <Col lg={6}>
                    <div data-aos="fade-up" data-aos-delay={100} className={styles.img}>
                        <DynamicImage src={data.image} objectFit="cover" />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}