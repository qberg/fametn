import { Container, Row, Col } from "react-bootstrap";
import styles from "./flathero.module.css";
import DynamicImage from "../dynamicImage";

export default function Flathero({ hero, heroimg, heronumbers }) {

    const BlackstuffContent = () =>  {
        return (
            <Row>
                {heronumbers.map((each, key) => {
                    return (
                    <Col key={key}>
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
                                    <h2 className={styles.supertitle}>
                                        {hero.supertitle}
                                    </h2>
                                    <h1 className={styles.title}>
                                        {hero.title}
                                    </h1>
                                    <p>
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
                        <div className={styles.photoholder}>
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
        <Container className={`d-block d-md-none position-relative ${styles.mobilebg}`} fluid>
            <DynamicImage objectFit="cover" src={heroimg} />
        </Container>
        </>)
}

