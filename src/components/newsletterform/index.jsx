import { Col, Container, Row } from "react-bootstrap"
import styles from "./newsletterform.module.css"
import { CacheHeaders } from "../../utils/definitions";
import { getDataFromPath } from "../../utils/api_calls";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import BlackArrowButton from "../black_arrow_button";
import { useEffect, useState } from "react";
import axios from "axios"

const strings = {
    "ph": {
        "en": "Phone Number",
        "ta": "தொலைபேசி எண்"
    },
    "eph": {
        "en": "Enter Phone Number",
        "ta": "தொலைபேசி எண் உள்ளிடவும்"
    },
    "mail": {
        "en": "Email",
        "ta": "மின்னஞ்சல்"
    },
    "email": {
        "en": "Enter Email Address",
        "ta": "மின்னஞ்சல் உள்ளிடவும்"
    },
    "wait": {
        "en": "Submitting...",
        "ta": "சமர்ப்பிக்கப்படுகின்றது..."
    },
    "done": {
        "en": "Submitted successfully",
        "ta": "வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது"
    }
}

export default function Newsletterform({ data }) {
    const { locale } = useRouter();

    const Socials = ({ icon, url }) => {
        return (
            <Link className="me-4" href={url} target="_blank">
                <Image src={icon} height={20} width={20} />
            </Link>
        )
    }

    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [wait, setWait] = useState(false);
    const [checkbox, setCheckbox] = useState(false);

    const [error, setError] = useState(null);
    const [done, setDone] = useState(false);

    const validatePhone = (phone) => {
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            return "Please enter a valid 10 digit Indian phone number";
        }
        return null;
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Please enter a valid email address";
        }
        return null;
    }

    const validateCheckbox = (checkbox) => {
        if (!checkbox) {
            return "Please accept the disclaimer";
        }
        return null;
    }

    const validateEverything = () => {
        const phoneError = validatePhone(phone);
        if (phoneError) return phoneError;

        const emailError = validateEmail(email);
        if (emailError) return emailError;

        const checkError = validateCheckbox(checkbox);
        if (checkError) return checkError;

        return null;
    }

    useEffect(() => {
        const error = validateEverything();
        setError(error);
    }, [phone, email, checkbox])

    const touched = (phone || email || checkbox);

    const handleSubmit = () => {
        if (error) return;
        if (wait) return;

        setWait(true);

        const formData = {
            email: email,
            phone: phone,
            checked: checkbox

        };

        axios.post("/api/newsletterform", formData).then(function (response) {
            if (response.status >= 200 && response.status < 300) {
                setDone(true)
                setWait(false)
                setTimeout(() => {
                    setDone(false)
                }, 5000)
            } else {
                console.log("ERRPR CAME")
                setError("Server error")
                setWait(false)
            }
        })
            .catch(function (error) {
                setError(error?.response?.data?.error)
                setWait(false)
            });
    }

    return (<Container className={styles.bigbg} fluid>
        <Container className="py-5">
            <Row>
                <Col md={7}>
                    <h2 data-aos="fade-up">
                        {data.title}
                    </h2>
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
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={strings["eph"][locale]} type="text" className={styles.input} />
                    </div>
                    <div data-aos="fade-up" className={styles.label}>
                        {strings["mail"][locale]}
                    </div>
                    <div data-aos="fade-up" className={styles.inputcontainer}>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={strings["email"][locale]} type="text" className={styles.input} />
                    </div>
                    <div data-aos="fade-up" className="d-flex">
                        <div className="mb-auto me-2">
                            <input checked={checkbox} onChange={(e) => setCheckbox(e.target.checked)} type="checkbox" className={styles.checkbox} />
                        </div>
                        <div className={styles.checktext}>
                            {data.disclaimer}
                        </div>
                    </div>
                    {error && touched && <div className={`mt-2 small ${styles.err}`}>
                        {error}
                    </div>}
                    {wait && <div className="mt-2 small">
                        {strings.wait[locale]}
                    </div>}
                    {done && <div className="mt-2 small">
                        {strings.done[locale]}
                    </div>}
                    <div onClick={handleSubmit} data-error={error != null || wait == true} data-aos="fade-up" className={`mt-3 ${styles.sub}`}>
                        <BlackArrowButton text={data.cta_text} link={null} />
                    </div>
                </Col>
            </Row>
        </Container>
    </Container>)
}

