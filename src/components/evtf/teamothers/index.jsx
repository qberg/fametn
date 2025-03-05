import { Col, Container, Row } from "react-bootstrap"
import styles from "./styles.module.css"
import DynamicImage from "../../dynamicImage"
import Link from "next/link"

function Card({ item }) {
    return (<div data-aos="fade-up" className={styles.card}>
        <div className={styles.img}>
            <DynamicImage src={item.image} objectFit="cover" />
        </div>
        <div className="p-3">
            <h6 className="mb-1">
                {item.heading}
            </h6>
            <div>
                {item.subtitle}
            </div>
            <div className="small">
                {item.description}
            </div>
            <div>
                <Link href={"mailto:" + item.link || "#"}>
                    <u className={styles.mail}>
                        {item.link}
                    </u>
                </Link>
            </div>
        </div>
    </div>)
}

export default function EvOthers({ items }) {
    console.log(items)
    console.log("ITEMS ^")
    return (<Container className="my-5 py-4">
        <Row>
            {items.map((each, index) => {
                return (<Col lg={4} md={6} key={index}>
                    <Card item={each} />
                </Col>)
            })}
        </Row>
    </Container>)
}