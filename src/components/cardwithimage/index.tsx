import { JSONData } from "@/utils/definitions";
import { PropsWithChildren } from "react";
import Image from 'next/image'

import styles from "./card.module.css"
import YellowArrowButton from "../yellow_arrow_button";

const CardWithImage = ({title, description, link, image} : JSONData) => {
    

    const imgLoader = ({ src, width, quality }: JSONData) => {
        var key = "medium"
        
   
        if (width < 400) key = "thumbnail"
        else if (width < 700) key = "small"
        else if (width < 1024) key = "medium"
        else key = "large"
       
        const url = process.env.NEXT_PUBLIC_IMG_ENDPOINT + image.data.attributes.formats[key].url
        console.log(url)
        return url
    }

    return (
        <div data-aos="fade-up" className={styles.card}>
            <div className={styles.cardimage}>
                <Image
                    className={styles.innerimg}
                    fill
                    src="/example.png"
                    loader={imgLoader}
                    style = {
                        {
                            objectFit : "cover"
                        }
                    }
                    alt={"card image of " + title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="mt-3">
                <h6>{title}</h6>
                <p>{description}</p>
                <div className="d-flex">
                    <div className="ms-auto">
                        <YellowArrowButton text="View" link={link} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardWithImage;