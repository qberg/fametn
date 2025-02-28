import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import Bluepill from "../bluepill"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function SelectOne({ heading, items, selected, onSelect }) {
    return (
        <div data-aos="fade-up" className={styles.greybox}>
            <h4 data-aos="fade-up" className="py-2">
                {heading}
            </h4>
            {items.map((each, item) => {
                return (
                    <div
                        data-aos="fade-up"
                        key={item}
                        onClick={() => onSelect(each)}
                        data-shono={each == selected}
                        className={styles.eachone}>
                        {each}
                    </div>)
            })}
        </div>)
}

function TenderBox({ data }) {
    const fullUrl = process.env.NEXT_PUBLIC_IMG_ENDPOINT + data.pdf.data.attributes.url;
    return (<div data-aos="fade-up" className={styles.tenderbox}>
        <div>
            {data.title}
        </div>
        <div className="mt-1 mb-4">
            <Link href={fullUrl} className={styles.minicta} target="_blank" >
                {data.mini_cta}
            </Link>
        </div>
        <div className="mt-auto">
            <Link href={fullUrl} download={true} target="_blank">
                <div className={styles.cta} >
                    <div className="my-auto me-1">
                        <Image src="/tenderdownload.svg" alt="" width={16} height={16} />
                    </div>
                    <div className="my-auto">
                        {data.cta}
                    </div>
                </div>
            </Link>
        </div>
    </div>)
}

export default function TendersComponent({ heading, data }) {

    const allTenderTypes = [...new Set(data.map(each => each.type))].sort();
    const [current, setCurrent] = useState(allTenderTypes[0]);

    const selectedTenders = data.filter(each => each.type == current).sort(a => a.title);

    return (<Container className="my-5 ">
        <Bluepill text={heading.heading} />
        <hr></hr>
        <h2 data-aos="fade-up">
            {heading.description}
        </h2>
        <Row className="mt-5">
            <Col lg={3}>
                <SelectOne heading={heading.heading} items={allTenderTypes} selected={current} onSelect={setCurrent} />
            </Col>
            <Col lg={9}>
                <h4 data-aos="fade-up">
                    {current}
                </h4>
                <Row className="mt-4">
                    {selectedTenders.map((each, index) => {
                        return (<Col key={index} lg={4} md={6} >
                            <TenderBox data={each} />
                        </Col>)
                    })}
                </Row>
            </Col>
        </Row>
    </Container>)
}