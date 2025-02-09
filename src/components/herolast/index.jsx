import { Container, Row, Col } from "react-bootstrap";
import styles from "./style.module.css";
import DynamicImage from "../dynamicImage";
import YellowArrowButton from "../yellow_arrow_button";
import Link from "next/link";
import Image from "next/image";

function HumansAndLinks({ data }) {
    return (
        <Link href={data.link || "#"}>
            <div className={styles.humancard}>
                <div className={styles.humanimg}>
                    <DynamicImage src={data.image} objectFit="cover" />
                </div>
                <div className="mt-2 text-center">
                    <u>{data.link_text}</u>
                </div>
            </div>
        </Link>
    )
}

export default function HeroLast({ data }) {
    console.log(data)

    const AddressCard = () => {
        return (
            <Link href={data.location_google || "#"}>
                <div className={styles.address}>
                    <Image src="/home_address.svg" width={40} height={40} />
                    <p className="mt-3 small">
                        {data.address}
                    </p>
                </div>
            </Link>)
    }

    return (
        <Container className={styles.cont} fluid>
            <DynamicImage src={data.image} objectFit="cover" />
            <Container className={`py-5 ${styles.inner}`}>
                <Row className="py-5">
                    <Col lg={6}>
                        <div className={styles.card}>
                            <h4 className={styles.subtitle}>{data.heading.subtitle}</h4>
                            <h2>
                                {data.heading.title}
                            </h2>
                            <p className="small">
                                {data.heading.description}
                            </p>
                            <div className="mt-3 mb-5">
                                <YellowArrowButton text={data.heading.cta_text} link={data.heading.cta_link} />
                            </div>

                            <div className="mt-auto d-flex flex-wrap">
                                {data.humans_and_links.map((each, index) => {
                                    return (<HumansAndLinks key={index} data={each} />)
                                })}
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="d-flex h-100">
                            <div className="d-none d-lg-block ms-auto my-auto">
                                <AddressCard />
                            </div>
                            
                            <div className="d-block d-lg-none mx-auto mt-5">
                                <AddressCard />
                            </div>
                        </div>
                        
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}