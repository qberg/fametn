import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import EvHeading from "../heading"
import DynamicImage from "../../dynamicImage"

function RenderCol({ item }) {
    return (<Col lg={3}>
        <div data-aos="fade-up" className={styles.col}>
            <div className="mb-auto">
                <h2 className={styles.number}>
                    {item.subtitle}
                </h2>
            </div>
            <div className="mt-3">
                <p className="mb-1">
                    {item.title}
                </p>
                <p className="small mb-1">
                    {item.description}
                </p>
            </div>
        </div>
    </Col>)
}

function RenderImage({ img }) {
    return (<Col lg={6}>
        <div data-aos="fade-up" className={styles.img}>
            <DynamicImage src={img} objectFit="cover" />
        </div>
    </Col>)
}

function RenderRow({ item, flip }) {
    const col_1 = (<RenderCol item={item.col_1} />)
    const col_2 = (<RenderCol item={item.col_2} />)
    const img = (<RenderImage img={item.img} />)
    const order = flip ? [img, col_1, col_2] : [col_1, col_2, img]
    return (<Row>
        {order}
    </Row>)

}

export default function EvAboutUs({ heading, rows }) {
    return (<Container className="my-5 py-4">
        <div className="d-block d-lg-flex">
            <div data-aos="fade-up" className="me-auto my-auto">
                <EvHeading text={heading.heading} />
            </div>
            <div data-aos="fade-up" className="mt-3 mt-lg-auto mb-auto">
                <h2>
                    {heading.description}
                </h2>
            </div>
        </div>
        <div className="mt-4">
            {rows.map((item, index) => {
                return (<RenderRow item={item} flip={index % 2 === 1} key={index} />)
            })}
        </div>
    </Container>)
}