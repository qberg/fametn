import RootLayout from "../../layout";
import { CacheHeaders, JSONData } from "../../../utils/definitions"

// import SchemeLayout from "../../../components/financeschemelayout";
import { useRouter } from 'next/router'
import axios from "axios";
import { NextResponse } from "next/server";
import { notFound } from "next/navigation";
import { getData } from "@/utils/api_calls";
import { Container } from "react-bootstrap";
import styles from "./scheme.module.css"
import Link from "next/link";
import Separator from "@/components/separator";

export const getServerSideProps = (async (context: JSONData) => {
	context.res.setHeader(
		'Cache-Control',
		CacheHeaders
	);


	const { scheme } = context.query;
	const language = context.locale;

	const url = "https://" + process.env.API_ENDPOINT + "finance-schemes?filters[scheme_link][$eq]=" + scheme + "&populate=deep"
	const fullData = await getData(url, language)

	if (fullData.meta.pagination.total != 1) {
		console.log("NOT FOUND")

		context.res.writeHead(307, { Location: '/not-found' });
		context.res.end();
		return {
			props: {
				data: null,
				id: null
			}
		}
	}

	return {
		props: {
			data: fullData.data[0].attributes,
			id: fullData.data[0].id
		}
	}

})



export default function Finance({ data, id }: JSONData) {
	if (id == null) {
		notFound()
	}

	console.log(data)
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
					Jos
				</div>
			</Container>


		</RootLayout>)
}