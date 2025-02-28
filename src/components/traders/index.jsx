import { Container, Row, Col } from "react-bootstrap"
import Bluepill from "../bluepill"
import { useState } from "react";
import styles from "./styles.module.css"
import Link from "next/link";
import Image from "next/image";
import { SelectOne } from "../tenders";

function IconItem({ path, data }) {
    return (<div className="d-flex my-2">
        <div className="my-auto">
            <Image src={path} alt="icon" width={17} height={17} />
        </div>
        <div className="my-auto ms-3 small">
            {data}
        </div>
    </div>)
}

function TradeAssBox({ data }) {
    return (<div data-aos="fade-up" className={styles.assbox}>
        <div className="mb-auto">
            <h6>
                {data.name}
            </h6>
        </div>
        <div className="mt-2">
            <IconItem path="/trader_person.svg" data={data.person} />
            <IconItem path="/trader_loc.svg" data={data.address} />
            <IconItem path="/trader_phone.svg" data={data.phone} />
            <IconItem path="/trader_morephone.svg" data={data.morephone} />
        </div>
    </div>)
}

export default function TradersComponent({ heading, data }) {
    const allAssTypes = [...new Set(data.map(each => each.type))].sort();
    const [current, setCurrent] = useState(allAssTypes[0]);
    const selectedAss = data.filter(each => each.type == current).sort(a => a.title);
    return (
        <Container className="my-5 ">
            <Bluepill text={heading.heading} />
            <hr></hr>
            <h2 data-aos="fade-up">
                {heading.description}
            </h2>
            <Row className="mt-5">
                <Col lg={3}>
                    <SelectOne heading={heading.heading} items={allAssTypes} selected={current} onSelect={setCurrent} />
                </Col>
                <Col lg={9}>
                    <h4 data-aos="fade-up">
                        {current}
                    </h4>
                    <Row className="mt-4">
                        {selectedAss.map((each, index) => {
                            return (<Col key={index} lg={6}  >
                                <TradeAssBox data={each} />
                            </Col>)
                        })}
                    </Row>
                </Col>
            </Row>
        </Container>)
}