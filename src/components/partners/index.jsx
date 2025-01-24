import styles from "./partners.module.css"
import DynamicImage from "../dynamicImage";
import Link from "next/link";

const { Container, Row, Col } = require("react-bootstrap")

const PartnerImage = ({ each }) => {
    const insiderStuff = (
        <DynamicImage objectFit="contain" src={each.image} />
    )
    return each.url ? (<Link href={each.url}>
        {insiderStuff}
    </Link>) : insiderStuff;
}

const PartnersDesktop = ({ data }) => {
    return (
        <div className="d-none d-lg-flex">
            {data.map((each, key) => {
                return (
                    <div data-aos="fade-up" data-aos-delay={key * 100} key={key} className={styles.imageContainer}>
                        <PartnerImage each={each} />
                    </div>
                )
            })}
        </div>)
}

const PartnersMobile = ({ data }) => {
    return (<div className="d-lg-none">
        <Row>
            {data.map((each, key) => {
                return (
                    <Col xs={6} key={key} className="d-flex justify-content-center">
                        <div data-aos="fade-up" className={styles.mobileImage}>
                            <PartnerImage each={each} />
                        </div>
                    </Col>
                )
            })}
        </Row>
    </div>)
}


const PartnersSection = ({ heading, data }) => {
    return (
        <Container>
            <center>
                <h3 data-aos="fade-up" className="pt-4">
                    {heading}
                </h3>
            </center>
            <PartnersDesktop data={data} />
            <PartnersMobile data={data} />
        </Container>
    )
}

export default PartnersSection;