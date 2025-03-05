import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import EvHeading from "../heading"
import Link from "next/link"
import DynamicImage from "../../dynamicImage"

function CollabCard({ item }) {
    return (<div data-aos="fade-up" className="p-5">
        <Link href={item.link || "#"}>
            <div className={styles.img}>
                <DynamicImage src={item.image} objectFit="contain" />
            </div>
        </Link>
    </div>)
}

export default function EvCollabs({ heading, items }) {
    return (<Container className="py-4 my-5">
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

        <Row className={`mt-4 ${styles.collabs}`}>
            {items.map((each, index) => {
                return (<Col lg={4} md={6} key={index} >
                    <CollabCard item={each} />
                </Col>)
            })}
        </Row>
    </Container>)
}