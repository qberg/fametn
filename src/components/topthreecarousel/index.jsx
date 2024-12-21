import { Carousel } from "react-responsive-carousel"
import styles from "./topthreecarousel.module.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import DynamicImage from "../dynamicImage";
import Image from "next/image";

function PrevArrow({ onClickHandler, hasPrev }) {
    return (
        <div className={styles.arrwrap}>
            <div data-shono={hasPrev} className={styles.cararrow} onClick={onClickHandler} >
                <Image alt="arrow" height={24} width={24} src="/car_arrow_left.svg" />
            </div>
        </div>
    )
}

function NextArrow({ onClickHandler, hasNext }) {
    return (
        <div className={styles.arrwrapright}>
            <div data-shono={hasNext} className={styles.cararrow} onClick={onClickHandler} >
                <Image className={styles.rightside} alt="arrow" height={24} width={24} src="/car_arrow_left.svg" />
            </div>
        </div>
    )
}

function UnselectedIndicator ({onClickHandler, isSelected}) {
    return (<span data-shono="false" className={`${styles.indic}`} onClick={onClickHandler}>
    </span>)
}

function SelectedIndicator ({onClickHandler, isSelected}) {
    return (<span data-shono="true" className={`${styles.indic}`} onClick={onClickHandler}>
    </span>)
}


function EachStuff({ data }) {

    // if description larger than 1000 characters, truncate it and put "..." at the end
    const maxDescriptionLength = 140;
    const truncatedDesription = data?.description.length > maxDescriptionLength ? data?.description.slice(0, maxDescriptionLength) + "..." : data?.description;

    return (
        <div className={styles.bg}>
            <div className={styles.fullbox}>
                <div className={styles.imgcontainer}>
                    <DynamicImage src={data.image} objectFit="cover" />
                </div>
                <div className={styles.textholder}>
                    <h5 className={`text-nowrap ${styles.textbox}`}>
                        {data?.title}
                    </h5>
                    <div className={styles.smollfont}>
                        <div className={styles.textbox}>
                            {data?.subtitle}
                        </div>
                        <div className={styles.textbox}>
                            {truncatedDesription}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Topthreecarousel({ data }) {
    return (
        <div className={styles.topthreeshadow}>
            <Carousel
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    (<PrevArrow onClickHandler={onClickHandler} hasPrev={hasPrev} />)}
                renderArrowNext={(onClickHandler, hasNext, label) =>
                    (<NextArrow onClickHandler={onClickHandler} hasNext={hasNext} />)}
                
                    renderIndicator={(onClickHandler, isSelected, index, label) => {
                        if (isSelected) {
                            return (
                                <SelectedIndicator onClickHandler={onClickHandler} isSelected={isSelected} />
                            );
                        }
                        return (
                            <UnselectedIndicator onClickHandler={onClickHandler} isSelected={isSelected} />

                        );
                    }}
                
                showStatus={false}
                showThumbs={false}
                >
                
                {data.map((each, index) => {
                    return (
                        <EachStuff key={index} data={each} />
                    )
                })}
            </Carousel>
        </div>
    )
}