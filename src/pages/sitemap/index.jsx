import Link from "next/link"

export default function SiteMap() {
    const lists = [
        "https://fametn.soorkie.com/blogs",
        "https://fametn.soorkie.com/branding-and-packaging",
        "https://fametn.soorkie.com/emarkets",
        "https://fametn.soorkie.com/events",
        "https://fametn.soorkie.com/export-promotion-councils",
        "https://fametn.soorkie.com/export-promotions",
        "https://fametn.soorkie.com/expos-and-exhibitions",
        "https://fametn.soorkie.com/finance/schemes **",
        "https://fametn.soorkie.com/markets",
        "https://fametn.soorkie.com/resources",
        "https://fametn.soorkie.com/vendor-development-meets",
        "https://fametn.soorkie.com/micro-and-small-enterprises-facilitation-council",
        "https://fametn.soorkie.com/ondc"
    ]

    return (
        <div>
            <h1>SiteMap</h1>
            {lists.map((list, index) => {
                return (<Link key={index} href={list}>
                    {list} <br></br>
                </Link>)

            })}
        </div>
    )

}