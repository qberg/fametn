import RootLayout from "../../layout";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";

import styles from "./scheme.module.css"
import Separator from "@/components/separator";
import Image from 'next/image'
import { CacheHeaders, JSONData } from "@/utils/definitions";
import { getData } from "@/utils/api_calls";


import axios from "axios";
import { useState } from "react";
import SearchBox from "@/components/searchbox";
import SchemeCard from "@/components/schemecard";

export async function getServerSideProps(context: JSONData) {

	context.res.setHeader(
		'Cache-Control',
		CacheHeaders
	)
	const { category, page } = context.query;
	const language = context.locale

	const path = "finance-scheme-categories?populate[finance_schemes][fields][0]=scheme_link&populate[finance_schemes][fields][1]=scheme_name&populate[finance_schemes][fields][2]=scheme_description&populate[finance_schemes][fields][3]=government&populate[finance_schemes][fields][4]=is_featured&populate[finance_schemes][populate][0]=icon&populate[finance_schemes][populate][1]=finance_scheme_implementing_agency"

	// Get all categories and top schemes
	const categoryUrl = "https://" + process.env.API_ENDPOINT + path
	const categoryData = await getData(categoryUrl, language)

	const categoryList = categoryData.data.map((item: JSONData) => ({
		"text": item.attributes.name,
		"link": item.attributes.name.toLowerCase().replace(" ", "-"),
		"schemes": item.attributes.finance_schemes.data
	}))


	const currentPage = page | 0
	var currentCategory = null

	if (category && categoryList.map((item: JSONData) => item.link).includes(category)) {
		currentCategory = category
	}

	return {
		props: {
			categories: categoryList,
			currentCategory: currentCategory
		}
	}
}

const filterDuplicateIds = (items: Array<JSONData>) => {
	var ids_seen = new Set()
	return items.filter(item => {
		if (ids_seen.has(item.id)) return false;

		ids_seen.add(item.id)
		return true
	})
}


export default function Finance({ currentCategory, categories }: JSONData) {
	const [category, setCategory] = useState(currentCategory);


	const requiredSchemes = filterDuplicateIds(categories.flatMap((item: JSONData) => {
		if (category == null || item.link == category) {
			return item.schemes
		} else {
			return []
		}
	}))


	const featuredSchemes = requiredSchemes.filter((item: JSONData) => item.attributes.is_featured == true)

	console.log(requiredSchemes)


	return (
		<RootLayout>
			<Container>
				<div className="mt-5">
					<Link className={styles.bluelink} href="/">Home</Link>
					<Separator />
					<Link className={styles.graylink} href="/finance">Finance</Link>
					<Separator />
					<Link className={styles.graylink} href="/finance/schemes">Schemes</Link>
				</div>

				<div className="d-flex mt-4">
					{/* Default display none, block display for large screens */}
					<div className={`d-none d-lg-block ${styles.leftPaneDesktop}`}>
						<div className="d-flex mb-2">
							<SearchBox />
						</div>

						<Link onClick={() => setCategory(null)} href="/finance/schemes">
							<div style={{ fontWeight: "600" }} className={`${styles.rounded} ${category ? styles.inactive : styles.active}`} >
								All Categories
							</div>
						</Link>
						{categories.map((each: JSONData) => {
							return (
								<div key={each.id}>
									<Link key={each.id} onClick={() => setCategory(each.link)} href={`/finance/schemes?category=${each.link}`}>
										<div className={`${styles.rounded} ${(category && category == each.link) ? styles.active_opt : styles.inactive_opt} d-flex`}>
											<div>
												{each.text} ({each.schemes.length})
											</div>
											<div className="ms-auto">
											<Image
												className={`${(category && category == each.link) ? styles.arrow_active : styles.arrow_inactive}`}
												src="/arrow_down.svg"
												alt="->"
												width={24}
												height={24}
											/>
											</div>
										</div>
									</Link>

									<div className={`${styles.leftcontent} ${(category && category == each.link) ? styles.expand : styles.contract}`}>
										{each.schemes.map((scheme: JSONData) => {
											return (
												<Link key={scheme.id} href={`/finance/schemes/${scheme.attributes.scheme_link}`}>
													<div className="d-flex">
														{scheme.attributes.scheme_name}
														<hr></hr>
													</div>
												</Link>

											)
										})}
									</div>
								</div>
							)
						})}
					</div>
					<div className={styles.fscheme}>
						<h2>Schemes</h2>
						<div className={`d-none d-lg-flex ${styles.fschemelineparent}`}>
							<h5 className={styles.subtext}>Featured Schemes</h5>
							<div className={styles.line}></div>
						</div>
						<Row>
							{featuredSchemes.map((each: JSONData) => {
								const data = each.attributes;
								return (<Col lg={4} key={each.id}>
									<SchemeCard 
										link={"/finance/schemes/" + data.scheme_link}
										title={data.scheme_name}
										icon={data.icon}
										description={data.scheme_description}
										government={data.government}
										implementingAgency={data.finance_scheme_implementing_agency?.data?.attributes?.name}
										/>
								</Col>)
							})}
						</Row>
						<div className={`d-none d-lg-flex ${styles.fschemelineparent}`}>
							<h5 className={styles.subtext}>All Schemes</h5>
							<div className={styles.line}></div>
						</div>
						<Row>
							{requiredSchemes.map((each: JSONData) => {
								const data = each.attributes;
								console.log(data)
								return (<Col xl={4} lg={6} md={12} key={each.id}>
									<SchemeCard 
										link={"/finance/schemes/" + data.scheme_link}
										title={data.scheme_name}
										icon={data.icon}
										description={data.scheme_description}
										government={data.government}
										implementingAgency={data.finance_scheme_implementing_agency?.data?.attributes?.name}
										/>
								</Col>)
							})}
						</Row>
					</div>
				</div>

			</Container>
		</RootLayout>)
}