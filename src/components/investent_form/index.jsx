import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import Bluepill from "../bluepill"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import YellowArrowButton from "../yellow_arrow_button"
import DynamicImage from "../dynamicImage"
import axios from "axios"

const strings = {
    firstname: {
        en: "First Name",
        ta: "முதல் பெயர்"
    },
    lastname: {
        en: "Last Name",
        ta: "கடைசி பெயர்"
    },
    email: {
        en: "Email",
        ta: "மின்னஞ்சல்"
    },
    designation: {
        en: "Designation",
        ta: "பதவி"
    },
    placeholderFirstName: {
        en: "Enter your first name",
        ta: "உங்கள் முதல் பெயரை உள்ளிடவும்"
    },
    placeholderLastName: {
        en: "Enter your last name",
        ta: "உங்கள் கடைசி பெயரை உள்ளிடவும்"
    },
    placeholderEmail: {
        en: "Enter your email",
        ta: "உங்கள் மின்னஞ்சலை உள்ளிடவும்"
    },
    placeholderDesignation: {
        en: "Enter your designation",
        ta: "உங்கள் பதவியை உள்ளிடவும்"
    },
    submit: {
        en: "Submit",
        ta: "சமர்ப்பிக்கவும்"
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

export default function InvestmentForm({ title, supertitle, image }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [designation, setDesignation] = useState("")
    const [error, setError] = useState(null)
    const { locale } = useRouter()

    const [wait, setWait] = useState(false);
    const [done, setDone] = useState(false);

    useEffect(() => {
        validateEverything()
    }, [firstName, lastName, email, designation])

    const validateEverything = () => {
        if (!firstName || !lastName || !email || !designation) {
            setError("All fields are required.")
        } else if (!/^[A-Za-z\s]+$/.test(firstName)) {
            setError("First name can only contain alphabets and spaces.")
        } else if (firstName.length < 3 || firstName.length > 24) {
            setError("First name must be between 3 and 24 characters.")
        } else if (!/^[A-Za-z\s]+$/.test(lastName)) {
            setError("Last name can only contain alphabets and spaces.")
        } else if (lastName.length < 3 || lastName.length > 24) {
            setError("Last name must be between 3 and 24 characters.")
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.")
        } else if (!/^[A-Za-z\s]+$/.test(designation)) {
            setError("Designation can only contain alphabets and spaces.")
        } else if (designation.length < 3 || designation.length > 24) {
            setError("Designation must be between 3 and 24 characters.")
        } else {
            setError(null)
            // Proceed with form submission logic
        }
    }

    const touche = firstName || lastName || email || designation

    const handleSubmit = () => {
        if (error) return;
        if (wait) return;

        setWait(true)

        const formData = {
            firstName,
            lastName,
            email,
            designation
        }

        axios.post("/api/investmentform", formData).then(function (response) {
            if (response.status >= 200 && response.status < 300) {
                setDone(true)
                setWait(false)
                setTimeout(() => {
                    setDone(false)
                }, 5000)
            } else {
                setError("Server error. Please try again later.")
                setWait(false)
            }
        }).catch(function (error) {
            setError(error?.response?.data?.error || "Server error. Please try again later.")
            setWait(false)
        })
    }

    return (<Container className={styles.yellowbg} fluid>
        <Container>
            <Row className={styles.graybg}>
                <Col className="pe-md-0" md={6} >
                    <div className="py-5">
                        <Bluepill text={supertitle} />
                        <div className="mt-3">
                            <h2 data-aos="fade-up">
                                {title}
                            </h2>
                        </div>
                        <div data-aos="fade-up" className="small my-1">
                            {strings.firstname[locale]}
                        </div>
                        <input data-aos="fade-up" placeholder={strings.placeholderFirstName[locale]} className={styles.formfield} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <div data-aos="fade-up" className="small my-1">
                            {strings.lastname[locale]}
                        </div>
                        <input data-aos="fade-up" placeholder={strings.placeholderLastName[locale]} className={styles.formfield} value={lastName} onChange={(e) => setLastName(e.target.value)} />

                        <div data-aos="fade-up" className="small my-1">
                            {strings.email[locale]}
                        </div>
                        <input data-aos="fade-up" placeholder={strings.placeholderEmail[locale]} className={styles.formfield} value={email} onChange={(e) => setEmail(e.target.value)} />

                        <div data-aos="fade-up" className="small my-1">
                            {strings.designation[locale]}
                        </div>
                        <input data-aos="fade-up" placeholder={strings.placeholderDesignation[locale]} className={styles.formfield} value={designation} onChange={(e) => setDesignation(e.target.value)} />

                        {error && touche && <div data-aos="fade-up" className={`${styles.error} my-2`}>{error}</div>}

                        {wait && <div className="mt-2 small">
                            {strings.wait[locale]}
                        </div>}
                        {done && <div className="mt-2 small">
                            {strings.done[locale]}
                        </div>}
                        <div onClick={handleSubmit} data-error={error != null || wait == true} data-aos="fade-up" className={`my-4 ${styles.sub}`}>
                            <YellowArrowButton text={strings.submit[locale]} />
                        </div>
                    </div>
                </Col>
                <Col className={`d-none d-md-block ${styles.colwrap}`} md={6}>
                    <div className={styles.formimage}>
                        <DynamicImage src={image} objectFit="cover" />
                    </div>
                </Col>
            </Row>
        </Container>

    </Container>)
}