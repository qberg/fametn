import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import DynamicImage from "../../dynamicImage";



export default function EvHero({ heading_1, heading_2, heading_3, subhero, img }) {
    return (<div className={`${styles.holder} position-relative`}>
        <div className={styles.evbg}>
            <DynamicImage src={img} objectFit="cover" />
        </div>
        <Container >
            <div className={styles.stuff}>
                <div className="mt-auto w-100">
                    <Row className="m4-5">
                        <Col lg={7}>
                            <h1 data-aos="fade-up" className={styles.wth}>
                                {heading_1}
                            </h1>
                            <h1 data-aos="fade-up" className={styles.gth}>
                                {heading_2}
                            </h1>
                            <h1 data-aos="fade-up" className={styles.wth}>
                                {heading_3}
                            </h1>
                        </Col>
                        <Col lg={5}>
                        <div className="d-flex h-100">
                            <div className=" ms-lg-auto mt-auto">
                                <div data-aos="fade-up" className={styles.card}>
                                    <h5 data-aos="fade-up">
                                        {subhero.title}
                                    </h5>
                                    <div data-aos="fade-up">
                                        {subhero.description}
                                    </div>
                                </div>
                            </div>

                        </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Container>
    </div>)
}