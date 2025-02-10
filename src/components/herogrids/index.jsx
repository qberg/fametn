import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.css";
import Link from "next/link";
import DynamicImage from "../dynamicImage";
import Image from "next/image";
import { useRouter } from "next/router";

const strings = {
    blog: {
        en: "Blog",
        ta: "வலைப்பதிவு"
    }
}

export default function HeroGrids({ data }) {

    function Card({ index }) {
        const each = data.cards[index]
        return (<>
            <DynamicImage src={each.image} objectFit="cover" />
            <div className={styles.card}>
                <div className="d-flex">
                    <div className="ms-auto">
                        <Link className={styles.yellowarrow} href={each.link || "#"}>
                            <Image src="/home_yellow_arrow.svg" width={36} height={36} />
                        </Link>
                    </div>
                </div>
                <div className="mt-auto">
                    <h5 className={styles.cardsub}>
                        {each.subtitle}
                    </h5>
                    <h6 className={styles.cardtitle}>
                        {each.heading}
                    </h6>
                </div>
            </div>
        </>)
    }

    function BlogCard({ each }) {
        const { locale } = useRouter();
        return (<div className="d-flex">
            <div className={styles.blogimg}>
                <DynamicImage src={each.attributes.image} objectFit="cover" />
            </div>
            <div className="ms-4 my-auto">
                <h6 className={styles.literallyblog}>
                    {strings.blog[locale]}
                </h6>
                <h6>
                    {each.attributes.title}
                </h6>
            </div>
        </div>)
    }

    return (<Container className="my-5 py-4">
        <h4 data-aos="fade-up" className={`mb-0 ${styles.supertitle}`}>
            {data.heading.subtitle}
        </h4>
        <div className="d-flex">
            <div className="me-auto">
                <h2 data-aos="fade-up">
                    {data.heading.title}
                </h2>
                <p data-aos="fade-up" className="small mb-0">
                    {data.heading.description}
                </p>
            </div>
            <div data-aos="fade-up" className="ms-2 mt-auto">
                <Link href={data.heading.cta_link || "#"}>
                    <div className={styles.cta}>
                        {data.heading.cta_text}
                    </div>
                </Link>
            </div>
        </div>

        <Row className="mt-4 gx-2 gy-2 ">
            <Col className={styles.smallb} lg={6}>
                <div data-aos="fade-up" className={styles.img1}>
                    <Card index={0} />
                </div>
            </Col>
            <Col className={styles.smallb} lg={3}>
                <div data-aos="fade-up" data-aos-delay={100} className={styles.img1}>
                    <Card index={1} />

                </div>
            </Col>
            <Col lg={3}>
                <Row className="gx-2 gy-2">
                    <Col className={styles.smallb} lg={12}>
                        <div data-aos="fade-up"  data-aos-delay={200} className={styles.img2}>
                            <Card index={2} />
                        </div>
                    </Col>
                    <Col className={styles.smallb} lg={12}>
                        <div data-aos="fade-up"  data-aos-delay={200} className={styles.img2}>
                            <Card index={3} />
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row className="mt-5">
            {data.blogs.data.map((each, index) => {
                return (<Col data-aos="fade-up" data-aos-delay={100 * index} lg={4} key={index}>
                    <BlogCard each={each} />
                </Col>)
            })}
        </Row>

    </Container>)
}