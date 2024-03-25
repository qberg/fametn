import axios from "axios";


export const getData = async (url: string, language: String) => {
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