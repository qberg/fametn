import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import EvHeading from "../heading"
import DynamicImage from "../../dynamicImage"
import Image from "next/image"
import Link from "next/link"
import EvButton from "../button"

function Card({ item }) {
    const topTag = item.tags[0]?.text || ""
    const blogUrl = "/blogs/" + item.url
    return (
        <Link href={blogUrl || "#"}>
            <div data-aos="fade-up" className={styles.card}>
                <div className={styles.img}>
                    <DynamicImage src={item.image} objectFit="cover" />
                </div>
                <div className="mt-2 d-flex">
                    <div className={styles.tag}>
                        {topTag}
                    </div>
                </div>
                <div>
                    <div className="d-flex w-100">
                        <div className=" me-auto">
                            <h4 className="mb-2">
                                {item.title}
                            </h4>
                        </div>
                        <div className="ms-2">
                            <Image src="/evblogarrow.svg" height={30} width={30} />
                        </div>
                    </div>
                    <p className={styles.txt}>
                        {item.excerpt}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default function EvBlogs({ heading, items }) {
    const blogs = items.data.map((each) => each.attributes)
    const topThreeBlogs = blogs.slice(0, 3)

    return <Container className="my-5 py-4">
        <EvHeading text={heading.subtitle} />
        <Row className="mt-4">
            <Col lg={6}>
                <h2 data-aos="fade-up">
                    {heading.title}
                </h2>
            </Col>
            <Col lg={6}>
                <p data-aos="fade-up" className="small mt-lg-2">
                    {heading.description}
                </p>
            </Col>
        </Row>
        <Row className="mt-4">
            {topThreeBlogs.map((each, index) => {
                return (<Col lg={4} key={index}>
                    <Card item={each} />
                </Col>)
            })}
        </Row>
        <div data-aos="fade-up" className="mt-4 text-center">
            <center>
                <EvButton link={heading.cta_link || "#"} text={heading.cta_text} />
            </center>
        </div>
    </Container>
}