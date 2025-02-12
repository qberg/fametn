import RootLayout from "@/components/layout/layout";
import SearchIcon from '@mui/icons-material/Search';
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";

import styles from "./scheme.module.css"
import Image from 'next/image'
import { CacheHeaders } from "@/utils/definitions";
import { getData, getDataFromPath, getHeaderFooterData } from "@/utils/api_calls";


import { useEffect, useState } from "react";
// import SearchBox from "@/components/searchbox";
import SchemeCard from "@/components/schemecard";
import FinanceSchemeFilter from "@/components/finance_scheme_filters";
import Pagination from "@/components/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import Breadcrumps from "@/components/breadcrumps";
import { useRouter } from "next/router";

const strings = {
	nores: {
		en: "No results found.",
		ta: "எந்த முடிவும் கிடைக்கவில்லை."
	},
	search: {
		en: "Search",
		ta: "தேடு"
	}
}

function TopBanner({ schemeMeta, agencyList, onFilterChange }) {
	return (<div className="d-flex">
		<div><h2>{schemeMeta.schemes}</h2></div>
		<div className="ms-auto mt-0">
			<FinanceSchemeFilter onChange={onFilterChange} agencies={agencyList} />
		</div>
	</div>)
}

function FeaturedSchemes({ schemes }) {
	const pathname = usePathname()

	return (<Row>
		{(schemes.length > 0) ? schemes.map((each) => {
			const data = each.attributes;
			return (<Col xl={4} lg={6} key={each.id}>
				<SchemeCard
					link={pathname + "/" + data.scheme_link}
					title={data.scheme_name}
					icon={data.icon}
					description={data.scheme_description}
					government={data.government}
					implementingAgency={data.finance_scheme_implementing_agency?.data?.attributes?.name}
				/>
			</Col>)
		}) : (<NoResult />)}
	</Row>)
}

function AllSchemsBanner({ schemeMeta }) {
	return (
		<div data-aos="fade-up" className={`d-lg-flex ${styles.fschemelineparent}`}>
			<h5 className={styles.subtext}>{schemeMeta.all_schemes}</h5>
			<div className={`d-none d-lg-flex ${styles.line}`}></div>
		</div>)
}


function AllSchemes({ allResults }) {
	const pathname = usePathname()
	return (<Row>
		{(allResults.length > 0) ? allResults.map((each) => {
			const data = each.attributes;
			return (<Col xl={4} lg={6} md={12} key={each.id}>
				<SchemeCard
					link={pathname + "/" + data.scheme_link}
					title={data.scheme_name}
					icon={data.icon}
					description={data.scheme_description}
					government={data.government}
					implementingAgency={data.finance_scheme_implementing_agency?.data?.attributes?.name}
				/>
			</Col>)
		}) : (<NoResult />)}
	</Row>)
}

function BottomPagination({ totalPages, page }) {
	return (
		<>
			<div className={styles.minline}></div>
			<Row>
				<Col lg={12}>
					<center><Pagination totalPages={totalPages} page={page} /></center>
				</Col>
			</Row>
		</>)
}

function FeaturedSchemesBanner({ schemeMeta }) {
	return (<div data-aos="fade-up" className={`d-lg-flex ${styles.fschemelineparent}`}>
		<h5 className={styles.subtext}>{schemeMeta.featured_schemes}</h5>
		<div className={`d-none d-lg-flex ${styles.line}`}></div>
	</div>)
}

export async function getServerSideProps(context) {

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
	const categoryList = categoryData.data.map((item) => ({
		"text": item.attributes.name,
		"link": item.attributes.name.toLowerCase().replace(" ", "-"),
		"schemes": item.attributes.finance_schemes.data
	}))

	var currentCategory = null

	const agencyList = agencyData?.data?.map((agency) => agency.attributes.name).sort()

	if (category && categoryList.map((item) => item.link).includes(category)) {
		currentCategory = category
	}


	return {
		props: {
			schemeMeta: schemeMeta.data.attributes,
			categories: categoryList,
			currentCategory: currentCategory,
			agencyList: agencyList,
			headerFooter: await getHeaderFooterData(language)
		}
	}
}

const filterDuplicateIds = (items) => {
	var ids_seen = new Set()
	return items.filter(item => {
		if (ids_seen.has(item.id)) return false;

		ids_seen.add(item.id)
		return true
	})
}

const NoResult = () => {
	const { locale } = useRouter()

	return (<div className={styles.noreswrap}>
		<div>{strings.nores[locale || "en"]}</div>
	</div>)
}


function searchAndRank(schemes, searchText) {
	const sortByName = (firstData, secondData) => (firstData.attributes.scheme_name > secondData.attributes.scheme_name) ? 1 : -1
	if (searchText == "") {
		return schemes.sort(sortByName)
	}

	const searchWords = searchText.toLowerCase().split(" ")
	const rankingFunction = (scheme) => {
		const data = scheme.attributes
		const name = data.scheme_name.toLowerCase()
		const description = data.scheme_description.toLowerCase()
		const government = data.government.toLowerCase()
		const agency = data.finance_scheme_implementing_agency?.data?.attributes?.name.toLowerCase()

		const score = searchWords.reduce((acc, word) => {
			return acc + (name.includes(word) ? 10 : 0) + (description.includes(word) ? 5 : 0) + (government.includes(word) ? 3 : 0) + (agency.includes(word) ? 2 : 0)
		}, 0)

		return score
	}
	const ranks = schemes.map((scheme) => ({ "scheme": scheme, "rank": rankingFunction(scheme) }))
	const filteredRanks = ranks.filter((rank) => rank.rank > 0)

	const sortedRanks = filteredRanks.sort((first, second) => second.rank - first.rank)
	return sortedRanks.map((rank) => rank.scheme)
}

