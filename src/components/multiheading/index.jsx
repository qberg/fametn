import { Col, Container, Row } from "react-bootstrap"
import styles from "./multiheading.module.css"
import YellowArrowButton from "../yellow_arrow_button"

export default function Multiheading({ heading, cards }) {
    return (
    <Container className={`py-5 ${styles.bgmusic}`} fluid>
        <Container>
        <h2 data-aos="fade-up" className={styles.heading}>
            {heading}
        </h2>
        {cards.map((each, key) => (
            <div key={key} className="pt-4">
                <Row>
                    <Col data-aos="fade-up" md={7}>
                        <h5 data-aos="fade-up">
                            {each.title}
                        </h5>
                    </Col>
                    <Col data-aos="fade-up" md={5} className={styles.smallcard}>
                        <div data-aos="fade-up" className={styles.innercard}>
                            <h6 data-aos="fade-up">
                                {each.subtitle}
                            </h6>
                            <p data-aos="fade-up">
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