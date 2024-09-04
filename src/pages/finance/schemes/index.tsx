import RootLayout from "../../../components/layout/layout";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";

import styles from "./scheme.module.css"
import Separator from "@/components/separator";
import Image from 'next/image'
import { CacheHeaders, JSONData } from "@/utils/definitions";
import { getData } from "@/utils/api_calls";


import axios from "axios";
import { useEffect, useRef, useState } from "react";
import SearchBox from "@/components/searchbox";
import SchemeCard from "@/components/schemecard";
import FinanceSchemeFilter from "@/components/finance_scheme_filters";
import Pagination from "@/components/pagination";
import { useSearchParams } from "next/navigation";

export async function getServerSideProps(context: JSONData) {

	context.res.setHeader(
		'Cache-Control',
		CacheHeaders
	)

	const { category, page } = context.query;
	const language = context.locale

	const path = "finance-scheme-categories?populate[finance_schemes][fields][0]=scheme_link&populate[finance_schemes][fields][1]=scheme_name&populate[finance_schemes][fields][2]=scheme_description&populate[finance_schemes][fields][3]=government&populate[finance_schemes][fields][4]=is_featured&populate[finance_schemes][populate][0]=icon&populate[finance_schemes][populate][1]=finance_scheme_implementing_agency&populate[finance_schemes][fields][5]=filter_subsidy_rate&populate[finance_schemes][fields][6]=filter_interest_rate&populate[finance_schemes][fields][7]=filter_grant_amount"
	const agencyPath = "finance-scheme-implementing-agencies?fields[0]=name"

	// Get all categories and top schemes
	const categoryUrl = "https://" + process.env.API_ENDPOINT + path
	const agencyUrl = "https://" + process.env.API_ENDPOINT + agencyPath

	const agencyData = await getData(agencyUrl, language)
	const categoryData = await getData(categoryUrl, language)
	console.log('categoryData is:', categoryData);
	const categoryList = categoryData.data.map((item: JSONData) => ({
		"text": item.attributes.name,
		"link": item.attributes.name.toLowerCase().replace(" ", "-"),
		"schemes": item.attributes.finance_schemes.data
	}))


	var currentCategory = null

	const agencyList = agencyData?.data?.map((agency: JSONData) => agency.attributes.name).sort()

	if (category && categoryList.map((item: JSONData) => item.link).includes(category)) {
		currentCategory = category
	}

	return {
		props: {
			categories: categoryList,
			currentCategory: currentCategory,
			agencyList: agencyList
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

const NoResult = () => {
	return (<div className={styles.noreswrap}>
		<div>No results found illustration.</div>
	</div>)
}

const MobileStickyTop = ({ max_top, children }: JSONData) => {

	const [refY, setRefY] = useState(28)
	const refYasRef = useRef<number>(28);
	const [scrollPosition, setScrollPosition] = useState(218);
	const targetRef = useRef<HTMLInputElement>(null);
	useEffect(() => {

		const updateScrollPosition = () => {
			if (targetRef.current) {
				const rect = targetRef.current.getBoundingClientRect();

				try {
					const parentRect = targetRef.current.offsetParent?.getBoundingClientRect();
					refYasRef.current = Math.max(rect.top - (parentRect?.top || 0), refYasRef.current)
				} catch {
				}

				setScrollPosition(refYasRef.current - window.pageYOffset)
			}
		};
		window.addEventListener('scroll', updateScrollPosition);
		return () => {
			window.removeEventListener('scroll', updateScrollPosition);
		};
	}, []);

	const content = (
		<div>
			{children}
		</div>
	)

	return (
		<>
			{/* {(scrollPosition <= max_top) && (<div arc={{ position: "fixed", top: max_top, zIndex: 2, width: "100%" }}>{content}</div>)}
			<div ref={targetRef}>{content}</div> */}
		</>

	);
}


export default function Finance({ currentCategory, categories, agencyList }: JSONData) {
	const [category, setCategory] = useState(currentCategory);

	const [subsidyRate, setSubsidyRate] = useState([0, 100]);
	const [interestRate, setInterestRate] = useState(100);
	const [agencySelection, setAgencySelection] = useState(agencyList)
	const [grant, setGrant] = useState(0);

	const searchParams = useSearchParams();




	const onChange = (subsidyInc: number[], interestInc: number, grantInc: number, agencyInc: string[]) => {
		setSubsidyRate(subsidyInc)
		setInterestRate(interestInc)
		setGrant(grantInc)
		setAgencySelection(agencyInc)
	}

	const requiredSchemes = filterDuplicateIds(categories.flatMap((item: JSONData) => {
		if (category == null || item.link == category) {
			return item.schemes
		} else {
			return []
		}
	}))
		.filter((scheme: JSONData) => {
			const currentSubsidyRate = parseInt(scheme?.attributes?.filter_subsidy_rate) || 0
			return currentSubsidyRate >= subsidyRate[0] && currentSubsidyRate <= subsidyRate[1]
		})
		.filter((scheme: JSONData) => {
			const currentInterestRate = parseInt(scheme?.attributes?.filter_interest_rate) || 0
			return currentInterestRate <= interestRate
		})
		.filter((scheme: JSONData) => {
			const currentGrant = parseInt(scheme?.attributes?.filter_grant_amount) || 0
			return currentGrant >= grant
		})
		.filter((scheme: JSONData) => {
			const currentAgency = scheme?.attributes?.finance_scheme_implementing_agency?.data?.attributes?.name || "No Name"

			return agencySelection.includes(currentAgency)
		})
		.sort((firstData, secondData) => (firstData.attributes.scheme_name > secondData.attributes.scheme_name) ? 1 : -1)

	const featuredSchemes = requiredSchemes.filter((item: JSONData) => item.attributes.is_featured == true)

	const page = parseInt(searchParams?.get("page") || "1")
	const numItemsPerPage = 6
	const totalItems = requiredSchemes.length

	const totalPages = Math.ceil(totalItems / numItemsPerPage)

	const pagedReqSchemes = requiredSchemes.slice((page - 1) * numItemsPerPage, page * numItemsPerPage)

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
							<div className={`${styles.bolder} ${styles.rounded} ${category ? styles.inactive : styles.active}`} >
								All Categories
							</div>
						</Link>
						{categories.map((each: JSONData, id: number) => {
							return (
								<div key={id}>
									<Link onClick={() => setCategory(each.link)} href={`/finance/schemes?category=${each.link}`}>
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
												<div key={scheme.id} className={`${styles.side_child} small`}>
													<Link href={`/finance/schemes/${scheme.attributes.scheme_link}`}>

														<div className="d-flex">
															{scheme.attributes.scheme_name}
														</div>
													</Link>

												</div>

											)
										})}
									</div>
								</div>
							)
						})}
					</div>
					<div className={styles.fscheme}>
						<div className="d-flex">
							<div><h2>Schemes</h2></div>
							<div className="ms-auto mt-0">
								<FinanceSchemeFilter onChange={onChange} agencies={agencyList} />
							</div>
						</div>

						<div className="d-block d-lg-none">
							<MobileStickyTop max_top={62} >
								<div className={styles.mobilecategory}>Categories for mobile view</div>
							</MobileStickyTop>
						</div>

						<div data-aos="fade-up" className={`d-lg-flex ${styles.fschemelineparent}`}>
							<h5 className={styles.subtext}>Featured Schemes</h5>
							<div className={`d-none d-lg-flex ${styles.line}`}></div>
						</div>
						<Row>
							{(featuredSchemes.length > 0) ? featuredSchemes.map((each: JSONData) => {
								const data = each.attributes;
								return (<Col xl={4} lg={6} key={each.id}>
									<SchemeCard
										link={"/finance/schemes/" + data.scheme_link}
										title={data.scheme_name}
										icon={data.icon}
										description={data.scheme_description}
										government={data.government}
										implementingAgency={data.finance_scheme_implementing_agency?.data?.attributes?.name}
									/>
								</Col>)
							}) : (<NoResult />)}
						</Row>


						<div data-aos="fade-up" className={`d-lg-flex ${styles.fschemelineparent}`}>
							<h5 className={styles.subtext}>All Schemes</h5>
							<div className={`d-none d-lg-flex ${styles.line}`}></div>
						</div>
						<Row>
							{(pagedReqSchemes.length > 0) ? pagedReqSchemes.map((each: JSONData) => {
								const data = each.attributes;
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
							}) : (<NoResult />)}
						</Row>
						<div className={styles.minline}></div>
						<Row>
							<Col lg={12}>
								<center><Pagination totalPages={totalPages} page={page} /></center>
							</Col>
						</Row>
					</div>
				</div>

			</Container>
		</RootLayout>)
}