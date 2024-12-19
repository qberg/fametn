import { Language } from "@mui/icons-material";
import axios from "axios";
import { JSONData } from "./definitions";


export const getTopNBlogs = async (Language: string) => {
	const N = 3;
	const path = "blogs?sort=date:desc&pagination[limit]=" + N + "&fields[0]=title&fields[1]=author&fields[2]=date&fields[3]=excerpt&populate=image"
	const rawData = await getDataFromPath(path, Language);
	return rawData?.data?.map((each: JSONData) => each.attributes)
}

export const getNewsletterData = async (language: string) => {
	const path = "common-newsletterform?&populate=deep";
	const data = await getDataFromPath(path, language);
	return data.data.attributes
}

export const getDataFromPath = async (path: string, language: String) => {
	// assemble full url 
	const url = "https://" + process.env.API_ENDPOINT + path;

	// call getData function
	return await getData(url, language)
}

export const getData = async (url: string, language: String) => {
	// get the auth token
	var TOKEN = process.env.API_TOKEN
	
	// initialize response as null
	var response = null
	try {
		// try get for the specified language
		response = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${TOKEN}`
			}
		});
	}
	catch (error) {
		// fall back to english if the specified language is not available
		if (language != "en") {
			response = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${TOKEN}`
				}
			});
		}
	}
	// return just the useful part
	return response?.data
}