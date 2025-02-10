import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import { useState } from "react";
import DynamicImage from "../dynamicImage";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";


function Card({ data }) {
    return (<div className={styles.card}>
        <div className={styles.heading}>
            <h4 className={styles.passiveheading}>{data.heading}</h4>
        </div>
        <div className={styles.coverage}>
            <div>
                <h5>
                    {data.heading}
                </h5>
            </div>
            <div className="mt-auto">
                <h6>
                    {data.subtitle}
                </h6>
                <p className="small">
                    {data.description}
                </p>
                <Link href={data.link || "#"}>
                    <div className={styles.cardcta}>
                        {data.link_text}
                    </div>
                </Link>
            </div>
        </div>
        <DynamicImage src={data.image} objectFit="cover" />
    </div>)
}

export default function HeroBlues({ datatop, databottom }) {
    const [selected, setSelected] = useState(0);
    const selectedTop = datatop[selected];
    const topItems = datatop.map(each => each.heading);


    const [selectedBot, setSelectedBot] = useState(0);

    const botLeft = () => {
        const delta = 3
        const next = selectedBot - delta;
        if (next < 0) {
            setSelectedBot(databottom.length - 1)
        } else {
            setSelectedBot(next)
        }
    }

    const botRight = () => {
        const delta = 3
        const next = selectedBot + delta;
        if (next >= databottom.length) {
            setSelectedBot(0)
        } else {
            setSelectedBot(next)
        }
    }

    return <Container className={`${styles.heroblues} py-5`} fluid>
        <Container className="py-5">
            <div className="d-flex flex-wrap">
                {topItems.map((each, index) => {
                    return (
                        <div data-aos="fade-up" data-aos-delay={100 * index} data-shono={index == selected} key={index} onClick={() => setSelected(index)} className={styles.topitem}>
                            {each}
                        </div>)
                })}
            </div>
            <Row className="mt-4 pb-5  gx-5">
                <Col lg={5}>
                    <div data-aos="fade-up" className={styles.imgbox}>
                        <DynamicImage src={selectedTop.image} objectFit="cover" />
                    </div>
                </Col>
                <Col lg={7}>
                    <div className="h-100 d-flex flex-column justify-content-center">
                        <div>
                            <h2 data-aos="fade-up" className={styles.bigtext}>
                                {selectedTop.heading}
                            </h2>
                            <h3 data-aos="fade-up" className={styles.lessbigtext}>
                                {selectedTop.subtitle}
                            </h3>
                            <p data-aos="fade-up" className={`small ${styles.smalltext}`}>
                                {selectedTop.description}
                            </p>
                            <div data-aos="fade-up" className="mt-3 small">
                                <Link href={selectedTop.link || "#"}>
                                    <div className={styles.pill}>
                                        {selectedTop.link_text}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

            <div className="d-none d-lg-flex">

                <div data-aos="fade-up" onClick={botLeft} className={styles.arrowbox}>
                    <Image src={"/hero_blue_left_arrow.svg"} width={50} height={50} />
                </div>
                <div data-aos="fade-up" className="flex-grow-1 mx-3">
                    <Carousel
                        selectedItem={selectedBot}
                        centerMode={true}
                        autoPlay={false}
                        showArrows={false}
                        showIndicators={false}
                        showStatus={false}
                        showThumbs={false}
                        centerSlidePercentage={33.33}>

                        {databottom.map((each, index) => {
                            return (<Card key={index} data={each} />)
                        })}
                    </Carousel>
                </div>
                <div  data-aos="fade-up" onClick={botRight} className={styles.arrowbox}>
                    <Image src={"/hero_blue_right_arrow.svg"} width={50} height={50} />
                </div>
            </div>

            <Row className="d-flex d-lg-none">
                {databottom.map((each, index) => {
                    return (
                        <Col lg={12} key={index}>
                            <Card data={each} />
                        </Col>)
                })}
            </Row>


        </Container>
    </Container>
}
