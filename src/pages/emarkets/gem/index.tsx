import Separator from "@/components/separator";
import RootLayout from "@/pages/layout";
import { getData } from "@/utils/api_calls";
import { CacheHeaders, JSONData } from "@/utils/definitions";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./gem.module.css"
import Image from "next/image";
import YellowArrowButton from "@/components/yellow_arrow_button";
import DynamicImage from "@/components/dynamicImage";

export async function getServerSideProps(context: JSONData) {

    context.res.setHeader(
        'Cache-Control',
        CacheHeaders
    )

    const language = context.locale

    const path = "emarkets-gem?populate=deep"

    const url = "https://" + process.env.API_ENDPOINT + path

    const result = await getData(url, language)


    return {
        props: {
            data: result?.data?.attributes,
        }
    }
}

export default function Emarkets({ data }: JSONData) {
    console.log(data)

    const height = 100 * (data.hero_image_landscape.data.attributes.height / data.hero_image_landscape.data.attributes.width)
    return (
        <RootLayout>
            <Container fluid className={styles.herofluid}>
                <Container>
                    <div className="mt-5">
                        <Link className={styles.bluelink} href="/">Home</Link>
                        <Separator />
                        <Link className={styles.graylink} href="/emarkets">eMarkets</Link>
                        <Separator />
                        <Link className={styles.graylink} href="/emarkets/gem">GeM</Link>
                    </div>
                    <Row className={styles.hero}>
                        <Col md={5} lg={5}>
                            <div data-aos="fade-up" className={styles.supertitle}>
                                <h1>{data["supertitle"]}</h1>
                            </div>
                            <div data-aos="fade-up" className={styles.title}>
                                <h1>{data["title"]}</h1>
                            </div>
                            <div data-aos="fade-up" className={styles.subtitle}>
                                <p>
                                    {data["subtitle"]}
                                </p>
                            </div>
                        </Col>
                        <Col lg={2} className="d-none d-lg-block position-relative">
                            <Image alt="background pattern" objectFit="contain" fill src="/gem_bg_2.webp" />
                        </Col>
                        <Col lg={5} md={7}>
                            <div className="h-100 d-flex">
                                <div className="my-auto">
                                    <p>
                                        {data.description}
                                    </p>
                                    <YellowArrowButton style={{ width: "fit-content", paddingTop: "0.3em", paddingBottom: "0.3em" }} text={data.cta_text} link={data.cta_link} />
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <div style={{ height: "50vh" }} className="d-none d-lg-block w-100 position-relative mt-5">
                        <DynamicImage objectPosition="top" objectFit="contain" href={data.hero_image_landscape} />
                    </div>

                    <div style={{ height: "30vh" }} className="d-none d-md-block d-lg-none w-100 position-relative mt-2">
                        <DynamicImage objectPosition="top" objectFit="contain" href={data.hero_image_landscape} />
                    </div>

                    <div style={{ height: "120vh" }} className="d-none d-sm-block d-md-none w-100 position-relative mt-2">
                        <DynamicImage objectPosition="top" objectFit="contain" href={data.hero_image_portrait} />
                    </div>

                    <div style={{ height: "80vh" }} className="d-block d-sm-none w-100 position-relative mt-2">
                        <DynamicImage objectPosition="top" objectFit="contain" href={data.hero_image_portrait} />
                    </div>


                </Container>
            </Container>
            <Container>


                <Row className="mt-2">
                    <Col md={5}>
                        <div className="h-100 d-flex">
                            <div className="my-auto">
                                <h4>
                                    {data.section_2_title}
                                </h4>
                                <div className="small mt-3">
                                    {data.section_2_description}
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={7}>
                        CAROUSEL PLACEHOLDER
                    </Col>
                </Row>
                <div className="mt-4">
                    <h4>
                        {data.section_3_title}
                    </h4>
                    <div className="mt-3 small">
                        {data.section_3_description}
                    </div>
                </div>
                <Row>
                    <Col md={4}>
                        Hi
                    </Col>
                    <Col md={4}>
                        Hi
                    </Col>
                    <Col md={4}>
                        Hi
                    </Col>
                </Row>
            </Container>

        </RootLayout>
    );
}
