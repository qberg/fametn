import { Col, Row } from "react-bootstrap";
import BlueArrowButton from "../blue_arrow_button";
import Bluepill from "../bluepill";
import styles from "./styles.module.css"
import YellowFancyContainer from "@/components/yellowfancycontainer";
import DynamicImage from "../dynamicImage";

export default function LeanDiet({ header, data }) {
    return (
        <YellowFancyContainer>
            <div className="py-5">
                <div className="d-flex">
                    <div className="me-auto">
                        <Bluepill text={header.subtitle} />
                    </div>
                    <div className="ms-2">
                        <BlueArrowButton text={header.cta_text} link={header.cta_link} />
                    </div>
                </div>
                <h2 className="mt-3">
                    {header.title}
                </h2>
                <p>
                    {header.description}
                </p>
                <Row className="mt-4">
                    {data.map((each, index) => {
                        return (<Col lg={4} key={index}>
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
                </Row>
            </div>
        </YellowFancyContainer>
    )
}