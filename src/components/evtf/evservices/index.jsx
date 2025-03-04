import { Col, Container, Row } from "react-bootstrap"
import styles from "./styles.module.css"
import EvHeading from "../heading"
import DynamicImage from "../../dynamicImage"

function ServiceCard({ item }) {
    return (<div data-aos="fade-up" className={styles.card}>
        <div className={styles.img}>
            <DynamicImage src={item.image} objectFit="cover" />
        </div>
        <div className="p-3">
            <h6 data-aos="fade-up">
                {item.heading}
            </h6>
        </div>
    </div>)
}


export default function EvServices({ heading, items }) {
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
        <Row className="gx-5 mt-4">
            {items.map((item, index) => {
                return (<Col lg={4} md={6} key={index} className="pb-4">
                    <ServiceCard item={item} />
                </Col>)
            })}
        </Row>
    </Container>)
}