export default function Schemes({ currentCategory, categories, agencyList, headerFooter, schemeMeta }) {
	const searchParams = useSearchParams();
	const { locale } = useRouter();

	const [category, setCategory] = useState(currentCategory);
	const [subsidyRate, setSubsidyRate] = useState([0, 100]);
	const [interestRate, setInterestRate] = useState(100);
	const [agencySelection, setAgencySelection] = useState(agencyList)
	const [grant, setGrant] = useState(0);
	const [finalSchemes, setFinalSchemes] = useState([])
	const [searchText, setSearchText] = useState("");

	const searchChangeHandler = (e) => {
		setSearchText(e.target.value)
	}



	const setFilters = (subsidyInc, interestInc, grantInc, agencyInc) => {
		setSubsidyRate(subsidyInc)
		setInterestRate(interestInc)
		setGrant(grantInc)
		setAgencySelection(agencyInc)
	}




	useEffect(() => {
		const filterSubsidyRate = (scheme) => {
			const currentSubsidyRate = parseInt(scheme?.attributes?.filter_subsidy_rate) || 0
			return currentSubsidyRate >= subsidyRate[0] && currentSubsidyRate <= subsidyRate[1]
		}

		const filterInterestRate = (scheme) => {
			const currentInterestRate = parseInt(scheme?.attributes?.filter_interest_rate) || 0
			return currentInterestRate <= interestRate
		}

		const filterGrant = (scheme) => {
			const currentGrant = parseInt(scheme?.attributes?.filter_grant_amount) || 0
			return currentGrant >= grant
		}

		const filterAgency = (scheme) => {
			const currentAgency = scheme?.attributes?.finance_scheme_implementing_agency?.data?.attributes?.name || "No Name"
			return agencySelection.includes(currentAgency)
		}

		const requiredSchemes = filterDuplicateIds(categories.flatMap((item) => {
			if (category == null || item.link == category) {
				return item.schemes
			} else {
				return []
			}
		}))
			.filter(filterSubsidyRate)
			.filter(filterInterestRate)
			.filter(filterGrant)
			.filter(filterAgency)

		const rankedAndSearched = searchAndRank(requiredSchemes, searchText)
		setFinalSchemes(rankedAndSearched)
	}, [category, subsidyRate, interestRate, grant, agencySelection, searchText])


	const featuredSchemes = finalSchemes.filter((item) => item.attributes.is_featured == true)

	const page = parseInt(searchParams?.get("page") || "1")
	const numItemsPerPage = 6
	const totalItems = finalSchemes.length
	const totalPages = Math.ceil(totalItems / numItemsPerPage)

	const pagedReqSchemes = finalSchemes.slice((page - 1) * numItemsPerPage, page * numItemsPerPage)

	const pathname = usePathname()
	console.log(schemeMeta)



	return (
		<RootLayout seo={schemeMeta.seo} data={headerFooter}>
			<Breadcrumps items={schemeMeta.breadcrumps} />
			<Container>
				<div className="d-block d-lg-none">
					<div className="bordersearch">
						<SearchIcon />
						<input
							value={searchText}
							type="text"
							placeholder={strings.search[locale]}
							className="search me-1"
							onChange={searchChangeHandler}
						/>
					</div>
				</div>
				<div className="d-flex mt-4">
					<div className={`d-none d-lg-block ${styles.leftPaneDesktop}`}>
						<div className="d-flex mb-2">

							<div className="bordersearch">
								<SearchIcon />
								<input
									value={searchText}
									type="text"
									placeholder={strings.search[locale]}
									className="search me-1"
									onChange={searchChangeHandler}
								/>
							</div>
						</div>

						<Link onClick={() => setCategory(null)} href="#">
							<div className={`${styles.bolder} ${styles.rounded} ${category ? styles.inactive : styles.active}`} >
								{schemeMeta.all_collections}
							</div>
						</Link>
						{categories.map((each, id) => {
							return (
								<div key={id}>
									<Link onClick={() => setCategory(each.link)} href={`${pathname}?category=${each.link}`}>
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
										{each.schemes.map((scheme) => {
											return (
												<div key={scheme.id} className={`${styles.side_child} small`}>
													<Link href={`${pathname}/${scheme.attributes.scheme_link}`}>
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
						<TopBanner schemeMeta={schemeMeta} agencyList={agencyList} onFilterChange={setFilters} />
						{searchText == "" && (<><FeaturedSchemesBanner schemeMeta={schemeMeta} />
						<FeaturedSchemes schemes={featuredSchemes} /></>)}
						<AllSchemsBanner schemeMeta={schemeMeta} />
						<AllSchemes allResults={pagedReqSchemes} />
						<BottomPagination totalPages={totalPages} page={page} />
					</div>
				</div>

			</Container>
		</RootLayout>)
}