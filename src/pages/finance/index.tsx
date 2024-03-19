import Image from "next/image";
import styles from "./finance.module.css"

import RootLayout from "../layout";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

import axios from "axios";
import {JSONData} from "../../utils/definitions"
import { Col, Container, Row } from "react-bootstrap";
import CardWithImage from "@/components/cardwithimage";


export async function getServerSideProps(context : JSONData) {
    const path = "finance"
    const language = context.locale

	const getData = async (path: String, language: String) => {
		var API_ENDPOINT = process.env.API_ENDPOINT
		var TOKEN = process.env.API_TOKEN
		const url = "https://" + API_ENDPOINT +  path + "?populate=deep&locale=" + language
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
    

export default function Finance({ data } : JSONData ) {
	console.log(data["Schemes"][0])
  return (
    <RootLayout>
    <Container>
		<Row className={styles.hero}>
			<Col lg={5}>
				<div data-aos="fade-up" className={styles.supertitle}>
					<h1>{data["supertitle"]}</h1>
				</div>
				<div data-aos="fade-up" className={styles.title}>
					<h1>{data["title"]}</h1>
				</div>
				<div data-aos="fade-up" className={styles.subtitle}>
					<p>
						{data["subtitle"]}
					</p>
				</div>
				<Row>
					{/* 
						Loop through each of the elements of the array data["achievements"] and return a JSX object. 
					*/}
					{data["achievements"].map( (ach : JSONData) => {
						return (<Col key={ach["id"]} sm={4}>
							<div data-aos="fade-up" className={styles.ach_num}>
								{ach["Number"]}
							</div>
							<div data-aos="fade-up" className={`${styles.ach_info} smaller`}>
								{ach["Information"]}
							</div>
						</Col>)
					})
					}
				</Row>
			</Col>
			<Col lg={7}>
				CAROUSEL PLACEHOLDER
			</Col>
		</Row>
	</Container>
	<Container className={styles.dotted_section} fluid>
		<Container>
			<Row>
				<Col md={3}>
					<h2 data-aos="fade-up">{data["section_2_heading"]}</h2>
				</Col>
				<Col md={9}>
					<Row className="mt-4">
						{
							data["flow_chart"].map((each : JSONData) => {
								return (<Col key={each["id"]} md={3}>
									<div data-aos="fade-up" >
										<div className={styles.flowchart}>
											<div className={styles.flowchart_header_text}>
												<h5 className="underlined_link">{each["heading"]}</h5>
											</div>
											<div className={styles.flowchart_arrow}>
												<Image
													src="right_arrow.svg"
													alt="->"
													width={15}
													height={15}
												/>
											</div>
										</div>
									</div>
									<div data-aos="fade-up">
										<p className="small">
											{each["description"]}
										</p>
									</div>
								</Col>)
							})
						}
					</Row>
				</Col>
			</Row>
			<Row className="mt-3">
				{data["Schemes"].map((each : JSONData)  => {
					return (<Col key={each["id"]} md={4}>
						<CardWithImage  title={each["heading"]} description={each["description"]} image={each["image"]} link={each["link"]}/>
					</Col>)
				})}
			</Row>
		</Container>
	</Container>
	<Container>
		<Row className="mt-5">
			<Col lg={5}>
				<h5 data-aos="fade-up" className={styles.section3supertitle}>{data.section_3_supertitle}</h5>
				<h3 data-aos="fade-up">
					{data.section_3_title}
				</h3>
			</Col>
		</Row>
	</Container>
    </RootLayout>
  );
}