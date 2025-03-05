import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import EvHeading from "../heading"
import DynamicImage from "../../dynamicImage"
import Link from "next/link"

export default function EvABoutResponsibility({ data, images }) {
    return (<Container fluid className={`${styles.bg} py-5`}>
        <Container className="py-4">
            <Row className="gx-5">
                <Col lg={6}>
                    <h2 data-aos="fade-up">
                        {data.heading}
                    </h2>
                    <div className="mt-4">
                        <div className={styles.cover}>
                            <div data-aos="fade-up" className={styles.back}>
                                <DynamicImage src={{ data: images[0] }} objectFit="cover" />
                            </div>

                            <div data-aos="fade-up" className={styles.front}>
                                <DynamicImage src={{ data: images[1] }} objectFit="cover" />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg={6}>
                    <div className="h-100 d-flex ">
                        <div className="my-auto">
                            <h6 data-aos="fade-up">
                                {data.description_1}
                            </h6>
                            <p data-aos="fade-up" className="small">
                                {data.description_2}
                            </p>
                            <div className="d-flex mt-4">
                                <div data-aos="fade-up" className={styles.logo}>
                                    <DynamicImage src={{ data: data.logo.data[0] }} objectFit="contain" />
                                </div>
                                <div className="ms-3 my-auto">
                                    <h6 data-aos="fade-up" className="mb-0">
                                        {data.logo_title}
                                    </h6>
                                    <div data-aos="fade-up" className="small">
                                        {data.logo_subtitle}
                                    </div>
                                </div>
                            </div>
                            <h6 data-aos="fade-up" className="mt-4">
                                {data.description_3}
                            </h6>
                            <div data-aos="fade-up" className="mt-2">
                                <Link href={"mailto:" + data.email || "#"}>
                                    <u className={styles.mail}>
                                        {data.email}
                                    </u>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </Container>)
}