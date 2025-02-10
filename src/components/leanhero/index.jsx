import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.css";
import BlueArrowButton from "../blue_arrow_button";
import DynamicImage from "../dynamicImage";

export default function LeanHero({ hero, hero_imgs }) {

    const ImageBlock = ({ index }) => {
        const image = hero_imgs.data[index];
        return (<div className={styles.imgbox}>
            <DynamicImage src={{data: image}} objectFit="cover" />
        </div>)
    }

    return (<><Container className={styles.lightbg} fluid>
        <Container className="pt-5">
            <div className="py-5">
                <center>
                    <h1 data-aos="fade-up">
                        {hero.title}
                    </h1>
                    <p data-aos="fade-up">
                        {hero.description}
                    </p>
                    <div data-aos="fade-up">
                        <BlueArrowButton text={hero.cta_text} link={hero.cta_link} />
                    </div>
                </center>
            </div>
        </Container>
    </Container>
        <Container fluid className={styles.yellowmidbg}>
            <Container className="pb-5">
                <Row className="gx-1">
                    <Col data-aos="fade-up" sm={6} md={4} lg={3}>
                        <ImageBlock index={0} />
                    </Col>
                    <Col data-aos="fade-up" data-aos-delay={100} sm={6} md={4} lg={3}>
                        <ImageBlock index={1} />
                    </Col>
                    <Col data-aos="fade-up" data-aos-delay={200} className="d-none d-md-block" md={4} lg={3}>
                        <ImageBlock index={2} />
                    </Col>
                    <Col data-aos="fade-up" data-aos-delay={300} className="d-none d-lg-block" lg={3}>
                        <ImageBlock index={3} />
                    </Col>
                </Row>
            </Container>
        </Container>
    </>)
}