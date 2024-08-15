

import Image from "next/image";
import styles from "./tncgs.module.css"
import YellowArrowButton from "@/components/yellow_arrow_button";

import RootLayout from "../../../components/layout/layout";

import Link from "next/link";
import Separator from "@/components/separator";

import axios from "axios";
import { CacheHeaders, JSONData } from "@/utils/definitions";
import { Col, Container, Row } from "react-bootstrap";
import CardWithImage from "@/components/cardwithimage";
import { getData } from "@/utils/api_calls";

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import RenderIndicator from "@/components/normal_carousel_indicator";
import DynamicImage from "@/components/dynamicImage";
import { useState } from "react";
import FaqSection from "@/components/faq";


export async function getServerSideProps(context: JSONData) {

	context.res.setHeader(
		'Cache-Control',
		CacheHeaders
	)
	const API_ENDPOINT = process.env.API_ENDPOINT
	const language = context.locale
	const path = "https://" + API_ENDPOINT + "finance-tncgs?populate=deep"


	const result: JSONData = await getData(path, language);

	return {
		props: {
			data: result?.data?.attributes
		}
	};


}
export default function TNCGS({ data }: JSONData) {
	console.log(data)
	return (<RootLayout>

		<Container>
			<div className="mt-5">
				<Link className={styles.bluelink} href="/">Home</Link>
				<Separator />
				<Link className={styles.graylink} href="/finance">Finance</Link>
				<Separator />
				<Link className={styles.graylink} href="/finance/tncgs">TNCGS</Link>
			</div>
			<div className={styles.imagesWrapper}>
				<Image src="/Ellipse 22.svg" alt="Image Description" width={400} height={400} />
			</div>
			<Row className={styles.hero}>
				<Col lg={7} xl={6}>
					<div className={styles.container}>
						<div data-aos="fade-up" className={styles.supertitle}>
							<h1>{data["super_title"]}</h1>
						</div>
						<div data-aos="fade-up" className={styles.title}>
							<h1>{data["title"]}</h1>
						</div>
						<div data-aos="fade-up" className={styles.subtitle}>
							<p>
								{data["sub_title"]}
							</p>
						</div>
					</div>

					<div className="mt-4">
						<YellowArrowButton text={data["cta_text"]} link={data["cta_link"]} />
					</div>
				</Col>

				<Col lg={5} xl={6}>

				</Col>
			</Row>

			<div className={styles.sectiontwo}>
				<Image className="d-none d-lg-block position-absolute"  src="/grid_tl.svg" alt="top left grid" width={128} height={128} />
				<div className="d-flex flex-column">
					<center>
						<div className={styles.centereddiv}>
							<h2 className={styles.marginBottom}>{data["section_2_heading"]}</h2>
							{/* Carousel will come here */}
							<Carousel renderIndicator={RenderIndicator} showArrows={false} showThumbs={false} autoPlay={false} infiniteLoop={true} showStatus={false} >
								{data.testimonials.map((each: JSONData, key: number) => {

									const customPath = each.image?.data?.attributes?.formats?.small?.url
									const iconPath = customPath ? process.env.NEXT_PUBLIC_IMG_ENDPOINT + customPath : "/default_scheme.webp"
                 
									return (
										<div className="pb-4" key={key}>
											<div className={styles.testimonialdescription}>
												<small>{each.description}</small>
											</div>
											<div className={styles.imageContainer}>
												<div className="ms-auto" >
													<Image className={styles.testimonialimage} src={iconPath} alt="Image Description" width={50} height={50} />
												</div>
												<div className="me-auto ms-3 my-auto text-start">
													<div className={styles.imageText}>{each.heading}</div>
													<small className={styles.smallText}>{each.subtitle}</small>
												</div>

											</div>
											<div className="mt-4">

											</div>
										</div>)
								})}

							</Carousel>

						</div>
					</center>
				</div>
			</div>


			<Row className="position-relative">
				<Col lg={4}>
					<div className="h-100 d-flex">
						<div className={`my-auto ${styles.section3left}`}>
							<Image
								width={60}
								height={60}

								src="/tncgs_deco_1.svg"
								alt="#deco"
							/>
							<h4 className="mt-2">
								{data.section_3_heading}
							</h4>
							<p className="small mb-5 mb-lg-3 mt-3">
								{data.section_3_description}
							</p>
						</div>
					</div>
				</Col>
				<Col lg={8}>
					<div className="ps-none ps-lg-5 ">
						<div className={styles.section3grad}></div>
						<div className={styles.sec_3_img_container}>
							<DynamicImage objectFit="cover" src={data.section_3_image} />
						</div>
						<div className="my-4">
							<h5>
								{data.section_3_subtitle}
							</h5>
							<div className="small">
								{data.section_3_subdescription}
							</div>
						</div>
						<Row >
							{data.section_3_bullets.map((each: JSONData, key: number) => {
								console.log(each)
								return (<Col md={4} key={key}>

									<div className={styles.section3bullets}>
										<div className="small mb-2">
											{each.Information}
										</div>
										<h6 className="mb-1 mt-auto">
											{each.Number}
										</h6>
									</div>
								</Col>)
							})}
						</Row>
					</div>
				</Col>
			</Row>
			<div>
				{data.section_4_subheading}
				<h4 className="mt-2 mb-5">
					{data.section_4_heading}
				</h4>
			</div>


			<Row>
				<Col md={5}>
					<div className={`${styles.min150} d-none d-md-block h-100 w-100 position-relative`}>
						<DynamicImage objectPosition="left" objectFit="contain" src={data.section_4_image} />
					</div>
					<div className={`${styles.min300} d-block d-md-none h-100 w-100 position-relative`}>
						<DynamicImage objectPosition="center" objectFit="contain" src={data.section_4_image} />
					</div>
				</Col>
				<Col md={7}>
					{data.section_4_bullets.map((each: JSONData, key: number) => {

						return (<div className={`${styles.sec_4_bullets} d-flex ${(key == 0) ? styles.sec_4_sel : ""}`} key={key}>
							<div className="me-3">
								<Image alt="check mark" src={(key == 0)? "/white_check.svg" : "/black_check.svg"} width={17} height={17}/>
							</div>
							<div>
								<h6>{each.heading}</h6>
								<div className={styles.sec_4_small}>
									{each.description}
								</div>
							</div>
						</div>)
					})}
				</Col>
			</Row>

			<div className="mt-5 position-relative">
				{data.section_5_subheading}
				<h4 className="mt-2 mb-5">
					{data.section_5_heading}
				</h4>
				<div className={styles.section5grad}></div>
					
			</div>

			<Row>
				{data.section_5_bullets.map((each: JSONData, key: number) => {
					return (<Col key={key} lg={6}>
						<FaqSection question={each.heading} answer={each.description} />
					</Col>)
				})}
			</Row>

		</Container>

	</RootLayout>)
}

