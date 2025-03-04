import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css"
import Link from "next/link";
import Image from "next/image";
import DynamicImage from "../../dynamicImage";


export default function EvTeamHero({ hero, mainperson, x, linkedin }) {
    return (<Container className="my-5 py-4">
        <Row>
            <Col data-aos="fade-up" lg={3} >
                <h1 className="text-uppercase">
                    {hero.heading}
                </h1>
            </Col>
            <Col lg={3} />
            <Col lg={6}>
                <p data-aos="fade-up" data-aos-delay={200} className="small">
                    {hero.description}
                </p>
            </Col>
        </Row>
        <div className="mt-5">
            <div data-aos="fade-up" className={styles.box}>
                <Row>
                    <Col className="mt-lg-3" lg={5}>
                        <center>
                            <div data-aos="fade-up" className={styles.img}>
                                <DynamicImage src={mainperson.image} objectFit="cover" />
                            </div>
                        </center>
                    </Col>
                    <Col lg={7}>
                        <h3 data-aos="fade-up" className="mt-4 mb-2">
                            {mainperson.heading}
                        </h3>
                        <h5 data-aos="fade-up" className={styles.job}>
                            <i>{mainperson.subtitle}</i>
                        </h5>
                        <p data-aos="fade-up" className="small">
                            {mainperson.description}
                        </p>
                        <Link className="mt-4" href={mainperson.link || "#"}>
                            <u data-aos="fade-up">{mainperson.link_text}</u>
                        </Link>
                        <div className="mt-3 d-flex">
                            <div data-aos="fade-up" className="me-4">
                                <Link href={linkedin || "#"}>
                                    <Image src="/mainpersonlinkedin.svg" height={32} width={32} />
                                </Link>
                            </div>
                            <div data-aos="fade-up">
                                <Link href={x || "#"}>
                                    <Image src="/mainpersonx.svg" height={32} width={32} />
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    </Container>)
}