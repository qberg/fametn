import { JSONData } from "@/utils/definitions";
import { useRouter } from "next/router";

import styles from "./pagination.module.css"
import Image from "next/image";
import Link from "next/link";


const Pagination = ({ page, totalPages }: JSONData) => {
    const minDisplay = 3;
    const router = useRouter();
    const basePath = `${router.basePath}${router.asPath}`
    const queries = router.query;

    console.log(router.basePath, router.pathname, router.query)


    const buildQuery = (query: JSONData) => {
        const params = new URLSearchParams();
        for (let key in query) {
            params.append(key, query[key]);
        }
        const queryString = params.toString();
        return queryString;
    }


    const getPage: (pageNumber: number) => string = (pageNumber) => {
        const newQuery = { ...router.query }
        if (pageNumber < 2) {
            delete newQuery.page;
            return router.pathname + "?" + buildQuery(newQuery)
        }
        if (pageNumber > totalPages) return getPage(totalPages)
        newQuery["page"] = pageNumber.toString()
        console.log(pageNumber)
        return router.pathname + "?" + buildQuery(newQuery)
    }

    const prevItem = (<div className={`${styles.pageitem} ${styles.prevpage}`}>
        <Image
            width={13}
            height={13}
            
            src="/page_left.svg"
            alt="<"
        />
        <div style={{ marginLeft: "10px" }} className="d-none d-md-inline"> Previous</div>
    </div>)

    const nextItem = (<div className={`${styles.pageitem} ${styles.nextpage}`}>
        <div style={{ marginRight: "10px" }} className="d-none d-md-inline">Next</div>
        <Image
            width={13}
            height={13}
            src="/page_right.svg"
            alt="<"
        />
    </div>)

    const displayedPageLinks = []
    for (var pg = 1; pg <= totalPages; pg += 1) {
        if (pg <= minDisplay) displayedPageLinks.push(pg)
        else if (pg > page - minDisplay / 2 && pg < page + minDisplay / 2) displayedPageLinks.push(pg)
        else if (pg > totalPages - minDisplay) displayedPageLinks.push(pg)
        else if (displayedPageLinks[displayedPageLinks.length - 1] != 0) displayedPageLinks.push(0)
    }

    return (
        <div data-aos="fade-up" className={styles.parent}>
            {(page > 1) ? (<Link href={getPage(page - 1)}>
                {prevItem}
            </Link>) : (<div style={{ opacity: 0.5, cursor: "not-allowed" }}>{prevItem}</div>)}
            {displayedPageLinks.map((pageNumber: number, id: number) => {
                if (pageNumber != 0) {
                    return (
                    
                    <Link key={id} className={`${styles.pgnumber} ${(pageNumber==page)? styles.active : styles.inactive}`} href={getPage(pageNumber)}>
                        <div>
                            {pageNumber}
                        </div>
                    </Link>)
                } else {
                    return (
                        <div key={id} style={{cursor: "not-allowed" }} className={styles.pgnumber}>
                            ...
                        </div>
                    )
                }
            })}
            {(page < totalPages) ? (<Link href={getPage(page + 1)}>
                {nextItem}
            </Link>) : (<div style={{ opacity: 0.5, cursor: "not-allowed" }}>{nextItem}</div>)}
        </div>
    )
}

export default Pagination;