

import Image from "next/image";
import styles from "./tncgs.module.css"
import YellowArrowButton from "@/components/yellow_arrow_button";

import RootLayout from "../../layout";

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Link from "next/link";
import Separator from "@/components/separator";

import axios from "axios";
import { CacheHeaders, JSONData } from "@/utils/definitions";
import { Col, Container, Row } from "react-bootstrap";
import CardWithImage from "@/components/cardwithimage";
import { getData } from "@/utils/api_calls";



import arrowRightImage from './arrow-right.png'; 

export async function getServerSideProps(context : JSONData) {
    
	context.res.setHeader(
		'Cache-Control',
		CacheHeaders
	)
    const path = "finance-tncgs"
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
        console.log(result);
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
    export default function TNCGS({ data } : JSONData ) {

    return (<RootLayout>
        
        <Container>
       
      
        <div className="mt-5">
					<Link className={styles.bluelink} href="/">Home</Link>
					<Separator />
					<Link className={styles.graylink} href="/finance">Finance</Link>
					<Separator />
					<Link className={styles.graylink} href="/finance/tncgs">TNCGS</Link>
				</div>
                 <div className={styles.imagesWrapper}>
  <Image src="/Ellipse 22.svg" alt="Image Description" width={400} height={400} />
</div>
                <Row className={styles.hero}>
                <Col lg={6}>
  <div className={styles.container}>
    <div data-aos="fade-up" className={styles.supertitle}>
      <h1>{data["super_title"]}</h1>
    </div>
    <div data-aos="fade-up" className={styles.title}>
      <h1>{data["title"]}</h1>
    </div>
    <div data-aos="fade-up" className={styles.subtitle}>
      <p>
        {data["sub_title"]}
      </p>
    </div>
  </div>
  
</Col>
<div>
  <YellowArrowButton text={data["cta_text"]} link={data["cta_link"]}  style={{ width: '7.5em', padding: '10px' }}/>
  </div>
<Col lg={6}>
  
			</Col>
		</Row>
        
        <div className={styles.centereddiv}>
        <h2 className={styles.marginBottom}>{data["section_2_heading"]}</h2>
               <small>{data.testimonials[0].description}</small>
               
               <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
            <Image src="/Ellipse 3.svg" alt="Image Description" width={50} height={50}/>
        </div>
        <p className={styles.imageText}>{data.testimonials[0].heading}</p>
        <div>
        <small className={styles.smallText}>{data.testimonials[0].subtitle}</small>
        </div>
    </div>
</div>



   
{/* <div className={styles.centereddiv}>
  <h2 className={styles.marginBottom}>{data["section_2_heading"]}</h2>
  
  {data.testimonials.map((testimonial: any, index: number) => (
   <div className={`${styles.imageContainer} ${styles.}`} key={index}>

      <small>{testimonial.description}</small>
      

        <div className={styles.imageWrapper}>
          <Image src="/Ellipse 3.svg" alt="des" width={50} height={50} />
       
        <p className={styles.imageText}>{testimonial.heading}</p>
        
          <small className={styles.smallText}>{testimonial.subtitle}</small>
        </div>
    
    </div>
  ))}
</div> */}
    
        </Container>
        
    </RootLayout>)
}

