import { Col, Container, Row } from "react-bootstrap"
import styles from "./styles.module.css"

export default function TeamsHero({data}) {
    return (<Container className="mt-5 pt-4">
        <Row>
            <Col lg={7}>
                <h2 data-aos="fade-up">
                    {data.heading}
                </h2>
            </Col>
            <Col lg={5}>
                <p data-aos="fade-up"  data-aos-delay={150  } className="small">
                    {data.description}
                </p>
            </Col>
        </Row>
    </Container>)
}