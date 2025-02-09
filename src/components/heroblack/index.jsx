import { Container } from "react-bootstrap"
import styles from "./styles.module.css"
import Image from "next/image"
import Link from "next/link"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";
import DynamicImage from "../dynamicImage";

function UnselectedIndicator({ onClickHandler, isSelected }) {
    return (<span data-shono="false" className={styles.indic} onClick={onClickHandler}>
    </span>)
}

function SelectedIndicator({ onClickHandler, isSelected }) {
    return (<span data-shono="true" className={styles.indic} onClick={onClickHandler}>
    </span>)
}

function Card({ data }) {
    return (
        <Link target="_blank" href={data.link || '#'}>
            <div className={styles.card}>
                <DynamicImage src={data.image} objectFit="cover" />
                <div className={styles.overlay}>
                    <div>
                        <Image src="/instagram.webp" width={56} height={56} />
                    </div>
                    <div className="mt-1">
                        {data.link_text}
                    </div>
                </div>
            </div>
        </Link>)
}


export default function HeroBlack({ data }) {

    return (<Container fluid className={styles.cont}>
        <Container className="py-5">

            <div className="d-flex">
                <div className="me-auto">
                    <h4 className={`mt-4 ${styles.subtitle}`}>
                        {data.heading.subtitle}
                    </h4>
                    <h2>
                        {data.heading.title}
                    </h2>
                    <p className="small">
                        {data.heading.description}
                    </p>

                    <div className="mt-4 small">
                        <Link href={data.heading.cta_link || "#"}>
                            <div className={styles.pillbtn}>
                                {data.heading.cta_text}
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="ms-1 d-none d-lg-block">
                    <Image src="/hero_fancy_circles.svg" width={196} height={196} />
                </div>
            </div>

            <div className={`mt-5 d-none d-lg-block ${styles.carwrap}`}>
                <Carousel
                    // selectedItem={selected}
                    centerMode={true}
                    autoPlay={true}
                    showArrows={false}
                    showIndicators={true}
                    showStatus={false}
                    showThumbs={false}
                    centerSlidePercentage={33.33}
                    renderIndicator={(onClickHandler, isSelected, index, label) => {
                        if (isSelected) {
                            return (
                                <SelectedIndicator onClickHandler={onClickHandler} isSelected={isSelected} />
                            );
                        }
                        return (
                            <UnselectedIndicator onClickHandler={onClickHandler} isSelected={isSelected} />

                        );
                    }}

                >

                    {data.cards.map((each, index) => {
                        return (<Card key={index} data={each} />)
                    })}
                </Carousel>
            </div>

            <div className="mt-5 d-block d-lg-none">
                {data.cards.map((each, index) => {
                    return (<Card key={index} data={each} />)
                })}
            </div>
        </Container>
    </Container>)
}