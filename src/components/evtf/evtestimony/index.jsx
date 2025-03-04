import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import EvHeading from "../heading";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import DynamicImage from "../../dynamicImage";

function Testimony({ item }) {
    return (<div data-aos="fade-up" className={styles.card}>
        <div className={styles.stars}>
            <Image src="/evstars.svg" height={24} width={100} />
        </div>
        <div className="mt-4 small mb-4">
            {item.description}
        </div>
        <div className="mt-auto d-flex">
            <div className="me-3 my-auto">
                <div className={styles.icon}>
                    <DynamicImage src={item.image} objectFit="cover" />
                </div>
            </div>
            <div className="my-auto small">
                <div>
                    {item.heading}
                </div>
                <div className={styles.job}>
                    {item.subtitle}
                </div>
            </div>
        </div>
    </div>)
}

function NextArrow({ onClickHandler, hasNext }) {
    return <div data-aos="fade-up" data-shono={hasNext} onClick={onClickHandler} className={styles.next}>
        <Image src="/evnext.svg" height={24} width={24} />
    </div>
}

function PrevArrow({ onClickHandler, hasPrev }) {
    return <div data-aos="fade-up" data-shono={hasPrev} onClick={onClickHandler} className={styles.prev}>
        <div className={styles.flipx}>
            <Image src="/evnext.svg" height={24} width={24} />
        </div>
    </div>
}

export default function EvTestimony({ heading, items }) {
    return (
        <Container className="my-5 py-4">
            <Row>
                <Col lg={8}>
                    <EvHeading text={heading.subtitle} />
                </Col>
                <Col lg={4}>
                    <h2 data-aos="fade-up" data-aos-delay={200}>
                        {heading.title}
                    </h2>
                </Col>
            </Row>
            <Row className="mt-4 d-none d-lg-block">
                <Carousel
                    centerMode={true}
                    showIndicators={false}
                    showStatus={false}
                    showThumbs={false}
                    renderArrowPrev={(onClickHandler, hasPrev, label) =>
                        (<PrevArrow onClickHandler={onClickHandler} hasPrev={hasPrev} />)}
                    renderArrowNext={(onClickHandler, hasNext, label) =>
                        (<NextArrow onClickHandler={onClickHandler} hasNext={hasNext} />)}

                    centerSlidePercentage={33.33}>
                    {items.map((item, index) => {
                        return (<div key={index} className="p-3 mb-5"><Testimony item={item} key={index} /></div>)
                    })}
                </Carousel>
            </Row>
            <Row className="mt-4 d-block d-lg-none">
                <Carousel
                    showIndicators={false}
                    showStatus={false}
                    showThumbs={false}
                    renderArrowPrev={(onClickHandler, hasPrev, label) =>
                        (<PrevArrow onClickHandler={onClickHandler} hasPrev={hasPrev} />)}
                    renderArrowNext={(onClickHandler, hasNext, label) =>
                        (<NextArrow onClickHandler={onClickHandler} hasNext={hasNext} />)}
                >
                    {items.map((item, index) => {
                        return (<div key={index} className="p-3 mb-5"><Testimony item={item} key={index} /></div>)
                    })}
                </Carousel>
            </Row>
        </Container>
    )
}