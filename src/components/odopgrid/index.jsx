import { Col, Container, Row } from "react-bootstrap"
import styles from "./styles.module.css"
import Bluepill from "../bluepill"

function Card({ item }) {
    return (
        <div data-aos="fade-up" className={styles.card}>
            <h3 className={styles.numbers}>{item.title}</h3>
            <p className="small">
                {item.description}
            </p>
        </div>)
}

export default function OdopGrid({ heading, items }) {
    return (<Container className="my-5">
        <Bluepill text={heading} />
        <hr></hr>
        <Row className="mt-4">
            {items.map((item, index) => <Col key={index} md={6} lg={4}>
                <Card item={item} />
            </Col>)}
        </Row>

    </Container>)
}