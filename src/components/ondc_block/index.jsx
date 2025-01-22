import { Col, Container, Row } from "react-bootstrap"
import styles from "./styles.module.css"
import DynamicImage from "../dynamicImage"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function OndcBlock({ card, images }) {
    return (<Container className="my-4 pt-5">
        <Row>
            <Col lg={5}>
                <div className={styles.logo}>
                    <DynamicImage src={card.image}  objectFit="contain"/>
                </div>
                <h4 className="mt-3">
                    {card.heading}
                </h4>
                <p className="small">
                    {card.description}
                </p>
            </Col>
            <Col lg={2}>
                IMAGES HERER
            </Col>
        </Row>
    </Container>)
}