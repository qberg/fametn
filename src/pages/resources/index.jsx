import { Col, Container, Row } from "react-bootstrap";
import styles from "./resources.module.css";
import RootLayout from "../../components/layout/layout";
import YellowPill from "../../components/yellowpill";
import { CacheHeaders } from "../../utils/definitions";
import { getDataFromPath, getHeaderFooterData, getNewsletterData } from "../../utils/api_calls";
import { getAllCategories, getAllResourceCategories, getAllResources } from "../../utils/resources";
import { useState } from "react";
import DynamicImage from "../../components/dynamicImage";
import Image from "next/image";
import Newsletterform from "../../components/newsletterform";
import ResourcesImageCard from "../../components/resourceimagecard";

export default function Resources({ news, meta, allCategories, allResources, headerFooter }) {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((each) => each != category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    }

    const actualSelectedCategories = selectedCategories.length > 0 ? selectedCategories : allCategories;
    const filteredResources = allResources.filter((each) => {
        return each.tags.map(every => every.text).some((eachCategory) => actualSelectedCategories.includes(eachCategory));
    });

    return (
        <RootLayout seo={meta.seo} data={headerFooter}>
            <Container className={styles.bigblue} fluid>
                <Container>
                    <center>
                        <div className="py-5">
                            <YellowPill text={meta?.super_title} />
                            <h2 data-aos="fade-up" className={`mt-3 ${styles.herotext}`}>
                                {meta?.title}
                            </h2>
                            <p data-aos="fade-up" className={styles.herotext}>
                                {meta?.description}
                            </p>
                            <div className="mt-4 mb-3">
                                {allCategories.map((each, index) => {
                                    return (
                                        <div data-aos="fade-up" data-aos-delay={100 * index} onClick={() => toggleCategory(each)} key={index} className={`me-3 mb-3 ${styles.category} ${selectedCategories.includes(each) ? styles.selected : ""}`} >
                                            {each}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </center>
                </Container>
            </Container>
            <Container>
                <div className="mt-5 mb-4">
                    <h2 data-aos="fade-up">
                        {meta.title_2}
                    </h2>
                    <p data-aos="fade-up">
                        {meta.description_2}
                    </p>
                </div>
                <hr></hr>
                <Row className="pt-4 pb-5">
                    {filteredResources.map((each, index) => {
                        return (
                            <Col lg={4} md={6} key={index}>
                                <ResourcesImageCard data={each} />
                            </Col>
                        )
                    })}
                </Row>
            </Container>
            <Newsletterform data={news} />
        </RootLayout>)
}

export async function getServerSideProps(context) {
    // add cache headers
    context.res.setHeader('Cache-Control', CacheHeaders);

    const language = context.locale;

    const resourcesMetaPath = "resources-meta?populate=deep";
    const meta = await getDataFromPath(resourcesMetaPath, language);
    const resources = await getAllResources(language);
    const allCategories = await getAllResourceCategories(language);
    const news = await getNewsletterData(language);

    return {
        props: {
            meta: meta?.data?.attributes,
            allCategories: allCategories,
            allResources: resources,
            news: news,
            headerFooter: await getHeaderFooterData(language),
        }
    }
}