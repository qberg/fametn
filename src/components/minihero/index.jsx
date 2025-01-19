import styles from "./minihero.module.css"
import { Row, Col, Container } from "react-bootstrap"
import YellowArrowButton from "../yellow_arrow_button";
import DynamicImage from "../dynamicImage";

export default function Minihero({ data }) {
    return (
        <Container className="mt-5 py-5">
            <Row>
                <Col md={5}>
                    <h2 className={styles.title}>
                        {data.heading}
                    </h2>
                    <h2 className={styles.subtitle}>
                        {data.subtitle}
                    </h2>
                    <p className="mt-3">
                        {data.description}
                    </p>
                    <YellowArrowButton text={data.link_text} link={data.link} />

                </Col>
                <Col md={7}>
                    <div className={styles.image}>
                        <DynamicImage objectFit="contain" src={data.image} />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}