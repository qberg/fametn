import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios"
import Link from "next/link";
import Image from "next/image";

function EvNewsletter({ data }) {

    const strings = {
        email: {
            en: "Enter your email",
            ta: "உங்கள் மின்னஞ்சலை உள்ளிடவும்"
        },
        wait: {
            en: "Submitting...",
            ta: "சமர்ப்பிக்கப்படுகின்றது..."
        },
        done: {
            en: "Submitted successfully",
            ta: "வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது"
        }
    }

    const [email, setEmail] = useState("");
    const [wait, setWait] = useState(false);
    const [error, setError] = useState(null);
    const [done, setDone] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Please enter a valid email address";
        }
        return null;
    }

    const touched = email

    useEffect(() => {
        const error = validateEmail(email);
        setError(error);
    }, [email])

    const handleSubmit = () => {
        if (error) return;
        if (wait) return;

        setWait(true);

        const formData = {
            email: email
        };

        axios.post("/api/evnewsletterform", formData).then(function (response) {
            if (response.status >= 200 && response.status < 300) {
                setDone(true)
                setWait(false)
                setTimeout(() => {
                    setDone(false)
                }, 5000)
            } else {
                setError("Server error")
                setWait(false)
            }
        })
            .catch(function (error) {
                setError(error?.response?.data?.error)
                setWait(false)
            });
    }

    const { locale } = useRouter();


    return (<Container className={`py-5 ${styles.graybg}`} fluid>
        <Container>
            <div data-aos="fade-up" className={styles.purplebg}>
                <Row className="gx-lg-5">
                    <Col lg={7}>
                        <h2 data-aos="fade-up">
                            {data?.newsletter_head}
                        </h2>
                        <div data-aos="fade-up" className="mt-3">
                            {data?.newsletter_desc}
                        </div>
                    </Col>
                    <Col lg={5}>
                        <input
                            data-aos="fade-up"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={strings.email[locale]}
                            type="text"
                            className={styles.input} />

                        {error && touched && <div className={`mt-2 small ${styles.err}`}>
                            {error}
                        </div>}
                        {wait && <div className={`mt-2 small ${styles.msg}`}>
                            {strings.wait[locale]}
                        </div>}
                        {done && <div className={`mt-2 small ${styles.msg}`}>
                            {strings.done[locale]}
                        </div>}

                        <div onClick={handleSubmit} data-error={error != null || wait == true} data-aos="fade-up" className={`mt-4 ${styles.sub}`}>
                            {data.cta}
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    </Container>)
}

function EvActualFooter({ data }) {
    const footerRows = [...data.items].reverse();

    function ContactItem({ text, icon }) {
        return (<div data-aos="fade-up" className="mt-2 d-flex">
            <div className="me-2 my-auto ">
                <Image src={icon} width={14} height={14} alt="icon" />
            </div>
            <div className={`my-auto ${styles.footerlink}`}>
                {text}
            </div>
        </div>)
    }
    return (<Container fluid className={`py-5 ${styles.blackbg}`}>
        <Container>
            <Row className={styles.footerrow}>

                <Col md={3} lg={2}>
                    <h6 data-aos="fade-up" className={styles.footerhead}>
                        {data.contact}
                    </h6>
                    <ContactItem text={data.phone} icon="/footphone.svg" />
                    <ContactItem text={data.email} icon="/footmail.svg" />
                    <ContactItem text={data.location} icon="/footloc.svg" />

                </Col>


                {footerRows.map((each, index) => {
                    return (<Col key={index} md={3} lg={2}>
                        <Link href={each.head.url || "#"}>
                            <h6 data-aos="fade-up" className={styles.footerhead}>
                                {each.head.text}
                            </h6>
                            {each.items.map((subeach, subindex) => {
                                return (
                                    <Link key={subindex} href={subeach.url || "#"} className={styles.footerlink}>
                                        <div data-aos="fade-up" className="mt-2">
                                            {subeach.text}
                                        </div>
                                    </Link>
                                )
                            })}
                        </Link>
                    </Col>)
                })}


            </Row>
        </Container>
    </Container >)
}

export default function EvFooter({ data }) {
    return (<>
        <EvNewsletter data={data} />
        <EvActualFooter data={data} />
    </>)
}