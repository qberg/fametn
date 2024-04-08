import axios from "axios";


export const getData = async (url: string, language: String) => {
	console.log(url)
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
		console.log("MAJOR", error);
	}
	
	return response?.data
}