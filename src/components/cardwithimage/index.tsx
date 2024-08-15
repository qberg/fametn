import { JSONData } from "@/utils/definitions";
import { PropsWithChildren } from "react";
import Image from 'next/image'

import styles from "./card.module.css"
import YellowArrowButton from "../yellow_arrow_button";
import Link from "next/link";
import DynamicImage from "../dynamicImage";

const CardWithImage = ({title, description, link, image} : JSONData) => {
    return (
        <Link href={link} >
            <div data-aos="fade-up" className={styles.card}>
                <div className={styles.cardimage}>
                    <DynamicImage src={image} />
                </div>
                <div className="mt-3 d-flex flex-grow-1 flex-column">
                    <h6>{title}</h6>
                    <p className="small">{description}</p>
                    <div className="d-flex mt-auto">
                        <div className="ms-auto">
                            <YellowArrowButton text="View" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardWithImage;