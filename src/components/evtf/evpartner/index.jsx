import { Col, Container, Row } from "react-bootstrap"
import styles from "./styles.module.css"
import DynamicImage from "../../dynamicImage"
import EvHeading from "../heading"
import Image from "next/image"
import YellowArrowButton from "../../yellow_arrow_button"

export default function EvPartner({ data }) {
    return (<Container fluid className={`py-5 ${styles.cover} px-0`}>

        <div data-aos="fade-up" className={styles.bg}>
            <DynamicImage src={data.image} objectFit="cover" />
        </div>
        <Container>
            <Row>
                <Col lg={6}>
                    <div data-aos="fade-up">
                        <EvHeading text={data.subtitle} />
                    </div>

                    <div className="d-flex mt-4">
                        <div className="my-auto me-2">
                            <h2 data-aos="fade-up" className="mb-0">
                                {data.heading}
                            </h2>
                        </div>
                        <div data-aos="fade-up" className={`my-auto ${styles.arrow}`}>
                            <Image src="/evtf_arrow.svg" height={44} width={44} />
                        </div>
                    </div>

                    <p data-aos="fade-up" className="small mt-2">
                        {data.description}
                    </p>

                    <div data-aos="fade-up">
                        <YellowArrowButton link={data.link} text={data.link_text} />
                    </div>
                </Col>
            </Row>
        </Container>
    </Container>)
}