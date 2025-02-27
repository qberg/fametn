import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import Bluepill from "../bluepill"
import YellowArrowButton from "../yellow_arrow_button"
import Image from "next/image"
import Link from "next/link"

function NewsItem({ data }) {
    return (<div data-aos="fade-up" className={styles.newsitem}>
        <Link href={data.cta_link || "#"}>
            <div className="d-flex">
                <div>
                    <div className="d-flex small">
                        <div className={`${styles.cate}`}>
                            {data.title}
                        </div>
                        <div className="my-auto mx-2">
                            <div className={styles.dot}></div>
                        </div>
                        <div>
                            {data.subtitle}
                        </div>
                    </div>

                    <div className={styles.headling}>
                        {data.description}
                    </div>
                </div>
                <div>
                    <Image src="/news_arrow.svg" alt="" width={20} height={20} />
                </div>
            </div>
        </Link>
    </div>)
}

export default function NewsBox({ data }) {
    return (<Container className="my-5">
        <Bluepill text={data.supertitle} />
        <hr></hr>
        <Row className="mt-4">
            <Col lg={5}>
                <h2 data-aos="fade-up" className="mb-4">
                    {data.title}
                </h2>
                <div data-aos="fade-up">
                    <YellowArrowButton text={data.cta_name} url={data.cta_link} />
                </div>
            </Col>
            <Col lg={7}>
                {data.news.map((each, index) => {
                    return (<NewsItem data={each} key={index} />)
                })}
            </Col>
        </Row>

    </Container>)
}