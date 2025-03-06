import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.css";
import EvHeading from "../heading";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DynamicImage from "../../dynamicImage";
import Image from "next/image";

function EventCard({ item }) {
    return (<div data-aos="fade-up" className={styles.card}>
        <div className={styles.imgholder}>
            <DynamicImage src={item.image} objectFit="cover" />
        </div>
        <div className={styles.actualcard}>
            <div className={styles.content}>
                <h5>
                    {item.heading}
                </h5>
                <div className="d-block d-lg-flex">
                    <div className="d-none  d-lg-block mt-4 mt-lg-0 me-lg-4">
                        <p className={styles.para}>
                            {item.description}
                        </p>
                    </div>
                    <div>
                        <div className={styles.date}>
                            {item.subtitle}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

function PrevArrow({ onClickHandler, hasPrev }) {
    return (
        <div className={styles.arrwrap}>
            <div data-shono={hasPrev} className={styles.cararrow} onClick={onClickHandler} >
                <Image alt="arrow" height={24} width={24} src="/car_arrow_left.svg" />
            </div>
        </div>
    )
}

function NextArrow({ onClickHandler, hasNext }) {
    return (
        <div className={styles.arrwrapright}>
            <div data-shono={hasNext} className={styles.cararrow} onClick={onClickHandler} >
                <Image className={styles.rightside} alt="arrow" height={24} width={24} src="/car_arrow_left.svg" />
            </div>
        </div>
    )
}


export default function EvEvents({ heading, items }) {
    return (<Container className="my-5 py-4">
        <EvHeading text={heading.subtitle} />
        <Row className="mt-4">
            <Col lg={6}>
                <h2 data-aos="fade-up">
                    {heading.title}
                </h2>
            </Col>
            <Col lg={6}>
                <p data-aos="fade-up" className="small mt-lg-2">
                    {heading.description}
                </p>
            </Col>
        </Row>
        <div>
            <Carousel
                showArrows={true}
                showIndicators={true}
                showStatus={false}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}

                emulateTouch={true}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    (<PrevArrow onClickHandler={onClickHandler} hasPrev={hasPrev} />)}
                renderArrowNext={(onClickHandler, hasNext, label) =>
                    (<NextArrow onClickHandler={onClickHandler} hasNext={hasNext} />)}

            >
                {items.map((item, index) => {
                    return (<EventCard item={item} key={index} />)
                })}

            </Carousel>

        </div>

    </Container>)
}