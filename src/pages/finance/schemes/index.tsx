import RootLayout from "../../layout";
import { Container } from "react-bootstrap";
import Link from "next/link";

import styles from "./scheme.module.css"
import Separator from "@/components/separator";
import Image from 'next/image'
import { CacheHeaders, JSONData } from "@/utils/definitions";
import { getData } from "@/utils/api_calls";


import axios from "axios";
import { useState } from "react";

export async function getServerSideProps(context : JSONData) {

context.res.setHeader(
'Cache-Control',
	CacheHeaders
)
const {category, page} = context.query;
const language = context.locale

const path = "finance-scheme-categories?populate[finance_schemes][fields][0]=scheme_link&populate[finance_schemes][fields][1]=scheme_name&populate[finance_schemes][fields][2]=scheme_description&populate[finance_schemes][fields][3]=government&populate[finance_schemes][populate][0]=icon&populate[finance_schemes][populate][1]=finance_scheme_implementing_agency"



// Get all categories and top schemes
const categoryUrl = "https://" + process.env.API_ENDPOINT + path
const categoryData = await getData(categoryUrl, language)

const categoryList = categoryData.data.map((item: JSONData) => ({
	"text": item.attributes.name, 
	"link" : item.attributes.name.toLowerCase().replace(" ", "-"),
	"schemes" : item.attributes.finance_schemes.data
}))
// const categoryNameLinkList = categoryData.data.map((item: JSONData) => ())


const currentPage = page | 0
var currentCategory = null



console.log(category, categoryList)
if ( category && categoryList.map((item: JSONData) => item.link).includes(category)) {
	currentCategory = category
}
return {
	props : {
		categories : categoryList,
		currentCategory: currentCategory
	}
}
}

export default function Finance({ currentCategory, categories } : JSONData ) {
	const [category, setCategory] = useState(currentCategory);
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
					<div>
						SEARCHBOX PLACEHOLDER {currentCategory}
					</div>

					<Link onClick={() => setCategory(null)} href ="/finance/schemes">
						<div className={`${styles.rounded} ${category? styles.inactive : styles.active}`} >
							All Categories
						</div>
					</Link>
					{categories.map((each: JSONData) => {
						return (<div key={each.id}>
							<Link key={each.id} onClick={() => setCategory(each.link)} href={`/finance/schemes?category=${each.link}`}>
								<div className={`${styles.rounded} ${(category && category == each.link)? styles.active : styles.inactive}`}>
									{each.text}
								</div>
					
							</Link>

						<div className={`${styles.leftcontent} ${(category && category == each.link)? styles.expand : styles.contract}`}>
						{each.schemes.map((scheme: JSONData) => {
							console.log(scheme)
							return (
								<Link key={scheme.id} href={`/finance/schemes/${scheme.attributes.scheme_link}`}> 
									<div>
										{scheme.attributes.scheme_name}
									</div>
								</Link>

							)
						})}
						</div></div>
						)
					})}
				</div>
				<div className={styles.fscheme}>
					<h2>Schemes</h2>
					<div className={`d-none d-lg-flex ${styles.fschemelineparent}`}>
						<h5 className={styles.subtext}>Featured Schemes</h5>
						<div className={styles.line}></div>
					</div>
				</div>
			</div>

		</Container>
	</RootLayout>)}