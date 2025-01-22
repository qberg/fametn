import { Col, Container, Row } from "react-bootstrap";
import styles from "./resources.module.css";
import RootLayout from "../../components/layout/layout";
import YellowPill from "../../components/yellowpill";
import { CacheHeaders } from "../../utils/definitions";
import { getDataFromPath, getNewsletterData } from "../../utils/api_calls";
import { getAllCategories, getAllResourceCategories, getAllResources } from "../../utils/resources";
import { useState } from "react";
import DynamicImage from "../../components/dynamicImage";
import Image from "next/image";
import Newsletterform from "../../components/newsletterform";
import ResourcesImageCard from "../../components/resourceimagecard";

// function ImageCard({ data }) {
//     const attachementUrl = process.env.NEXT_PUBLIC_IMG_ENDPOINT + data?.attachment?.data?.attributes?.url;

//     const startDownload = () => {
//         window.open(attachementUrl, "_blank");
//     }

//     return (
//         <div onClick={startDownload} className={styles.imagecard}>
//             <DynamicImage src={data.image} objectFit="cover" />
//             <div className={styles.imagecardtext}>
//                 <div className="d-flex">
//                     <div className="ms-auto">
//                         <div className={styles.downloadbutton}>
//                             <div className="position-relative m-auto">
//                                 <Image src={"/resources_download_button.svg"} height={22} width={22} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="mt-auto">
//                     <h4 className={styles.whitetext}>
//                         {data.title}
//                     </h4>
//                     <p className={`small ${styles.whitetext}`}>
//                         {data.description}
//                     </p>
//                     <div>
//                         <div className={styles.yellowcircle}>
//                             <div className="position-relative m-auto">
//                                 <Image src={"/resources_arrow_right.svg"} height={15} width={15} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

export default function Resources({ news, meta, allCategories, allResources }) {
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
        <RootLayout>
            <Container className={styles.bigblue} fluid>
                <Container>
                    <center>
                        <div className="py-5">
                            <YellowPill text={meta?.super_title} />
                            <h2 className={`mt-3 ${styles.herotext}`}>
                                {meta?.title}
                            </h2>
                            <p className={styles.herotext}>
                                {meta?.description}
                            </p>
                            <div className="mt-4 mb-3">
                                {allCategories.map((each, index) => {
                                    return (
                                        <div onClick={() => toggleCategory(each)} key={index} className={`me-3 mb-3 ${styles.category} ${selectedCategories.includes(each) ? styles.selected : ""}`} >
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
                    <h3>
                        {meta.title_2}
                    </h3>
                    <p>
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

    const resourcesMetaPath = "resources-meta";
    const meta = await getDataFromPath(resourcesMetaPath, language);
    const resources = await getAllResources(language);
    const allCategories = await getAllResourceCategories(language);
    const news = await getNewsletterData(language);

    return {
        props: {
            meta: meta?.data?.attributes,
            allCategories: allCategories,
            allResources: resources,
            news: news
        }
    }
}