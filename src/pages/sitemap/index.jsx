import Link from "next/link"
import styles from "./styles.module.css"
export default function SiteMap() {
    const lists = [
        "/",
        "/blogs",

        "/branding-and-packaging",
        "/emarkets",

        "/energy-efficiency",
        "/events",
        "/export-promotion-councils",
        "/export-promotions",
        "/expos-and-exhibitions",
        "/schemes",
        "/schemes/unemployed-youth-employment-generation",
        
        "/markets",
        "/resources",
        "/vendor-development-meets",
        "/micro-and-small-enterprises-facilitation-council",
        "/ondc",
        "/investment-promotion/",
        "/energy-efficiency",
        "/industry-4-0",
        "/testing-labs",
        "/lean",

        "/tenders",
        "/trade-associations-and-chambers",
        "/awards",
        "/gallery",
        "/odop",
        "/teams",
        "/aboutus",

        "/evtf",
        "/evtf/teams",
        "/evtf/about",

        "/sectors",
        "/sectors/ev",
        "/sectors/food-processing",
        "/exports",

        "/gi-products",
        "/gi-products/agricultural-products",
        "/gi-products/table"
    ]

    return (
        <div>
            <h1>SiteMap</h1>
            {lists.map((list, index) => {
                return (<Link target="_blank" className={styles.blue} key={index} href={list}>
                    {list} <br></br>
                </Link>)

            })}
        </div>
    )

}