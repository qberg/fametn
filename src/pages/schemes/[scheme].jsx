import RootLayout from "../../components/layout/layout";
// import { CacheHeaders, JSONData } from "../../../utils/definitions"
import { CacheHeaders } from "../../utils/definitions";

import { notFound } from "next/navigation";
import { getData } from "@/utils/api_calls";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./scheme.module.css"
import Link from "next/link";
import Separator from "@/components/separator";
import Image from "next/image";
import Breadcrumps from "@/components/breadcrumps";
import { useRouter } from "next/router";
import { getHeaderFooterData } from "../../utils/api_calls";


export const getServerSideProps = async (context) => {
	context.res.setHeader('Cache-Control', CacheHeaders);

	const { scheme } = context.query;
	const language = context.locale;

	const url = "https://" + process.env.API_ENDPOINT + "finance-schemes?filters[scheme_link][$eq]=" + scheme + "&populate=deep";
	const fullData = await getData(url, language);

	if (fullData.meta.pagination.total != 1) {
		context.res.writeHead(307, { Location: '/not-found' });
		context.res.end();
		return {
			props: {
				data: null,
				id: null
			}
		};
	}

	return {
		props: {
			data: fullData.data[0].attributes,
			id: fullData.data[0].id,
			headerFooter: await getHeaderFooterData(language)
		}
	};
};


function YellowBannerItem({ data }) {
	return (
		<div data-aos="fade-up mt-5" className={styles.scheme_banner}>
			<div data-aos="fade-up" className="d-flex smallest">
				<div className={styles.black_info}>
					<div className={styles.red_square}></div>
					{data.government}
				</div>
				<div className={styles.black_info}>
					<div className={styles.blue_square}></div>
					{data.government}
				</div>
			</div>
			<h1 data-aos="fade-up">
				{data.scheme_name}
			</h1>
			<p data-aos="fade-up">
				{data.scheme_description}
			</p>
		</div>
	)
}


const strings = {
	ob: {
		en: "Objective",
		ta: "இலக்கு"
	},
	kb: {
		en: "Key Benefits",
		ta: "முக்கிய நன்மைகள்"
	},
	ec: {
		en: "Eligibility Criteria",
		ta: "தகுதி மாநிலங்கள்"
	},
	hta: {
		en: "How to Apply / Office To Contact",
		ta: "விண்ணப்ப செய்வது எப்படி / அலுவலகம் தொடர்பு கொள்ள"
	},
	bf: {
		en: "Beneficiaries",
		ta: "பயனாளிகள்"
	},
	sa: {
		en: "Successfully Applied",
		ta: "வெற்றிகரமாக விண்ணப்பிக்கப்பட்டது"
	}
}

export default function Scheme({ data, id, headerFooter }) {
	const locale = useRouter().locale
	if (id == null) {
		notFound()
	}
	return (
		<RootLayout data={headerFooter}>
			<Container>
				<Breadcrumps items={[
					{ url: "/", text: "Home" },
					{ url: "/finance", text: "Finance" },
					{ url: "/finance/schemes", text: "Schemes" },
					{ url: `/finance/schemes/${data.scheme_link}`, text: data.scheme_name }
				]} />
				<div className="my-4"></div>
				<YellowBannerItem data={data} />

				<div className={styles.scheme_content}>
					<Row>
						<Col lg={8}>
							<div data-aos="fade-up" className={`${styles.buttonContainer} d-none d-lg-block mb-3 small`}>
								<button className={styles.button}>{strings.ob[locale]}</button>
								<button className={styles.button}>{strings.kb[locale]}</button>
								<button className={styles.button}>{strings.ec[locale]}</button>
								<button className={styles.button}>{strings.hta[locale]}</button>
							</div>

							<Row className={styles.new}>
								<Col className={styles.gray_sep_right} md={5}>
									<div data-aos="fade-up" className={styles.textAfterButtons}>
										{data.benificiaries}
									</div>
									<div data-aos="fade-up">{strings.bf[locale]}</div>
								</Col>
								<Col md={5}>
									<div data-aos="fade-up" className={styles.textAfterButtons}>
										{data.successfully_applied}
									</div>
									<div data-aos="fade-up" >{strings.sa[locale]}</div>
								</Col>
							</Row>

							<div className={styles.container}>
								<div className={styles.section}>
									<div data-aos="fade-up" className={styles.key}>
										<Image src={"/Goal_target.svg"} alt="" width={32} height={32} />
										<h6>{strings.ob[locale]}</h6>
									</div>
									<div className={styles.bullet}>
										<ul className={styles.bulletList}>
											<li data-aos="fade-up">{data.objective}
											</li></ul>
									</div>
									<div data-aos="fade-up" className={styles.key}>
										<Image src={"/key_benefits.svg"} alt="" width={32} height={32} />
										<h6>{strings.kb[locale]}</h6>

									</div>
									<div className={styles.bullet}>
										<ul className={styles.bulletList}>
											{data["key_benifits"].map((benefit) => (
												<li data-aos="fade-up" key={benefit.id}>{benefit.heading}</li>
											))}
										</ul>
									</div>

									<div data-aos="fade-up" className={styles.key}>
										<Image src={"/eligibility.svg"} alt="" width={32} height={32} />
										<h6>{strings.ec[locale]}</h6>
									</div>
									<div className={styles.bullet}>
										<ul className={styles.bulletList}>
											{data["eligibility_criteria"].map((criteria) => (
												<li data-aos="fade-up" key={criteria.id}>
													<div data-aos="fade-up">{criteria.heading}</div>
													<div data-aos="fade-up" className={`${styles.description} small`}>
														{criteria.description}
													</div>
												</li>
											))}
										</ul>
									</div>
									<div data-aos="fade-up" className={styles.key}>
										<Image src={"/how_to_apply.svg"} alt="" width={32} height={32} />
										<h6>{strings.hta[locale]}</h6>
									</div>
									<div className={styles.bullet}>
										<ul className={styles.linksty}>
											<li data-aos="fade-up">
												<Link href={data?.cta_link || "#"}>
													{data.how_to_apply_description}
												</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</Col>
						<Col lg={4}>
							<div data-aos="fade-up" className={styles.ctabox}>
								<div data-aos="fade-up" className={styles.ctahead}>
									{strings.hta[locale]}
								</div>
								<p data-aos="fade-up" className="small mt-2">
									{data.how_to_apply_cta_description}
								</p>

								<div data-aos="fade-up" className={styles.bluebutton}>
									<div className="ms-auto me-2 my-auto">
										<Image
											src="/apply_arrow.svg"
											alt="->"
											width={16}
											height={16}
										/>
									</div>
									<div className="me-auto small my-auto">
										Apply Now
									</div>
								</div>

							</div>
							{/* <div className="d-flex mt-3 my-auto">
								<div data-aos="fade-up">
									<h5 className={styles.mildhead}>Other schemes</h5>
								</div>
								<div data-aos="fade-up" className="ms-auto small my-auto">
									<Link href="/finance/schemes" ><u>See all</u>
									</Link>
								</div>
							</div> */}
						</Col>
					</Row>

				</div>
			</Container>
		</RootLayout>)
}