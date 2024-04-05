import RootLayout from "../../layout";
import { CacheHeaders, JSONData } from "../../../utils/definitions"

// import SchemeLayout from "../../../components/financeschemelayout";
import { useRouter } from 'next/router'
import axios from "axios";
import { NextResponse } from "next/server";
import { notFound } from "next/navigation";
import { getData } from "@/utils/api_calls";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./scheme.module.css"
import Link from "next/link";
import Separator from "@/components/separator";
import Image from "next/image";

export const getServerSideProps = async (context: JSONData) => {
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
			id: fullData.data[0].id
		}
	};
};



export default function Finance({ data, id }: JSONData) {
	if (id == null) {
		notFound()
	}
	return (
		<RootLayout>
			<Container>
				<div data-aos="fade-up" className="mt-5 mb-4">
					<Link className={styles.bluelink} href="/">Home</Link>
					<Separator />
					<Link className={styles.graylink} href="/finance">Finance</Link>
					<Separator />
					<Link className={styles.graylink} href="/finance/schemes">Schemes</Link>
					<Separator />
					<Link className={styles.graylink} href={`/finance/schemes/${data.scheme_link}`}>{data.scheme_name}</Link>
				</div>
				<div data-aos="fade-up" className={styles.scheme_banner}>
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
					<p>
						{data.scheme_description}
					</p>
				</div>
				<div className={styles.scheme_content}>
					<Row>
						<Col lg={9}>
							<div data-aos="fade-up" className={`${styles.buttonContainer} d-none d-lg-block mb-3`}>
								<button className={styles.button}>Objective</button>
								<button className={styles.button}>Key Benefits</button>
								<button className={styles.button}>Eligibility</button>
								<button className={styles.button}>How to Apply</button>
							</div>

							<Row className={styles.new}>
								<Col className={styles.gray_sep_right} md={5}>
									<div data-aos="fade-up" className={styles.textAfterButtons}>
										{data.benificiaries}
									</div>
									<div data-aos="fade-up">Beneficiaries</div>
								</Col>
								<Col md={5}>
									<div data-aos="fade-up" className={styles.textAfterButtons}>
										{data.successfully_applied}
									</div>
									<div data-aos="fade-up" >Successfully Applied</div>
								</Col>
							</Row>


							<div className={styles.container}>
								<div className={styles.section}>
									<div data-aos="fade-up" className={styles.key}>
										<img src="/Goal_target.svg" alt="Your Image" />
										<h6>Objectives</h6>
									</div>
									<div className={styles.bullet}>
										<ul className={styles.bulletList}>
											<li data-aos="fade-up">{data.objective}
											</li></ul>
									</div>
									<div data-aos="fade-up" className={styles.key}>
										<img src="/key_benefits.svg" alt="Your Image" />
										<h6>Key Benefits</h6>

									</div>
									<div className={styles.bullet}>
										<ul className={styles.bulletList}>
											{data["key_benifits"].map((benefit: JSONData) => (
												<li data-aos="fade-up" key={benefit.id}>{benefit.heading}</li>
											))}
										</ul>
									</div>

									<div data-aos="fade-up" className={styles.key}>
										<img src="/eligibility.svg" alt="Your Image" />
										<h6>Eligibility Criteria</h6>
									</div>
									<div className={styles.bullet}>
										<ul className={styles.bulletList}>
											{data["eligibility_criteria"].map((criteria: JSONData) => (
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
										<img src="/how_to_apply.svg" alt="Your Image" />
										<h6>How to Apply/ Office To Contact</h6>
									</div>
									<div className={styles.bullet}>
										<ul className={styles.linksty}>
											<li data-aos="fade-up">
												<Link href={data?.cta_link}>
													{data.how_to_apply_description}
												</Link>
												{/* <a href={data.how_to_apply_description}>
													{data.how_to_apply_description}</a> */}
											</li>
										</ul>
									</div>
								</div>
							</div>
						</Col>
						<Col lg={3}>
							<div data-aos="fade-up" className={styles.ctabox}>
								<div data-aos="fade-up" className={styles.ctahead}>
									How to Apply / Office to Contact
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
							<div className="d-flex mt-3 my-auto">
								<div data-aos="fade-up">
									<h5 className={styles.mildhead}>Other schemes</h5>
								</div>
								<div data-aos="fade-up" className="ms-auto small my-auto">
									<Link href="/finance/schemes" ><u>See all</u>
									</Link>
								</div>
							</div>
						</Col>
					</Row>

				</div>
			</Container>
		</RootLayout>)
}