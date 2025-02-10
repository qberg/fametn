import styles from "./styles.module.css"
import { Container, Row, Col } from 'react-bootstrap'
import YellowFancyContainer from '../yellowfancycontainer'
import BlueArrowButton from "../blue_arrow_button"
import Image from "next/image"
import DynamicImage from "../dynamicImage"

export default function YellowHero({ hero, hero_imgs }) {
    const { title, description, cta_name, cta_link } = hero

    const ImageWithDesc = ({index} ) => {
        const { description, image } = hero_imgs[index]
        return (
            <>
                <div className={styles.imageblock}>
                    <DynamicImage src={image} objectFit="cover" />
                </div>
                <div className={styles.imgtxt}>
                    {description}
                </div>
            </>
        )
    }

    return (
        <YellowFancyContainer>
            <Container className="position-relative">
                <div className={styles.leftdotted}>
                    <Image src="/frame25.webp" layout="fill" objectFit="contain" />
                </div>
                <Row>
                    <Col lg={5} className={styles.herocont}>
                        <div className="h-100 d-flex">
                            <div className="my-auto">
                                <h1 data-aos="fade-up" className={styles.heading}>
                                    {title}
                                </h1>
                                <p data-aos="fade-up" className={styles.desc}>
                                    {description}
                                </p>
                                <div data-aos-delay={200} data-aos="fade-up">
                                    <BlueArrowButton text={cta_name} link={cta_link} />
                                </div>
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
                    <Col lg={5} className="d-none d-lg-flex" >
                        <div className="d-flex h-100">
                            <div data-aos="fade-up" className="my-auto">
                                <div className={styles.bluecont}>
                                    <Row>
                                        <Col data-aos="fade-up" xs={6}>
                                            <ImageWithDesc index={0} />
                                        </Col>
                                        <Col data-aos="fade-up" xs={6}>
                                            <ImageWithDesc index={1} />
                                        </Col>
                                        <Col data-aos-delay={200} data-aos="fade-up" className={styles.nomb} xs={6}>
                                            <ImageWithDesc index={2} />
                                        </Col>
                                        <Col data-aos-delay={200} data-aos="fade-up" className={styles.nomb} xs={6}>
                                            <ImageWithDesc index={3} />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>

                    </Col>
                </Row>
            </Container>
        </YellowFancyContainer>)
}