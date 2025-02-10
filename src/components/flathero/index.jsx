import { Container, Row, Col } from "react-bootstrap";
import styles from "./flathero.module.css";
import DynamicImage from "../dynamicImage";

export default function Flathero({ hero, heroimg, heronumbers }) {

    const BlackstuffContent = () => {
        return (
            <Row>
                {heronumbers.map((each, key) => {
                    return (
                        <Col data-aos="fade-up" data-aos-delay={key * 100} key={key}>
                            <div className={styles.blackstuffcontent}>
                                <h2>{each.Number}</h2>
                                <p>{each.Information}</p>
                            </div>
                        </Col>)
                })}
            </Row>
        )
    }

    return (
        <>
            <Container className={styles.yellowbg} fluid>
                <Container>
                    <Row>
                        <Col md={6} className={styles.closeflex}>
                            <div className="position-relative h-100 d-flex flex-column">
                                <div className="my-auto position-relative h-100 d-flex">
                                    <div className="my-auto py-4 z-1">
                                        <h2 data-aos="fade-up" className={styles.supertitle}>
                                            {hero.supertitle}
                                        </h2>
                                        <h1 data-aos-delay={100} data-aos="fade-up" className={styles.title}>
                                            {hero.title}
                                        </h1>
                                        <p data-aos-delay={200} data-aos="fade-up">
                                            {hero.description}
                                        </p>
                                    </div>

                                    <div className={styles.toprightdots}>
                                    </div>

                                    <div className={styles.botleftdots}>
                                    </div>

                                </div>


                                <div className={`d-none d-md-block ${styles.blackstuff}`}>
                                    <BlackstuffContent />
                                </div>
                            </div>

                        </Col>
                        <Col className={`d-none d-md-block ${styles.nobottom}`} md={6}>
                            <div data-aos="fade-up" className={styles.photoholder}>
                                <DynamicImage objectFit="cover" src={heroimg} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Container className={`d-block d-md-none ${styles.blackmobile}`} fluid>
                <Container>
                    <BlackstuffContent />
                </Container>
            </Container>
            <Container  data-aos="fade-up" className={`d-block d-md-none position-relative ${styles.mobilebg}`} fluid>
                <DynamicImage objectFit="cover" src={heroimg} />
            </Container>
        </>)
}

