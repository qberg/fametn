import { Carousel } from "react-responsive-carousel";
import styles from "./yellowblobhero.module.css"
import { Row, Col, Container } from "react-bootstrap"

import YellowArrowButton from "../yellow_arrow_button";
import DynamicImage from "../dynamicImage";
import Image from "next/image";

const YellowBlobHero = ({ hero, hero_imgs }) => {
    return (<>
        {/* <div className={styles.blob}>
        </div> */}
        <Container>
            <Row>
                <Col lg={6} xl={5} className="d-flex flex-column py-4">
                    <div className={styles.container}>
                        <div data-aos="fade-up" className={styles.yellowbg}>
                            <h1>{hero.supertitle}</h1>
                        </div>
                        <div data-aos="fade-up" className={styles.title}>
                            <h1>{hero.title}</h1>
                        </div>
                        <div data-aos="fade-up" className={styles.subtitle}>
                            <p>{hero.description}</p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <YellowArrowButton text={hero.cta_name} link={hero.cta_link} />
                    </div>
                </Col>
                <Col lg={6} xl={7} className="h-100">
                    <div className={styles.prop}>
                        <Carousel showArrows={false} showStatus={false}>
                            {hero_imgs.image.data.map((each, key) => {
                                return (
                                    <div className={styles.carousel_holder} key={key}>
                                        <DynamicImage objectFit="cover" src={{ data: each }} />
                                    </div>
                                )
                            })
                            }
                        </Carousel>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
    )
}


module.exports = YellowBlobHero;