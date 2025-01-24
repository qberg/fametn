import { Col, Container, Row } from "react-bootstrap"
import styles from "./newsletterform.module.css"
import { CacheHeaders } from "../../utils/definitions";
import { getDataFromPath } from "../../utils/api_calls";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import BlackArrowButton from "../black_arrow_button";


const strings = {
    "ph" : {
        "en" : "Phone Number",
        "ta" :  "தொலைபேசி எண்"
    },
    "eph" : {
        "en" : "Enter Phone Number",
        "ta" : "தொலைபேசி எண் உள்ளிடவும்"
    },
    "mail" : {
        "en" : "Email",
        "ta" : "மின்னஞ்சல்"
    },
    "email" : {
        "en" : "Enter Email Address",
        "ta" : "மின்னஞ்சல் உள்ளிடவும்"
    }
}

export default function Newsletterform({data}){
    const {locale} = useRouter();

    const Socials = ({icon, url}) => {
        return (
            <Link className="me-4" href={url} target="_blank">
                <Image src={icon} height={20} width={20} /> 
            </Link>
        )
    }

    return (<Container className={styles.bigbg} fluid>
        <Container className="py-5">
            <Row>
                <Col md={7}>
                    <h3 data-aos="fade-up">
                        {data.title}
                    </h3>
                    <p data-aos="fade-up">
                        {data.description}
                    </p>
                    <div data-aos="fade-up" className="d-flex">
                        <Socials icon="/soc_dark_fb.svg" url={data.fb_url} />
                        <Socials icon="/soc_dark_x.svg" url={data.x_url} />
                        <Socials icon="/soc_wa_dark.svg" url={data.whatsapp_url} />
                        <Socials icon="/soc_yt_dark.svg" url={data.youtube_url} />
                        <Socials icon="/soc_tele_dark.svg" url={data.telegram_url} />
                        <Socials icon="/soc_linkedin_dark.svg" url={data.linkedin_url} />

                    </div>
                </Col>
                <Col md={5}>
                    <div data-aos="fade-up" className={styles.label}>
                        {strings["ph"][locale]}
                    </div>
                    <div data-aos="fade-up" className={styles.inputcontainer}>
                        <div className="my-auto me-2">
                            +91
                        </div>
                        <input placeholder={strings["eph"][locale]} type="text" className={styles.input} />
                    </div>
                    <div data-aos="fade-up" className={styles.label}>
                        {strings["mail"][locale]}
                    </div>
                    <div data-aos="fade-up" className={styles.inputcontainer}>
                        <input placeholder={strings["email"][locale]} type="text" className={styles.input} />
                    </div>
                    <div data-aos="fade-up" className="d-flex">
                        <div className="mb-auto me-2">
                            <input type="checkbox" className={styles.checkbox} />
                        </div>
                        <div className={styles.checktext}>
                            {data.disclaimer}
                        </div>
                    </div>
                    <div data-aos="fade-up" className="mt-3">
                        <BlackArrowButton text={data.cta_text} link={null}  />
                    </div>
                </Col>
            </Row>
        </Container>
    </Container>)
}

