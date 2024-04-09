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
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useState } from "react";
import "./override.css"

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

    const hero_landscape_data = data?.hero_image_landscape?.data?.attributes?.formats
    const hero_portrait_data = data?.hero_image_portrait?.data?.attributes?.formats
    const hero_landscape_srcset = `${process.env.NEXT_PUBLIC_IMG_ENDPOINT + hero_landscape_data.small.url} 768w, ${process.env.NEXT_PUBLIC_IMG_ENDPOINT + hero_landscape_data.medium.url} 1024w, ${process.env.NEXT_PUBLIC_IMG_ENDPOINT + hero_landscape_data.large.url} 1440w`
    const hero_portrait_srcset = `${process.env.NEXT_PUBLIC_IMG_ENDPOINT + hero_portrait_data.small.url} 768w, ${process.env.NEXT_PUBLIC_IMG_ENDPOINT + hero_portrait_data.medium.url} 1024w, ${process.env.NEXT_PUBLIC_IMG_ENDPOINT + hero_portrait_data.large.url} 1440w`

    console.log(data)
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
                                <div data-aos="fade-up" className="my-auto">
                                    <p>
                                        {data.description}
                                    </p>
                                    <YellowArrowButton style={{ width: "fit-content", paddingTop: "0.3em", paddingBottom: "0.3em" }} text={data.cta_text} link={data.cta_link} />
                                </div>
                            </div>
                        </Col>
                    </Row>


                    <div data-aos="fade-up" className="d-none d-md-block w-100 position-relative mt-4 mb-5">
                        <img className="w-100" srcSet={hero_landscape_srcset} />
                    </div>

                    <div data-aos="fade-up" className="d-block d-md-none w-100 position-relative mt-4 mb-5">
                        <img className="w-100" srcSet={hero_portrait_srcset} />
                    </div>


                </Container>
            </Container>
            <Container>


                <Row className="mt-2">
                    <Col md={4} lg={5}>
                        <div className="h-100 d-flex">
                            <div className="my-auto">
                                <h4 data-aos="fade-up">
                                    {data.section_2_title}
                                </h4>
                                <div data-aos="fade-up" className="small mt-3">
                                    {data.section_2_description}
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={8} lg={7}>

                        <div data-aos="fade-up" className="h-100">
                            <Carousel
                                autoPlay={true}
                                showStatus={false}
                                renderArrowPrev={(clickHandler: () => void, hasPrev: boolean, label: string) => {
                                    return (<div className={styles.section2carouselarrowprev}>
                                        <div style={{ opacity: hasPrev ? "1" : "0.5" }} onClick={clickHandler} className={styles.section2carouselprevarrowactual}>
                                            <Image alt="left arrow" src="/left_arrow_white.svg" width={8} height={8} />
                                        </div>
                                        <div className={styles.dotwrapper}>
                                            <div></div>
                                            <div></div>
                                            <div className="d-none d-md-block"></div>
                                        </div>
                                    </div>)
                                }}
                                renderArrowNext={(clickHandler: () => void, hasPrev: boolean, label: string) => {
                                    return (
                                        <div style={{ opacity: hasPrev ? "1" : "0.5" }} onClick={clickHandler} className={styles.section2carouselnextarrowactual}>
                                            <Image alt="left arrow" src="/left_arrow_white.svg" width={8} height={8} />
                                        </div>
                                    )
                                }}

                                showIndicators={false}

                                showThumbs={false}
                                showArrows={true}>
                                {data.section_2_images.data.map((each: JSONData, key: number) => {
                                    return (
                                        <div className={styles.section2carouselwrap} key={key}>
                                            <div className={styles.section2carousel}>
                                                <DynamicImage objectFit="cover" href={{ data: each }} />
                                            </div>

                                            <svg className={styles.flt_svg} xmlns="http://www.w3.org/2000/svg">
                                                <defs>
                                                    <filter id="flt_tag">
                                                        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                                                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="flt_tag" />
                                                        <feComposite in="SourceGraphic" in2="flt_tag" operator="atop" />
                                                    </filter>
                                                </defs>
                                            </svg>
                                        </div>
                                    )
                                })}
                            </Carousel>
                        </div>
                    </Col>
                </Row>

            </Container>
            <Container fluid className={styles.sec3fluid}>
                <Container>
                    <div data-aos="fade-up" className="mt-4">
                        <h4>
                            {data.section_3_title}
                        </h4>
                        <div data-aos="fade-up" className="mt-3 small">
                            {data.section_3_description}
                        </div>
                    </div>
                    <div data-aos="fade-up" className="d-none d-md-block w-100  pt-4">
                        <div className={styles.horbar}></div>
                    </div>
                    <div className="position-relative">
                        <div className={styles.section3grad}></div>
                    </div>
                    <Row className="pt-4 pt-md-none">
                        {data.section_3_bullets.map((each: JSONData, key: number) => {
                            return (<Col md={4} key={key} >
                                <div data-aos="fade-up"  className={`${styles.section3bullets} pt-2 p-md-4 ${(key % 3 != 3 - 1) ? styles.section3bulletborder : ""}`}>
                                    <div data-aos="fade-up"  className={styles.sec3bulimg}>
                                        <DynamicImage href={each.image} />
                                    </div>
                                    <div data-aos="fade-up" className="mt-4">
                                        <h5>{each.heading}</h5>
                                    </div>
                                    <div data-aos="fade-up"  className="small mt-3">
                                        {each.description}
                                    </div>
                                </div>
                            </Col>)
                        })}
                    </Row>
                    <div className="mt-5 mt-md-none"></div>
                    <Carousel
                        autoPlay={true}
                        showStatus={false}
                        showArrows={false}
                        showThumbs={false}>
                        {data.section_3_carousel.map((each: JSONData, key: number) => {
                            return (<div data-aos="fade-up" className={styles.sec3car} key={key}>
                                <DynamicImage objectFit="cover" href={each.image} />
                                <div data-aos="fade-up">
                                    <h5>
                                        {each.heading}
                                    </h5>
                                    <div data-aos="fade-up" className={styles.sec3small}>
                                        {each.description}
                                    </div>
                                </div>
                            </div>)
                        })}

                    </Carousel>
                </Container>
            </Container>
            <Container fluid className={styles.sec4fluid}>
                <Container>
                    <center>
                        <div data-aos="fade-up" className="pt-5 pb-4 pb-md-none">
                            <h3>{data.section_4_title}</h3>
                            <div data-aos="fade-up" className={`small ${styles.sec4sub}`}>
                                {data.section_4_description}
                            </div>
                        </div>
                    </center>
                    <Row className="pb-4 ">
                        {data.section_4_bullets.map((each: JSONData, key: number) => {
                            return (<Col md={4} key={key}>
                                <div data-aos="fade-up" className="h-100 mt-1 mt-md-5">
                                    <Row>
                                        <Col lg={3}>
                                            <div data-aos="fade-up" className={styles.sec4img}>
                                                <DynamicImage href={each.image} />
                                            </div>
                                        </Col>
                                        <Col className="text-center text-md-left" lg={9}>
                                            <h6 data-aos="fade-up" >
                                                {each.heading}
                                            </h6>
                                            <div data-aos="fade-up" className="small">
                                                {each.description}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>)
                        })}
                    </Row>
                </Container>
            </Container>
            <Container fluid className={styles.sec5fluid}>
                <Container>
                    <div data-aos="fade-up" className="mt-5 pt-2">{data.section_5_subtitle}</div>
                    <Row>
                        <Col md={9}>
                            <h4 data-aos="fade-up" >
                                {data.section_5_title}
                            </h4>
                            <div data-aos="fade-up" className="small">
                                {data.section_5_description}
                            </div>
                        </Col>
                        <Col md={3}>
                            <div data-aos="fade-up" className="d-flex flex-column h-100">
                                <div data-aos="fade-up" className="mt-auto ms-md-auto">
                                    <YellowArrowButton style={{ width: "fit-content", padding: "0.5em 1.2em" }} link={data.section_5_link} text={data.section_5_cta} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className={`my-4 ${styles.horbar}`} ></div>
                    <Row className="pt-4 pb-5">
                        {data.section_5_bullets.map((each: JSONData, key: number) => {
                            return (<Col md={4} key={key}>
                                <div data-aos="fade-up" className={styles.sec5cardbg}>
                                    <DynamicImage objectFit="cover" href={each.image} />
                                    <div>
                                        <h5 data-aos="fade-up">{each.heading}</h5>
                                        <div data-aos="fade-up" className={styles.sec3small}>
                                            {each.description}
                                        </div>
                                    </div>
                                </div>
                            </Col>)
                        })}
                    </Row>
                </Container>
            </Container>

        </RootLayout>
    );
}
