import { Container, Row, Col } from "react-bootstrap";
import YellowArrowButton from "../yellow_arrow_button";
import styles from "./styles.module.css";
import DynamicImage from "../dynamicImage";
import ResourcesImageCard from "../resourceimagecard";

function OndcCard({ data }) {
    return (<div className={styles.card}>
        <DynamicImage src={data.image} objectFit="cover" />
    </div>)
}

export default function OndcThreeChannel({ header, items }) {
    console.log(header)
    return (<Container className="my-5 py-4">
        <div className="mb-1">
            {header.subtitle}
        </div>
        <div className="d-flex">
            <div className="me-auto">
                <h2>
                    {header.title}
                </h2>
                <p>
                    {header.description}
                </p>
            </div>
            <div className="ms-2 mys-auto">
                <YellowArrowButton text={header.cta_text} link={header.cta_link} />
            </div>
        </div>
        <hr></hr>
        <Row className="mt-4">
            {items.map((each, index) => {
                return (<Col key={index} lg={4}>
                    <ResourcesImageCard data={each} downloadEnabled={false} />
                    {/* <OndcCard data={each} /> */}
                </Col>)
            })}
        </Row>

    </Container>)
}