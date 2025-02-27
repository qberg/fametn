import { Col, Container, Row } from "react-bootstrap"
import styles from "./styles.module.css"
import DynamicImage from "../dynamicImage"

export default function MidHero({ data }) {
    return (<Container className="p-4">
        <div data-aos="fade-up" className={styles.midherobg}>
            <Row className="h-100 z-2 position-relative gx-5">
                <Col lg={6}>
                    <div className="h-100 d-flex">
                        <div className="my-auto">
                            <div data-aos="fade-up" className={styles.supertitle}>
                                <h3 className="mb-0">
                                    {data.supertitle}
                                </h3>
                            </div>
                            <div data-aos="fade-up" data-aos-delay={100} className="mt-3">
                                <h3 className="text-uppercase">
                                    {data.title}
                                </h3>
                            </div>
                            <div data-aos="fade-up" data-aos-delay={200} >
                                {data.description}
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className="h-100 d-flex" lg={6}>
                    <div className={styles.imgholder}>
                        <div data-aos="fade-up" data-aos-delay={200} className={styles.backimg}>
                            <DynamicImage src={data.image_1} objectFit="cover" />
                        </div>

                        <div data-aos="fade-up" data-aos-delay={300} className={styles.frontimg}>
                            <DynamicImage src={data.image_2} objectFit="cover" />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </Container>)
}