import Link from "next/link";
import { useRouter } from "next/router";

const values = {
    "head": {
        "en": "Page not found!",
        "ta": "பக்கம் கிடைக்கவில்லை!"
    },
    "desc": {
        "en": "The address you have entered is not valid.",
        "ta": "நீங்கள் உள்ளிட்ட முகவரி தவறானது."
    },
    "cta": {
        "en": "Click here to go home",
        "ta": "வீட்டிற்கு செல்ல இங்கே கிளிக் செய்யவும்"
    }
}

export default function Custom404() {
    const router = useRouter()
    const { locale } = router

    return (
        <div style={{ height: "100vh" }} className="w-100 d-flex">
            <div className="m-auto">
                <center>
                    <h1 style={{ color: "var(--yellow)" }}>
                        {values.head[locale]}
                    </h1>
                    <div>
                        {values.desc[locale]}
                    </div>
                    <Link style={{ color: "var(--yellow)", borderBottom: "1px solid var(--black)" }} href="/">
                        {values.cta[locale]}
                    </Link>
                </center>
            </div>
        </div>
    );
}

