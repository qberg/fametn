import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import styles from "./yellowblobhero.module.css"
import { Row, Col, Container } from "react-bootstrap"

import YellowArrowButton from "../yellow_arrow_button";
import DynamicImage from "../dynamicImage";

function UnselectedIndicator({ onClickHandler, isSelected }) {
    return (<span data-shono="false" className={`${styles.indic}`} onClick={onClickHandler}>
    </span>)
}

function SelectedIndicator({ onClickHandler, isSelected }) {
    return (<span data-shono="true" className={`${styles.indic}`} onClick={onClickHandler}>
    </span>)
}

const LeftBlock = ({ hero }) => {
    return (<>
        <div data-aos="fade-up" className={styles.container}>
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
    </>
    )
}

const RightBlock = ({ hero_imgs }) => {
    return (
        <div data-aos="fade-up" data-aos-delay={100} className={styles.prop}>
            <Carousel
                showArrows={false}
                showStatus={false}
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                    if (isSelected) {
                        return (
                            <SelectedIndicator onClickHandler={onClickHandler} isSelected={isSelected} />
                        );
                    }
                    return (
                        <UnselectedIndicator onClickHandler={onClickHandler} isSelected={isSelected} />

                    );
                }}

            >
                {hero_imgs.image.data.map((each, key) => {
                    return (
                        <div className={styles.carousel_megaholder} key={key}>
                            <div className={styles.carousel_holder}>
                                <DynamicImage objectFit="cover" src={{ data: each }} />
                            </div>
                        </div>
                    )
                })
                }
            </Carousel>
        </div>
    )
}

const YellowBlobHero = ({ hero, hero_imgs }) => {
    return (<Container fluid className={styles.mastercontainer}>
        <div className={styles.blob}></div>
        <Container>
            <Row>
                <Col lg={6} xl={5} className="d-flex flex-column py-4">
                    <LeftBlock hero={hero} />
                </Col>
                <Col lg={6} xl={7} className="h-100">
                    <RightBlock hero_imgs={hero_imgs} />

                </Col>
            </Row>
        </Container>
    </Container>
    )
}


module.exports = YellowBlobHero;