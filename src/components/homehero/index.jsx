import { Container } from "react-bootstrap"
import styles from "./styles.module.css"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Link } from "@mui/material";

const splitTitle = (title) => {
    const words = title.split(" ");

    // Get the first word
    const firstWord = words[0];

    // Get the last word
    const lastWord = words[words.length - 1];

    // Get the middle words (if any)
    // This takes all words between the first and last and joins them into a single string.
    const middleWords = words.slice(1, -1).join(" ");

    return { firstWord, lastWord, middleWords };
}
export default function HomeHero({ title, options, option_cta, option_cta_default, option_header, hero_pills }) {
    const { firstWord, lastWord, middleWords } = splitTitle(title);

    const [drop, setDrop] = useState(false);

    const dropDownRef = useRef(null);
    const malasiaRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropDownRef.current && (!dropDownRef.current.contains(event.target) && !malasiaRef.current.contains(event.target))) {
                setDrop(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropDownRef]);

    return (<Container className={styles.herocontainer} fluid>
        <div className={`${styles.slowrotate} ${styles.snakebg}`}>
        </div>
        <Container className={styles.innercontainer}>
            <div className="my-auto py-5">
                <center>
                    <h1 data-aos="fade-up" className={` ${styles.herotitle}`}>
                        <span>
                            {firstWord}
                        </span>
                        <span className={styles.middlewords}>
                            &nbsp;{middleWords}&nbsp;
                        </span>
                        <span>
                            {lastWord}
                        </span>
                    </h1>
                    <div className="mt-4">
                        <div data-aos="fade-up" data-aos-delay={200} className={styles.optionbox}>
                            <div className="my-auto ms-4 position-relative">
                                <div className="small text-start">
                                    {option_header}
                                </div>
                                <div ref={malasiaRef} onClick={() => setDrop(!drop)} role="button" className="d-flex">
                                    <div className="my-auto">
                                        {option_cta_default}
                                    </div>
                                    <div className="my-auto ms-1">
                                        <Image src="/hero_arrow_down.svg" width={20} height={20} alt="arrow" />
                                    </div>
                                </div>
                                {drop && (<div data-aos="fade-down" ref={dropDownRef} className={styles.dropdown}>

                                    {options.map((each, index) => {
                                        return (<Link className={styles.option} href={each.url} key={index}>
                                            <div className="d-flex w-100">
                                                <div className="my-auto me-auto">
                                                    {each.text}
                                                </div>
                                                <div className="m2-auto my-auto">
                                                    <Image src="/hero_top_right.svg" width={10} height={10} alt="arrow" />
                                                </div>
                                            </div>
                                        </Link>)
                                    })}
                                </div>)}
                            </div>
                            <div className="ms-auto my-auto">
                                <div className={styles.optioncta}>
                                    {option_cta}
                                </div>
                            </div>
                        </div>
                    </div>
                    <center>
                        <div  className="d-none my-5 d-lg-flex justify-content-center">
                            {hero_pills.map((each, index) => {
                                return (
                                    <Link data-aos="fade-up" data-aos-delay={400 + index * 100} href={each.url} key={index} className={styles.heropill}>
                                        <div className="my-auto me-auto">
                                            {each.text}
                                        </div>
                                        <div className="ms-4 my-auto">
                                            <Image src="/hero_top_right.svg" width={10} height={10} alt="arrow" />
                                        </div>
                                    </Link>)
                            })}
                        </div>
                    </center>
                </center>
            </div>
        </Container>
    </Container>)
}