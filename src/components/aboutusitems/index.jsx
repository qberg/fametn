import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import Bluepill from "../bluepill"
import DynamicImage from "../dynamicImage"
import Image from "next/image"

function Card({ item }) {
    return (<div data-aos="fade-up" className={styles.card}>
        <div>
            <Image src="/aboutus_icon.svg" width={30} height={30} />
        </div>
        <div className="mt-3">
            {item.text}
        </div>
    </div>)
}

function RenderItem({ item }) {
    return (<div className="mb-5">
        <div data-aos="fade-up" className="d-flex">
            <div className="my-auto me-3">
                <div className={styles.icon}>
                    <DynamicImage src={item.icon} objectFit="contain" />
                </div>
            </div>
            <div className="my-auto">
                <h3 className="mb-0">
                    {item.name}
                </h3>
            </div>
        </div>
        <Row className="mt-4">
            {item.items.map((each, index) => {
                return (<Col lg={4} md={6} key={index}>
                    <Card item={each} />
                </Col>)
            })}
        </Row>
    </div>)
}

export default function AboutUsItems({ heading, items }) {
    return (<Container className="my-5 py-4">
        <Bluepill text={heading.subtitle} />
        <h2 data-aos="fade-up" className="pt-3">
            {heading.title}
        </h2>
        <p data-aos="fade-up" className="small">
            {heading.description}
        </p>
        <hr></hr>
        <div className="mt-5">
            {items.map((item, index) => {
                return (<RenderItem key={index} item={item} />)
            })}
        </div>
    </Container>)
}