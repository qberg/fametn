import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import EvHeading from "../heading"
import EvGalleryGrid from "../evgallerygrid"


export default function EvGallery({ heading, items }) {
    return (<Container className="my-5 py-4">
        <Row>
            <Col lg={8}>
                <EvHeading text={heading.subtitle} />
            </Col>
            <Col lg={4}>
                <h2 data-aos="fade-up" data-aos-delay={200}>
                    {heading.title}
                </h2>
            </Col>
        </Row>
        <EvGalleryGrid items={items} />
    </Container>)
}