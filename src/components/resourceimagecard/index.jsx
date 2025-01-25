import styles from "./styles.module.css"
import { Col, Container, Row } from "react-bootstrap";
import RootLayout from "../../components/layout/layout";
import YellowPill from "../../components/yellowpill";
import { CacheHeaders } from "../../utils/definitions";
import { getDataFromPath, getNewsletterData } from "../../utils/api_calls";
import { getAllCategories, getAllResourceCategories, getAllResources } from "../../utils/resources";
import { useState } from "react";
import DynamicImage from "../../components/dynamicImage";
import Image from "next/image";
import Newsletterform from "../../components/newsletterform";

export default function ResourcesImageCard({ data }) {
    const attachementUrl = process.env.NEXT_PUBLIC_IMG_ENDPOINT + data?.attachment?.data?.attributes?.url;

    const startDownload = () => {
        window.open(attachementUrl, "_blank");
    }

    return (
        <div data-aos="fade-up" onClick={startDownload} className={styles.imagecard}>
            <DynamicImage src={data.image} objectFit="cover" />
            <div className={styles.imagecardtext}>
                <div className="d-flex">
                    <div className="ms-auto">
                        <div className={styles.downloadbutton}>
                            <div className="position-relative m-auto">
                                <Image src={"/resources_download_button.svg"} height={22} width={22} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-auto">
                    <h4 className={styles.whitetext}>
                        {data.title}
                    </h4>
                    <p className={`small ${styles.whitetext}`}>
                        {data.description}
                    </p>
                    <div>
                        <div className={styles.yellowcircle}>
                            <div className="position-relative m-auto">
                                <Image src={"/resources_arrow_right.svg"} height={15} width={15} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}