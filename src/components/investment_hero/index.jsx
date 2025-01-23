import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import YellowArrowButton from "../yellow_arrow_button"
import WhiteBorderButton from "../whiteborderbutton"
import Image from "next/image"
import { useRef } from "react"
import DynamicImage from "../dynamicImage"

export default function InvestmentHero({
    title,
    description,
    cta_text_prim,
    cta_link_prim,
    cta_text_sec,
    cta_link_sec,
    cards
}) {

    const containerRef = useRef();

    const scrollContainer = (percentage) => {
        if (containerRef.current) {
            const scrollAmount = containerRef.current.clientWidth * (percentage / 100);
            containerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth', // Enables smooth scrolling
            });
        }
    };

    const percentageToScroll = 100.0 / cards.length;

    return (
        <Container fluid className={styles.bluebg}>
            <div className={styles.overlay}>
                <Image src="/vara_vara.webp" layout="fill" objectFit="cover" />
            </div>

            <Container className="h-100 z-2 position-relative pt-5">
                <Row className="py-5">
                    <Col lg={5}>
                        <div className="h-100 d-flex">
                            <div className="my-auto">
                                <h1 className={styles.heading}>
                                    {title}
                                </h1>
                                <p className={styles.desc}>
                                    {description}
                                </p>
                                <div className="d-flex">
                                    <div>
                                        <YellowArrowButton text={cta_text_prim} link={cta_link_prim} />
                                    </div>
                                    <div className="ms-3 small">
                                        <WhiteBorderButton text={cta_text_sec} link={cta_link_sec} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={7} className="d-none d-lg-flex">
                        <div
                            className={styles.tall}
                            ref={containerRef}
                        >
                            {cards.map((each, index) => {
                                return (<div key={index} className={styles.tallcard}>
                                    <DynamicImage src={each.image} objectFit="cover" />
                                    <div className={styles.gradbg}></div>

                                    <div className="mt-auto z-2 p-3 w-100">
                                        <h5 className="w-100 text-wrap">
                                            {each.heading}
                                        </h5>
                                        <div className="smaller text-wrap">
                                            {each.description}
                                        </div>
                                    </div>
                                </div>)
                            })}
                        </div>
                        <div className={styles.leftscroll} onClick={() => scrollContainer(-percentageToScroll)}>
                            <div className="m-auto">
                                &larr;
                            </div>
                        </div>

                        <div className={styles.rightscroll} onClick={() => scrollContainer(percentageToScroll)}>
                            <div className="m-auto">
                                &rarr;
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}