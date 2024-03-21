import RootLayout from "../../layout";
import { Container } from "react-bootstrap";
import Link from "next/link";

import styles from "./scheme.module.css"
import Separator from "@/components/separator";
import Image from 'next/image'
import { CacheHeaders, JSONData } from "@/utils/definitions";



import axios from "axios";

export async function getServerSideProps(context : JSONData) {

context.res.setHeader(
'Cache-Control',
	CacheHeaders
)
const {scheme} = context.query;
const language = context.locale

const getData = async (url: string, language: String) => {
	var API_ENDPOINT = process.env.API_ENDPOINT
	var TOKEN = process.env.API_TOKEN
	var response = null
	try {
		response = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${TOKEN}`
			}
		});
	}
	catch (error) {
		if (language != "en") {
			response = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${TOKEN}`
				}
			});
		}
		console.log(error);
	}
	
	return response?.data
}

// Get all categories and top schemes
const categoryUrl = "https://" + process.env.API_ENDPOINT + "finance-scheme-categories"
const categoryData = await getData(categoryUrl, language)



return {
	props : {
		categoryData : categoryData
	}
}
}

export default function Finance({ data } : JSONData ) {

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
						SEARCHBOX PLACEHOLDER
					</div>

					<Link href ="/finance/schemes">
						<div className={`${styles.rounded} ${false? styles.inactive : styles.active}`} >
							All Categories
						</div>
					</Link>

				</div>
			</div>

		</Container>
	</RootLayout>)}