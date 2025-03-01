import { Col, Container, Row } from "react-bootstrap"
import styles from "./styles.module.css"
import Bluepill from "../bluepill"
import DynamicImage from "../dynamicImage"

function ItemCard({ item, index }) {
    let formattedNumber = (index + 1).toString().padStart(2, '0');

    return (<div  data-aos="fade-up" className="d-flex mb-4">
        <div className="me-4">
            <h4>
                {formattedNumber}
            </h4>
        </div>
        <div>
            <h4>
                {item.title}
            </h4>
            <p className="small">
                {item.description}
            </p>
        </div>
    </div>)
}

export default function AboutUsSection2({ data, heading }) {

    return (<Container className="my-5 py-4">
        <Bluepill text={heading.subtitle} />
        <hr></hr>

        <Row className="mt-4 pt-2 gx-5">
            <Col lg={6}>
                <div data-aos="fade-up" className={styles.img}>
                    <DynamicImage src={heading.image} objectFit="cover" />
                </div>
            </Col>
            <Col lg={6}>
                {data.map((each, index) => {
                    return (<ItemCard key={index} item={each} index={index} />)
                })}
            </Col>
        </Row>
    </Container>)
}