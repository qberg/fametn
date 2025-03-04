import { Col, Container, Row } from "react-bootstrap"
import styles from "./styles.module.css"
import DynamicImage from "../../dynamicImage"
import EvHeading from "../heading"
import EvButton from "../button"

export default function EvTeam({ heading, item }) {
    return (<Container className={`py-5 ${styles.cover}`} fluid>
        <Container>
            <Row className="gx-5">
                <Col lg={6}>
                    <div data-aos="fade-up" className={styles.img}>
                        <DynamicImage src={item.image} objectFit="cover" />
                    </div>
                </Col>
                <Col lg={6}>
                    <div data-aos="fade-up">
                        <EvHeading text={heading} />
                    </div>
                    <h2 data-aos="fade-up" className="mt-3">
                        {item.heading}
                    </h2>
                    <h5 data-aos="fade-up" className={styles.job}>
                        <i>{item.subtitle}</i>
                    </h5>
                    <p data-aos="fade-up" className="small">
                        {item.description}
                    </p>
                    <div data-aos="fade-up">
                        <EvButton link={item.link} text={item.link_text} />
                    </div>
                </Col>
            </Row>
        </Container>
    </Container>)
}