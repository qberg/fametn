import styles from "./partners.module.css"
import DynamicImage from "../dynamicImage";
import Link from "next/link";

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
                {data.map((each, key) => {

                    const insiderStuff = (
                        <DynamicImage objectFit="contain" src={each.image} />
                    )

                    const fullInsiderStuff = each.url ? (<Link href={each.url}>
                        {insiderStuff}
                    </Link>) : insiderStuff;

                    return (
                        <div key={key} className={styles.imageContainer}>
                            {fullInsiderStuff}
                            {/* <DynamicImage objectFit="contain" src={each.image} /> */}
                        </div>
                    )
                })}
            </div>

            {/* in mobile, render as row col */}
            <div className="d-lg-none">
                <Row>
                    {data.map((each, key) => {

                        const insiderStuff = (
                            <DynamicImage objectFit="contain" src={each.image} />
                        )

                        const fullInsiderStuff = each.url ? (<Link href={each.url}>
                            {insiderStuff}
                        </Link>) : insiderStuff;

                        return (
                            <Col xs={6} key={key} className="d-flex justify-content-center">
                                <div className={styles.mobileImage}>
                                    {fullInsiderStuff}
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </div>
        </Container>
    )
}

export default PartnersSection;