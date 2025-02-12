import { Col, Container, Row } from "react-bootstrap";

import styles from "./footer.module.css"
import { JSONData } from "@/utils/definitions";
import YellowArrowButton from "../yellow_arrow_button";
import Link from "next/link";
import Image from "next/image";


const strings = {
	insta: {
		en: "Instagram",
		ta: "இன்ஸ்டாகிராம்"
	},
	fb: {
		en: "Facebook",
		ta: "ஃபேஸ்புக்"
	},
	yt: {
		en: "Youtube",
		ta: "யூடியூப்"
	},
}


const Footer = ({ data }: JSONData) => {
	console.log(data)

	function FooterLink({ each }: JSONData) {
		return (
			<div className="mb-2">
				<Link className={styles.cottoncandy} href={each.url || "#"}>
					{each.text}
				</Link>
			</div>
		)
	}

	function Socials({ src, text, url }: JSONData) {
		return (
			<Link href={url || "#"}>
				<div data-aos="fade-up" className="d-flex me-3">
					<div className="my-auto me-1">
						<Image src={src} height={14} width={14} alt={text} />
					</div>
					<div className={`${styles.whitesoc} my-auto`}>
						{text}
					</div>
				</div>
			</Link>
		)
	}

	return (
		<footer>
			<Container className={styles.footer} fluid>
				<Container>
					<Row className="py-5">
						<Col lg={5}>
							<h2 data-aos="fade-up">
								{data.footer_title_1}
							</h2>
							<div data-aos="fade-up" className="mt-4">
								<YellowArrowButton text={data.footer_cta_link} link={data.footer_cta_link} />
							</div>
						</Col>
						<Col lg={1}></Col>
						<Col lg={2}></Col>
						<Col data-aos="fade-up" data-aos-delay={100} lg={2}>
							{data.foolter_links_col_1.map((each: JSONData, index: number) => {
								return (<FooterLink key={index} each={each} />)
							})}
						</Col>
						<Col data-aos="fade-up" data-aos-delay={200} lg={2}>
							{data.footer_links_col_2.map((each: JSONData, index: number) => {
								return (<FooterLink key={index} each={each} />)
							})}
						</Col>
					</Row>
					<Row>
						<Col lg={6}>
							<div className={styles.logobox}>
								<div data-aos="fade-up" className="d-flex">
									<div className="mb-1 me-3">
										<Image src="/tn_logo.png" width={60} height={60} alt="tn logo" />
									</div>
									<div>
										<Image src="/fame_tn_logo.png" width={115} height={60} alt="tn logo" />
									</div>
								</div>
							</div>
						</Col>
						<Col lg={6}>
							<div className="d-flex mb-1" data-aos="fade-up">
								<Socials src="/footer_insta.svg" text={strings.insta.en} url={data.insta_link} />
								<Socials src="/footer_facebook.svg" text={strings.fb.en} url={data.facebook_link} />
								<Socials src="/footer_youtube.svg" text={strings.yt.en} url={data.youtube_link} />
							</div>
							<div className={styles.yellowtom}>
								<h3 data-aos="fade-up">
									{data.footer_title}
								</h3>

								<Link className="mb-5" href={data.footer_link || "#"}>
									<div data-aos="fade-up" className="d-flex">
										<div className="my-auto me-3">
											<h5 className={`mb-0 ${styles.blackonly}`}>
												<u>{data.footer_subtitle}</u>
											</h5>
										</div>
										<div className="my-auto">
											<Image src="/footer_right.svg" width={30} height={30} alt="footer right" />
										</div>
									</div>
								</Link>

								<div data-aos="fade-up" className="mt-auto ms-auto">
									<Image src="/footer_dontlookup.svg" width={50} height={50} alt="footer dont lookup" />
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</Container>
		</footer>

	)
}
export default Footer;