import { Col, Container, Row } from "react-bootstrap"
import styles from "./styles.module.css"
import YellowArrowButton from "../yellow_arrow_button"
import Image from "next/image"

const FancyHero = ({ hero }) => {
    return (<>
        <div className="position-relative w-100" fluid>
            <div className={styles.bg}>
                <Image src="/yellow_dotted.webp" layout="fill" objectFit="cover" />
            </div>
        </div>
        <Container>

            <Row>
                <Col lg={5} className="d-flex flex-column py-4">
                    <div className={styles.container}>
                        <div data-aos="fade-up" className={styles.yellowbg}>
                            <h1>{hero.supertitle}</h1>
                        </div>
                        <div data-aos="fade-up" className={styles.title}>
                            <h1>{hero.title}</h1>
                        </div>

                    </div>
                </Col>
                <Col lg={2} className="d-none d-lg-flex">
                    <div className="h-100 w-100 d-flex">
                        <div className={`my-auto position-relative w-100 ${styles.dotted}`}>
                            <Image src="/frame25.webp" layout="fill" objectFit="contain" />
                        </div>
                    </div>
                </Col>
                <Col lg={5} className={styles.description}>
                    <div className="h-100 d-flex">
                        <div data-aos="fade-up" data-aos-delay={100}  className={styles.subtitle}>
                            {hero.description}
                            <div className="mt-3">
                                <YellowArrowButton text={hero.cta_name} link={hero.cta_link} />
                            </div>
                        </div>

                    </div>

                </Col>
            </Row>
        </Container>
    </>
    )
}

export default FancyHero