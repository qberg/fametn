import { Col, Container, Row } from "react-bootstrap"
import styles from "./style.module.css"
import YellowArrowButton from "../yellow_arrow_button"
import Image from "next/image"
import DynamicImage from "../dynamicImage"

export default function TestingLabHero({ data }) {
    return (
        <Container className={styles.megacontainer} fluid>
            <Container className={`py-5 ${styles.minicontainer}`}>
                <Row className="py-5">
                    <Col lg={7}>
                        <div className="d-flex h-100">
                            <div>
                                <h1 data-aos="fade-up">
                                    {data.heading}
                                </h1>
                                <div data-aos="fade-up" className="mt-3">
                                    {data.description}
                                </div>
                                <div data-aos="fade-up" className="mt-4">
                                    <YellowArrowButton text={data.link_text} link={data.link} />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={1}></Col>
                    <Col lg={4}>
                        <div data-aos="fade-up" data-aos-delay={100} className={styles.imgwrap}>
                            <div className={styles.imginner}>
                                <DynamicImage src={data.image} objectFit="cover" />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}