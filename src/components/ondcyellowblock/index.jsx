import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.css";
import YellowFancyContainer from "@/components/yellowfancycontainer";
import DynamicImage from "../dynamicImage";

export default function OndcYellowBlock({ header, items }) {
    return (
        <YellowFancyContainer>
            <Container className="py-5">
                <center>
                    <h2 data-aos="fade-up">
                        {header.title}
                    </h2>
                    <p data-aos="fade-up">
                        {header.description}
                    </p>
                </center>
                <Row className="mt-4">
                    {items.map((each, index) => {
                        return (<Col data-aos="fade-up" data-aos-delay={100 * index} lg={4} key={index}>
                            <div className="d-flex mt-4">
                                <div className={styles.icon}>
                                    <DynamicImage src={each.image} objectFit="contain" />
                                </div>
                                <div className="ms-3">
                                    <h6>
                                        {each.heading}
                                    </h6>
                                    <p className="small">
                                        {each.description}
                                    </p>
                                </div>
                            </div>
                        </Col>)
                    })}
                    {/* <Col lg={4}>

                    </Col> */}
                </Row>
            </Container>
        </YellowFancyContainer>
    )
}