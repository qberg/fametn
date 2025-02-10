import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import Bluepill from "../bluepill"
import DynamicImage from "../dynamicImage"

function LeanItem({ data }) {

    return (
        <div data-aos="fade-up" className={styles.leanitem}>
            <h5>{data.heading}</h5>
            <p className="mb-0">{data.description}</p>
        </div>)
}
export default function LeanBlock({ data }) {
    return (
        <Container className="my-5 py-4">
            <Bluepill text={data.supertitle} />
            <h2 data-aos="fade-up" className="mt-3">
                {data.title}
            </h2>
            <Row className="mt-4 gx-5">
                <Col className="mt-3" lg={6} >
                    {data.items.map((each, index) => {
                        return (<LeanItem data={each} key={index} />)
                    })}
                </Col>
                <Col className="mt-3" lg={6} >
                    <div className={styles.canvas}>
                        <div data-aos="fade-up" className={styles.backimage}>
                            <DynamicImage src={data.back_image} objectFit="cover" />
                        </div>
                        <div data-aos="fade-up" className={styles.frontimage}>
                            <DynamicImage src={data.front_image} objectFit="cover" />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>)
}