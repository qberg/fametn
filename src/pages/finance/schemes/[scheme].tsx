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


					<div className={styles.mainContent}>

						<div className={`${styles.buttonContainer} d-none d-lg-block`}>
							<button className={styles.button}>objective</button>
							<button className={styles.button}>key benefits</button>
							<button className={styles.button}>Eligibility</button>
							<button className={styles.button}>How to Apply</button>
						</div>

						<div className={`row ${styles.new}`} style={{ height: '7em' }}>
							<div className="col-4" style={{ borderRight: '2px solid #ccc', height: '5em' }}>
								<div className={styles.textAfterButtons}>
									{data.benificiaries}
								</div>
								<div style={{ marginBottom: '3em' }}>Beneficiaries</div>
							</div>
							<div className="col-5">
								<div className={styles.textAfterButtons}>{data.successfully_applied}</div>
								<div style={{ marginBottom: '10px', fontWeight: '400' }}>Successfully Applied</div>
							</div>
						</div>

						<div className={styles.container}>
							<div className={styles.section}>						
								<div className={styles.key}>
									<img src="/Goal_target.svg" alt="Your Image" />
									<h6>OBJECTIVES</h6>
								</div>
								<div className={styles.bullet}>
									<ul className={styles.bulletList}>
										<li>{data.objective}
										</li></ul>
								</div>
								<div className={styles.key}>
									<img src="/key_benefits.svg" alt="Your Image" />
									<h6>KEY BENEFITS</h6>

								</div>
								<div className={styles.bullet}>
									<ul className={styles.bulletList}>
										{data["key_benifits"].map((benefit: JSONData) => (
											<li key={benefit.id}>{benefit.heading}</li>
										))}
									</ul>
								</div>

								<div className={styles.key}>
									<img src="/eligibility.svg" alt="Your Image" />
									<h6>ELIGIBILITY CRITERIA</h6>
								</div>
								<div className={styles.bullet}>
									<ul className={styles.bulletList}>
										{data["eligibility_criteria"].map((criteria: JSONData) => (
											<li key={criteria.id}>
												<div style={{ fontWeight: 500 }}>{criteria.heading}</div>
												<div className={styles.description}>
													{criteria.description}
												</div>
											</li>
										))}
									</ul>
								</div>
								<div className={styles.key}>
									<img src="/how_to_apply.svg" alt="Your Image" />
									<h6>HOW TO APPLY/ OFFICE TO CONTACT</h6>
								</div>
								<div className={styles.bullet}>
									<ul className={styles.linksty}>
										<li>
											<a href={data.how_to_apply_description}>
												{data.how_to_apply_description}</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.sideContent}>
					</div>
				</div>
			</Container>
		</RootLayout>)
}