import { Row, Col, Container } from "react-bootstrap"
import styles from "./branding.module.css"
import Image from "next/image"
import Link from "next/link"
import YellowArrowButton from "../yellow_arrow_button"
import DynamicImage from "../dynamicImage"

export default function BrandingGallery({ data, download, images }) {
    return (
        <Container className="my-5">
            <div className="d-flex">
                <div className="my-auto">
                    <h2 data-aos="fade-up">
                        {data.title}
                    </h2>
                </div>
                <div className="ms-auto my-auto">
                    <Link target='_blank' href={download.url}>
                        <div data-aos="fade-up" data-aos-delay={300} className={styles.downloadbutton}>
                            <div className="my-auto">
                                {download.text}
                            </div>
                            <div className="ms-2 my-auto">
                                <Image alt="" src="/branding_download.svg" height={12} width={12} />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <div data-aos="fade-up" className="mt-3 mb-3">
                {data.description}
            </div>
            <div data-aos="fade-up">
                <YellowArrowButton text={data.cta_text} link={data.cta_link} />
            </div>
            <Row className="mt-4">
                <Col className={styles.nomb} lg={5}>
                    <Row>
                        <Col md={6} lg={12}>
                            <div data-aos="fade-up" className={styles.img1}>
                                <DynamicImage src={{ data: images.data[0] }} objectFit="cover" />
                            </div>
                        </Col>
                        <Col md={6} lg={12}>
                            <div data-aos="fade-up" className={styles.img1}>
                                <DynamicImage src={{ data: images.data[1] }} objectFit="cover" />
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={3}>
                    <div data-aos="fade-up" className={styles.img3}>
                        <DynamicImage src={{ data: images.data[2] }} objectFit="cover" />
                    </div>

                </Col>
                <Col lg={4}>
                    <Col lg={12}>
                        <div data-aos="fade-up" className={styles.img4}>
                            <DynamicImage src={{ data: images.data[3] }} objectFit="cover" />
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div data-aos="fade-up" className={styles.img5}>
                            <DynamicImage src={{ data: images.data[4] }} objectFit="cover" />
                        </div>
                    </Col>
                </Col>
            </Row>
        </Container>
    )
}