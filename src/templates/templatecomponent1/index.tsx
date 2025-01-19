import Image from "next/image";
import YellowArrowButton from "@/components/yellow_arrow_button";
import styles from "./templatecomponent1.module.css"
import FaqSection from "@/components/faq";
import RootLayout from "../../components/layout/layout";
import { CacheHeaders, JSONData } from "@/utils/definitions";
import { Col, Container, Row } from "react-bootstrap";
import DynamicImage from "@/components/dynamicImage";
import BlueArrow from "@/components/bluearrow";
import Section3 from "@/components/section_3";
import Section5 from "@/components/section5";
import Link from "next/link";
import Separator from "@/components/separator";
import "react-responsive-carousel/lib/styles/carousel.min.css";


import Breadcrumps from "@/components/breadcrumps";

import React, { useState } from 'react';

export default function TemplateComponent1({ data }: JSONData) {
	const [selectedId, setSelectedId] = useState(data.section_1[0]?.id);

	const selectedItem = data.section_1.find((item: { id: any; }) => item.id === selectedId);
	const firstSection3Item = data.section_3[0];

	const nextTwoSection3Items = data.section_3.slice(1, 3);

	const [currentIndex, setCurrentIndex] = useState(0);

	const showNextItem = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % data.section_2.length);
	};

	const showPrevItem = () => {
		setCurrentIndex((prevIndex) =>
			(prevIndex - 1 + data.section_2.length) % data.section_2.length
		);
	};

	const item = data.section_2[currentIndex];

	return (
		<RootLayout>
			<Container>
				{/* <Breadcrumps /> */}
				<div className="mt-5">
					<Link className={styles.bluelink} href="/">Home</Link>
					<Separator />
					<Link className={styles.graylink} href="/finance">Finance</Link>
					<Separator />
					<Link className={styles.graylink} href="/finance/delayedpayments">Delayed Payments</Link>
				</div>
				<div className={styles.imagesWrapper}>
					<Image src="/Ellipse 22.svg" alt="Image Description" width={400} height={400} />
				</div>

				<Row className={styles.hero}>
					<Col lg={7} xl={6}>
						<div className={styles.container}>
							<div data-aos="fade-up" className={styles.supertitle}>
								<h1>{data.hero.heading}</h1>
							</div>
							<div data-aos="fade-up" className={styles.title}>
								<h1>{data.hero.description}</h1>
							</div>
							<div data-aos="fade-up" className={styles.subtitle}>
								<p>{data.hero.title}</p>
							</div>
						</div>

						<div className="mt-4">
							<YellowArrowButton text={data.hero.cat_name} link={data.hero.cta_link} />
						</div>
					</Col>
					<Col lg={5} xl={6}></Col>
				</Row>

				<div className="d-flex flex-column">
					<center>
						<div className={styles.centereddiv}>
							<h3 className={styles.marginBottom}>{data.partner_title}</h3>
						</div>

					</center>
				</div>
				<div className={styles.imageRow}>
					{data.partner_section.map((each: JSONData) => (
						<div key={item.id} className={styles.imageContainer}>
							<DynamicImage objectFit="contain" src={each.image} />
						</div>
					))}
				</div>
				<div>
					<Row>
						<Col lg={5} className={`${styles.imageCol} d-flex align-items-start`}>
							<div data-aos="fade-up" className={styles.imgwrap}>
								{selectedItem && (
									<div className={styles.imageItem}>
										<DynamicImage objectFit="contain" src={selectedItem.image} />
									</div>
								)}
							</div>
						</Col>
						<Col lg={7} className={styles.textCol}>
							{data.section_1.map((each: JSONData) => (
								<div
									key={each.id}
									className={`${styles.textItem} ${selectedId === each.id ? styles.active : styles.collapsed}`}

									onClick={() => setSelectedId(each.id)}
								>
									<p className={styles.heading}>
										{each.heading}
									</p>
									{selectedId === each.id && (
										<>
											<small className={styles.small_des}>{each.description}</small>
											<div className={styles.descriptionContainer}>

												<BlueArrow text={each.subtitle} link={each.link} />

											</div>
										</>
									)}
								</div>
							))}
						</Col>

					</Row>
				</div>
			</Container>
			<Container className="mb-5">
				<div>
					<div className={styles.sec_3_img_container}>
						{item && (
							<>
								<DynamicImage objectFit="cover" src={item.image} />
								<div className={styles.bottomLeftDiv}>
									<div className={styles.headingBox}>
										<p className={styles.heading_sec2}>{item.heading}</p>
									</div>
									<p className={styles.description}>{item.description}</p>
									<a href={item.link} className={styles.subtitle}>{item.subtitle}</a>
									<Image
										src="/right-arrow.svg"
										alt="->"
										width={15}
										height={15}
									/>
								</div>
								<div className={styles.arrow_container}>
									<Image
										src="/round_left_arrow.svg"
										alt="<"
										width={25}
										height={25}
										className={styles.arrow_image}
										onClick={showPrevItem}
									/>
									<Image
										src="/round_right_arrow.svg"
										alt=">"
										width={25}
										height={25}
										className={styles.arrow_image}
										onClick={showNextItem}
									/>
								</div>
							</>
						)}
					</div>
				</div>
			</Container>
			<Section3
				firstSection3Item={firstSection3Item}
				nextTwoSection3Items={nextTwoSection3Items}
			/>


			<Container className={styles.blackbox} fluid>
				<p className={styles.testimonial}>{data.section4_title1}</p>
				<div className={styles.actcard}>
					{data.section4.map((item: JSONData) => (
						<div key={item.id} className={styles.box}>
							<Image src="/quotes.svg"
								alt=">"
								width={25}
								height={25} />
							<div className={styles.sect_4description}>
								{item.description}
							</div>
							<div className={styles.details}>
								<div className={styles.name}>{item.name}</div>
								<div className={styles.designation}>{item.designation}</div>
							</div>
							<div className={styles.circularImageContainer}>
								<div className={styles.circularImageWrapper}>
									<DynamicImage
										objectFit="cover"
										src={item.image}
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			</Container>
			<Container className={styles.section_5}>
				<Section5
					title={data.section5_title}
					items={data.section_5}
				/>
			</Container>
			<Container >
				<Row className="mt-5">
					<Col lg={6}>
						<div className="mt-5 position-relative">
							<h2>{data.QA}</h2>
							<p className="mt-2 mb-5">
								{data.QA_title1}
							</p>

						</div>
					</Col>
					<Col className="mt-5" lg={6}>
						{data.qa_section.map((each: { question: any; answer: any; }, key: React.Key | null | undefined) => (
							<FaqSection key={key} question={each.question} answer={each.answer} />
						))}
					</Col>
				</Row>
			</Container>
			<Container className={styles.newsletter} fluid>
				<div className={styles.innerWrapper}>
					<Row>
						<Col lg={6} className="d-flex justify-content-center">
							<div className={styles.newsHeading}>
								<h2>{data.section_6.heading}</h2>
								<p>{data.section_6.text1}</p>
							</div>
						</Col>
						<Col lg={6} className="d-flex flex-column">
							<div className={styles.textarrow}>
								<span className={styles.text_box_content}>Get our newsletter</span>
								<Image
									src="/right_arrow.svg"
									alt="->"
									width={15}
									height={15}
									className={styles.arrow}
								/>
							</div>
							<p className="mt-3">{data.section_6.text2}</p>
						</Col>
					</Row>
				</div>
			</Container>
		</RootLayout>

	);
};

