import { Container, Row, Col } from "react-bootstrap"
import styles from "./style.module.css"
import Bluepill from "../bluepill"
import YellowArrowButton from "../yellow_arrow_button"
import DynamicImage from "../dynamicImage"

function ImageBlock({ data }) {
    return (<div className={styles.imgbox}>
        <DynamicImage src={data.image} objectFit="cover" />
        <div className={styles.lablebox}>
            {data.subtitle}
        </div>
    </div>)
}

export default function TestingLabGallery({ header, images }) {
    return (
        <Container className={`${styles.yellowbgcon} py-4`} fluid>
            <Container className="my-5">
                <Bluepill text={header.subtitle} />
                <h2 data-aos="fade-up" className="mt-3">
                    {header.title}
                </h2>
                <div data-aos="fade-up" className="d-flex">
                    <div className="me-auto">
                        {header.description}
                    </div>
                    <div className="ms-2">
                        <YellowArrowButton text={header.cta_text} link={header.cta_link} />
                    </div>
                </div>
                <Row data-aos="fade-up" className="mt-4">
                    <Col md={4}>
                        <ImageBlock data={images[0]} />
                    </Col>
                    <Col md={4}>
                        <ImageBlock data={images[1]} />
                    </Col>
                    <Col md={4}>
                        <ImageBlock data={images[2]} />
                    </Col>
                </Row>
            </Container>
        </Container>)
}