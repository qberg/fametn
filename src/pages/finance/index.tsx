import Image from "next/image";
import styles from "./finance.module.css"

import "../globals.css"
import RootLayout from "../layout";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

import axios from "axios";


type JSONData = Record<string, any>;

export async function getServerSideProps(context) {
    const path = "finance"
    const language = context.locale

	const getData = async (path: String, language: String) => {
		var API_ENDPOINT = process.env.API_ENDPOINT
		var TOKEN = process.env.API_TOKEN
		const url = "https://" + API_ENDPOINT +  path + "?populate=*&locale=" + language
		const response = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${TOKEN}`
			}
		});
		const result = response.data["data"]["attributes"]
		return {
			props: {
				data : result
			}
        };
	}

   
    
	
    try {
		return await getData(path, language)
    } catch (error) {
		if (language != "en") {
			// Try again in english
			return await getData(path, "en")
		}
      console.log(error)
    }
    
}
    

export default function Finance({ data }) {
  return (
    <RootLayout>
    <main className={styles.main}>
      <div>
		<h1>
			{data["supertitle"]}
		</h1>
		<h2>
			{data["title"]}
		</h2>
	  </div>
    </main>
    </RootLayout>
  );
}
