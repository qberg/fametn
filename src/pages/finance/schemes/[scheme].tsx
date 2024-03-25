import RootLayout from "../../layout";
import {CacheHeaders, JSONData} from "../../../utils/definitions"

// import SchemeLayout from "../../../components/financeschemelayout";
import { useRouter } from 'next/router'
import axios from "axios";
import { NextResponse } from "next/server";
import { notFound } from "next/navigation";
import { getData } from "@/utils/api_calls";


export const getServerSideProps = (async (context: JSONData) => {
	context.res.setHeader(
		'Cache-Control',
		CacheHeaders
	);
	

	const {scheme} = context.query;
	const language = context.locale;

	const url = "https://" + process.env.API_ENDPOINT + "finance-schemes?filters[scheme_link][$eq]=" + scheme + "&populate=deep"
	const fullData = await getData(url, language)
	
	if (fullData.meta.pagination.total != 1) {
		console.log("NOT FOUND")
		
		context.res.writeHead(307, { Location: '/not-found' });
  		context.res.end();
		return {
			props : {
				data : null,
				id : null
			}
		}
	}

	return {
		props : {
			data : fullData.data[0].attributes,
			id : fullData.data[0].id
		}
	}
	
})



export default function Finance({ data, id} : JSONData ) {
	if (id == null) {
		notFound()
	}
	return (
		<RootLayout>
			<h1>
				{data.scheme_name}
			</h1>
		
		</RootLayout>)
}