import { Col, Container, Row } from "react-bootstrap"
import styles from "./threechannel.module.css"
import Link from "next/link";
import { useEffect, useState } from "react";

const ThreeChannel = ({ data }) => {
    // create a state currenthighlight init to 0
    // every second change the state to next index mod 3
    // increment only if none of the channel is hovered
    // if a channel is hovered, set currenthighlight to that channel

    const [isHovered, setIsHovered] = useState(false);
    const [currentHighlight, setCurrentHighlight] = useState(0);
    const timeInterval = 4000;

    const onHover = (index) => {
        setIsHovered(true);
        setCurrentHighlight(index);
    }

    const nonHover = () => {
        setIsHovered(false);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (isHovered) {
                return;
            }
            setCurrentHighlight(value => (value + 1) % 3);
        }, timeInterval);
        return () => clearInterval(interval);
    }, [isHovered]);



    return (
        <Container className="my-5 py-3">
            <Row className="d-none d-md-flex">
                {data.map((each, key) => (
                    <Col data-shono={key == currentHighlight} onMouseLeave={() => nonHover()} onMouseEnter={() => onHover(key)} md={4} key={key} className={styles.channel}>
                        <div className={styles.thinline}></div>
                        <h4 className={styles.titletext}>{each.title}</h4>
                        <p className="py-2">{each.description}</p>
                        <div className="mt-auto mb-2"></div>
                        <Link href={each.cta_link}>
                            <div className={styles.lightbluebtn}>
                                {each.cta_text} &rarr;
                            </div>
                        </Link>
                    </Col>
                ))}
            </Row>
            <Row className="d-block d-md-none">
                {data.map((each, key) => (
                    <Col md={4} key={key} className={styles.channelmobile}>
                        <div className={styles.thinline}></div>
                        <h4 className={`pt-2 pt-md-0 ${styles.titletext}`}>{each.title}</h4>
                        <p className="py-2">{each.description}</p>
                        <div className="mt-auto mb-2"></div>
                        <Link href={each.cta_link}>
                            <div className={styles.lightbluebtn}>
                                {each.cta_text} &rarr;
                            </div>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

module.exports = ThreeChannel;