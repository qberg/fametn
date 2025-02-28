import { Col, Container, Row } from "react-bootstrap"
import styles from "./recentblogsgrid.module.css"
import { useRouter } from "next/router"
import YellowArrowButton, { JustArrowButton } from "../yellow_arrow_button"
import DynamicImage from "../dynamicImage"

const strings = {
    "recent": {
        "en": "Recent Blogs",
        "ta": "சமீபத்திய வலைப்பதிவுகள்"
    },
    "view": {
        "en": "View All",
        "ta": "அனைத்தும் பார்"
    },
    "case": {
        "en": "Get the case study",
        "ta": "கேஸ் ஆய்வுவைப் பெறுக"
    }
}



export default function RecentBlogsGrid({ blogs }) {
    const blogOne = blogs?.data?.[0]?.attributes || {}
    const blogTwo = blogs?.data?.[1]?.attributes || {}
    const blogThree = blogs?.data?.[2]?.attributes || {}

    const { locale } = useRouter();

    return (<Container className="my-4">
        <div className="d-flex">
            <div className="my-auto">
                <h2 data-aos="fade-up">{strings.recent[locale]}</h2>
            </div>
            <div data-aos="fade-up" className="ms-auto my-auto">
                <YellowArrowButton text={strings.view[locale]} link="/blogs" />
            </div>
        </div>
        <hr ></hr>
        <Row className="mt-5">
            <Col className={styles.twomb} lg={7}>
                <div data-aos="fade-up" className={styles.newtealand}>
                    <div className={styles.logodisplay}>
                        <DynamicImage src={blogOne.logo} objectPosition="left" objectFit="contain" />
                    </div>
                    <div className="my-auto">
                        <h3 className={styles.headover}>{blogOne.title}</h3>
                        <p className="small">
                            {blogOne.excerpt}
                        </p>
                    </div>
                    <div>
                        <JustArrowButton link={"/blogs/" + blogOne.url} text={strings.case[locale]} lightArrow={true} />
                    </div>
                </div>
            </Col>
            <Col>
                <div className="d-flex flex-column h-100">
                    <div data-aos="fade-up" className={styles.newpeachland}>
                        <div className={styles.logodisplay}>
                            <DynamicImage src={blogTwo.logo} objectPosition="left" objectFit="contain" />
                        </div>
                        <div className="my-auto">
                            <h5 className={styles.headover}>{blogTwo.title}</h5>
                        </div>
                        <div>
                            <JustArrowButton link={"/blogs/" + blogTwo.url} text={strings.case[locale]} />
                        </div>
                    </div>
                    <div data-aos="fade-up" className={styles.newblooland}>
                        <div className={styles.logodisplay}>
                            <DynamicImage src={blogThree.logo} objectPosition="left" objectFit="contain" />
                        </div>
                        <div className="my-auto">
                            <h5 className={styles.headover}>{blogThree.title}</h5>
                        </div>
                        <div>
                            <JustArrowButton link={"/blogs/" + blogThree.url} text={strings.case[locale]} lightArrow={true}/>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>)
}