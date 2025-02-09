import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import { useState } from "react";
import BorderPill from "../borderpill";
import DynamicImage from "../dynamicImage";
import Link from "next/link";
import Image from "next/image";

function SubCard({ data }) {
    return (
        <Link href={data.link}>
            <div className="d-flex mb-4">
                <div className={styles.subimg}>
                    <DynamicImage src={data.image} objectFit="cover" />
                </div>
                <div className="ms-4">
                    <h6 className={styles.caplink}>
                        {data.link_text}
                    </h6>
                    <h6 className="mb-1">
                        {data.heading}
                    </h6>
                    <p className={`small ${styles.subdesc}`}>
                        {data.description}
                    </p>
                </div>
            </div>
        </Link>)
}


export default function HeroSection2({ data }) {
    const [selected, setSelected] = useState(0);

    const selectedData = data[selected];

    const dataItems = data.map(each => each.heading.subtitle);

    return (
        <Container className="my-5 py-4">
            <Row>
                <Col lg={3}>
                    <div className={styles.imgbox}>
                        <DynamicImage src={selectedData.image} objectFit="contain" />
                    </div>
                    <h4 className="my-3">
                        {selectedData.subtitle}
                    </h4>
                    <div>
                        {dataItems.map((each, index) => {
                            return (
                                <div data-shono={index == selected} key={index} className={styles.sublink} onClick={() => setSelected(index)}>
                                    <div className="me-auto my-auto">
                                        <h5 className="mb-0">
                                            {each}
                                        </h5>
                                    </div>
                                    <div className="ms-1 my-auto">
                                        <Image src="/home_arrow_right.svg" width={20} height={20} />
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </Col>
                <Col lg={9}>
                    <h5 className={styles.caplink}>
                        {selectedData.heading.subtitle}
                    </h5>
                    <h2>
                        {selectedData.heading.title}
                    </h2>
                    <p>
                        {selectedData.heading.description}
                    </p>
                    <BorderPill text={selectedData.heading.cta_text} link={selectedData.heading.cta_link} />

                    <div className="mt-5">
                        {selectedData.cards.map((each, index) => {
                            return (<SubCard key={index} data={each} />)
                        })}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}