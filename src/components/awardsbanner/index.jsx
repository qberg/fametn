import { Col, Container, Row } from "react-bootstrap"
import styles from "./styles.module.css"

function NumberedItem({ data }) {
    return (<>
        <center>
            <h2 className={styles.number}>
                {data.Number}
            </h2>
            <div>
                {data.Information}
            </div>
        </center>
    </>)
}

export default function AwardsBanner({ heading, items }) {
    return (<Container className={styles.bannerholder}>
        <div data-aos="fade-up" className={styles.banner}>
            <Row>
                <Col className={`d-flex ${styles.ourcol}`} lg={6}>
                    <div className="my-auto mx-auto mx-lg-0">
                        <h2 data-aos="fade-up" className={styles.heading}>{heading}</h2>
                    </div>
                    
                </Col>
                <Col className="d-block d-lg-none" lg={6}>
                <hr></hr>
                </Col>
                <Col data-aos-delay={100} data-aos="fade-up" className={`${styles.rightline} ${styles.ourcol}`} lg={3}>
                    <NumberedItem data={items[0]} />
                </Col>
                <Col data-aos-delay={200} data-aos="fade-up" className={styles.ourcol} lg={3}>
                    <NumberedItem data={items[1]} />
                </Col>
            </Row>
        </div>
    </Container>)
}