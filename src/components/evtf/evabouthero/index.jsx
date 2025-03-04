import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import EvHeading from "../heading"
import DynamicImage from "../../dynamicImage"

export default function EvAboutHero({ heading, img_1, img_2 }) {
    return (<Container className="my-5 py-4">
        <EvHeading text={heading.subtitle} />
        <Row className="mt-4">
            <Col lg={6}>
                <h2 data-aos="fade-up">
                    {heading.title}
                </h2>
            </Col>
            <Col lg={6}>
                <p data-aos="fade-up" className="small mt-lg-2">
                    {heading.description}
                </p>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col lg={8}>
                <div data-aos="fade-up" className={styles.img}>
                    <DynamicImage src={img_1} objectFit="cover"/>
                </div>
            </Col>
            <Col lg={4}>
                <div data-aos="fade-up" data-aos-delay={200} className={styles.img}>
                    <DynamicImage src={img_2} objectFit="cover" />
                </div>
            </Col>
        </Row>
    </Container>)
}