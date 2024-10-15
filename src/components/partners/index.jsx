import styles from "./partners.module.css"
import DynamicImage from "../dynamicImage";

const { Container, Row, Col } = require("react-bootstrap")

const PartnersSection = ({ heading, data }) => {
    return (
        <Container>
            <center>
                <h3 className="pt-4">
                    {heading}
                </h3>
            </center>

            {/* in lg screens we need all together */}
            <div className="d-none d-lg-flex">
                {data.map((each, key) => (
                    <div key={key} className={styles.imageContainer}>
                        <DynamicImage objectFit="contain" src={each.image} />
                    </div>
                ))}
            </div>

            {/* in mobile, render as row col */}
            <div className="d-lg-none">
                <Row>
                    {data.map((each, key) => (
                        <Col xs={6} key={key} className="d-flex justify-content-center">
                            <div className={styles.mobileImage}>
                                <DynamicImage objectFit="contain" src={each.image} />
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </Container>
    )
}

export default PartnersSection;