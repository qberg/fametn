import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import EvHeading from "../heading"
import DynamicImage from "../../dynamicImage"
import Link from "next/link"

function Card({ item }) {
    return (
        <Link href={item.link || "#"}>
            <div data-aos="fade-up" className={styles.card}>
                <DynamicImage src={item.image} objectFit="cover" />
                <div className="z-2 position-relative mt-auto">
                    <div className={styles.textbox}>
                        <h6 className="mb-1">
                            {item.heading}
                        </h6>
                        <div className={styles.smalltext}>
                            {item.description}
                        </div>
                    </div>
                </div>
            </div>
        </Link>)
}

export default function EvResources({ heading, items }) {
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
            {items.map((each, index) => {
                return (<Col lg={4} md={6} key={index}>
                    <Card item={each} />
                </Col>)
            })}
        </Row>
    </Container>)
}