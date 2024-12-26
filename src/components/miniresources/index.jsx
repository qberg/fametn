import { Col, Container, Row } from "react-bootstrap";
import styles from "./miniresources.module.css";
import { useRouter } from "next/router";
import YellowArrowButton, { JustArrowButton } from "../yellow_arrow_button";

const strings = {
    "head": {
        "en": "Resources",
        "ta": "வளங்கள்"
    },
    "all": {
        "en": "View All",
        "ta": "அனைத்தும் பார்"
    },
    "more" : {
        "en" : "Read More",
        "ta" : "மேலும் வாசிக்க"
    }
}


function ResourceCard({ data }) {
    const {locale} = useRouter();

    const firstTag = data.tags.length > 0 ? data.tags[0] : null;
    const restTags = data.tags.length > 1 ? data.tags.slice(1) : [];

    const firstTagRender = firstTag ? (<div className={styles.firstTag}>{firstTag.text}</div>) : null;
    const restTagsRender = restTags.map((each, index) => {
        return (<div key={index} className={styles.restTag}>{each.text}</div>)
    })

    const attachementUrl = process.env.NEXT_PUBLIC_IMG_ENDPOINT + data?.attachment?.data?.attributes?.url;
    
    const startDownload = () => {
        window.open(attachementUrl, "_blank");
    }

    return (
        <div onClick={startDownload} className={styles.resourcecard}>
            <div className="d-flex">
                {firstTagRender}
                {restTagsRender}
            </div>
            <div className="mt-3">
                <h4 className={styles.thin}>
                    {data.title}
                </h4>
                <div className={styles.gray}>
                    {data.date}
                </div>
            </div>
            <div className="mt-auto pt-2">
                <JustArrowButton text={strings.more[locale]} />
            </div>
        </div>
    )
}

export default function MiniResources({ data }) {
    const { locale } = useRouter();

    return (
        <Container className="my-5">
            <div className="d-flex">
                <div className="my-auto">
                    <h3>
                        {strings.head[locale]}
                    </h3>
                </div>
                <div className="my-auto ms-auto">
                    <YellowArrowButton text={strings.all[locale]} link="/resources" />
                </div>

            </div>
            <Row className="mt-4">
                {data.data.map(each => each.attributes).map((each, index) => {
                    return (<Col lg={4} md={6} key={index}>
                        <ResourceCard data={each} />
                    </Col>)
                })}
            </Row>
        </Container>
    )
}