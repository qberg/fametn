import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import EvHeading from "../heading"
import DynamicImage from "../../dynamicImage"
import Link from "next/link"


function ContactCard({ item }) {
    return (<div data-aos="fade-up" className={styles.card}>
        <div className={styles.icon}>
            <DynamicImage src={item.image} objectFit="contain" />
        </div>
        <h5 className="mt-4">
            {item.heading}
        </h5>
        <div className="small">
            {item.description}
        </div>
        <div className="mt-auto">
            hii
        </div>
        <Link className={styles.mail} href={"mailto:" + item.subtitle}>
            <u>
                {item.subtitle}
            </u>
        </Link>
    </div>)
}

export default function EvContact({ heading, items }) {
    return (<Container fluid className={`my-5 py-5 ${styles.bg}`}>
        <Container>
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
                {items.map((each, index) => {
                    return (<Col lg={4} md={6} key={index}>
                        <ContactCard item={each} />
                    </Col>)
                })}
            </Row>
        </Container>
    </Container>)
}