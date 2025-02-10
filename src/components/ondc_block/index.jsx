import { Col, Container, Row } from "react-bootstrap"
import styles from "./styles.module.css"
import DynamicImage from "../dynamicImage"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import YellowArrowButton from "../yellow_arrow_button";
import { useState } from "react";
import Image from "next/image";

export default function OndcBlock({ card, images }) {
    const [selectedItem, setSelectedItem] = useState(0);
    const totalItems = images.data.length;


    function next() {
        setSelectedItem((selectedItem + 1) % totalItems)
    }

    function prev() {
        setSelectedItem((selectedItem == 0) ? totalItems - 1 : selectedItem - 1)
    }

    return (<Container className="my-4 pt-5">
        <svg style={{
            visibility: "hidden",
            position: "absolute"
        }} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
                <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
            </defs>
        </svg>
        <Row>
            <Col lg={5}>
                <div data-aos="fade-up" className={styles.logo}>
                    <DynamicImage src={card.image} objectFit="contain" />
                </div>
                <h4 data-aos="fade-up" className="mt-3">
                    {card.heading}
                </h4>
                <p data-aos="fade-up" className="small">
                    {card.description}
                </p>
                <div data-aos="fade-up">
                    <YellowArrowButton text={card.link_text} link={card.link} />
                </div>
            </Col>
            <Col data-aos="fade-up" data-aos-delay={100} lg={7}>
                <Carousel
                    selectedItem={selectedItem}
                    showArrows={false}
                    showIndicators={false}
                    showStatus={false}
                    showThumbs={false}
                >
                    {images.data.map((each, index) => {
                        return (
                            <div key={index} className={styles.maathapithakkal}>
                                <div className={styles.carouselwrap} key={index}>
                                    <DynamicImage src={{ data: each }} objectFit="cover" />
                                </div>
                            </div>)
                    })}
                </Carousel>
                <div className="d-flex">
                    <div className={styles.indicator}>
                        <div className="d-flex">
                            <div onClick={() => prev()} className={styles.leftbutton}>
                                <Image src="/ondc_left_arrow.svg" height={10} width={10} />
                            </div>
                            <div className="my-auto d-flex">
                                {images.data.map((each, index) => {
                                    return (
                                        <div key={index} data-shono={index == selectedItem} className={styles.dot}>
                                        </div>
                                    )
                                })}
                            </div>

                            <div onClick={() => next()} className={styles.rightbutton}>
                                <Image src="/ondc_right_arrow.svg" height={10} width={10} />
                            </div>
                        </div>
                    </div>
                </div>

            </Col>
        </Row>
    </Container>)
}