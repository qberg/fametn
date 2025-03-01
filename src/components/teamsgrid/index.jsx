import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import DynamicImage from "../dynamicImage"

export function TeamsCard({data}) {
    return (<div data-aos="fade-up" className={styles.card}>
        <DynamicImage src={data.dp} objectFit="cover" />
        <div className="mt-auto z-2 p-3 w-100">
            <div className={styles.plate}>
                <h6 className="mb-1">
                    {data.name}
                </h6>
                <div className="small">
                    {data.job}
                </div>
            </div>
        </div>
    </div>)
}

export default function TeamsGrid({data}) {
    return (<Container className="my-5 py-4">
        <Row>
            {data.map((item, index) => {
                return (<Col lg={4} md={6} key={index}>
                    <TeamsCard data={item} />
                </Col>)
            })}
        </Row>
    </Container>)
}