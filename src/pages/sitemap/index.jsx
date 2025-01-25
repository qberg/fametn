import Link from "next/link"
import styles from "./styles.module.css"
export default function SiteMap() {
    const lists = [
        "/blogs",
        "/branding-and-packaging",
        "/emarkets",
        "/events",
        "/export-promotion-councils",
        "/export-promotions",
        "/expos-and-exhibitions",
        "/finance/schemes **",
        "/markets",
        "/resources",
        "/vendor-development-meets",
        "/micro-and-small-enterprises-facilitation-council",
        "/ondc",
        "/investment-promotion/",
        "/energy-efficiency",
        "/indusstry-4-0",
    ]

    return (
        <div>
            <h1>SiteMap</h1>
            {lists.map((list, index) => {
                return (<Link className={styles.blue} key={index} href={list}>
                    {list} <br></br>
                </Link>)

            })}
        </div>
    )

}