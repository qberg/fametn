import { Col, Container, Row } from "react-bootstrap"
import styles from "./multiheading.module.css"
import YellowArrowButton from "../yellow_arrow_button"

export default function Multiheading({ heading, cards }) {
    return (
    <Container className={`py-5 ${styles.bgmusic}`} fluid>
        <Container>
        <h2 className={styles.heading}>
            {heading}
        </h2>
        {cards.map((each, key) => (
            <div key={key} className="pt-4">
                <Row>
                    <Col md={7}>
                        <h5>
                            {each.title}
                        </h5>
                    </Col>
                    <Col md={5} className={styles.smallcard}>
                        <div className={styles.innercard}>
                            <h6>
                                {each.subtitle}
                            </h6>
                            <p>
                                {each.description}
                            </p>
                            <YellowArrowButton text={each.cta_text} link={each.cta_link} />
                        </div>
                    </Col>
                </Row>
            </div>
        ))}
        </Container>
    </Container>)
}