import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Bluepill from "../bluepill";

const strings = {
    next: {
        en: "Next",
        ta: "அடுத்தது"
    },
    prev: {
        en: "Prev",
        ta: "முந்தையது"
    }
}

const max = (a, b) => {
    return a > b ? a : b;
}

const min = (a, b) => {
    return a < b ? a : b;
}


export function CoreTable({ data, headings, title, supertitle }) {
    const { locale } = useRouter();
    const [sortField, setSortField] = useState(headings[0].index);
    const [sortMode, setSortMode] = useState("asc");

    const sortedItems = data.sort((a, b) => {
        const aValue = a[sortField] || "";
        const bValue = b[sortField] || "";
        if (sortMode === "asc") {
            return aValue.localeCompare(bValue);
        } else {
            return bValue.localeCompare(aValue);
        }
    })

    const maxPageSize = 3
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(sortedItems.length / maxPageSize);
    const paginatedItems = sortedItems.slice((page - 1) * maxPageSize, page * maxPageSize);


    const MobileItemCard = ({ data }) => {
        return (
            <div>
                <h5>
                    {data[headings[0].index]}
                </h5>
                {headings.slice(1).map((each, index) => {
                    return (
                        <div key={index} className="small mb-1">
                            <b>{each[locale]}:</b> {data[each.index]}
                        </div>
                    )
                })}
                <hr></hr>
            </div>
        )
    }
    const HeaderField = ({ index }) => {
        const handleSortClick = () => {
            if (sortField == headings[index].index) {
                setSortMode((sortMode == "asc") ? "dsc" : "asc")
            } else {
                setSortField(headings[index].index);
                setSortMode("asc")
            }
        };

        return (<th>
            <div className="d-flex">
                <div className="my-auto">
                    {headings[index][locale]}
                </div>
                <div onClick={handleSortClick} data-dsc={sortField == headings[index].index && sortMode == "dsc"} className={`${styles.sortimg} ms-auto my-auto`}>
                    <Image src="/expo_sort_icon.svg" width={14} height={14} />
                </div>
            </div>
        </th>)
    }

    const BodyField = ({ data }) => {
        return (
            <tr>
                {headings.map((each, index) => {
                    return (<td key={index}>
                        {data[each.index]}
                    </td>)
                })}
            </tr>
        )
    }

    return (
        <Container className="my-5">
            {supertitle && (<div className="mb-3"><Bluepill text={supertitle} /></div>)}
            {title && (<h3 className="mb-4">
                {title}
            </h3>)}
            <div className="d-none d-lg-block">
                <table className={styles.table}>
                    <tbody>
                        <tr>
                            {headings.map((each, index) => <HeaderField index={index} key={index} />)}
                        </tr>
                        {paginatedItems.map((each, index) => {
                            return (<BodyField key={index} data={each} />)
                        })}
                    </tbody>
                </table>
                <div className={`my-4 ${styles.pagecontainer}`}>
                    <div
                        data-shono={page != 1}
                        onClick={() => setPage(max(1, page - 1))}
                        className="small me-3">
                        {strings.prev[locale]}
                    </div>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((each, index) => {
                        return (<div key={index} onClick={() => setPage(each)} className="mx-2 small">
                            {each}
                        </div>)
                    })}
                    <div
                        data-shono={page != totalPages}
                        onClick={() => setPage(min(totalPages, page + 1))}
                        className="ms-3 small">
                        {strings.next[locale]}
                    </div>
                </div>

            </div>
            <Row className="d-flex d-lg-none">
                {sortedItems.map((each, index) => {
                    return (<Col lg={6} key={index}>
                        <MobileItemCard data={each} />
                    </Col>)
                })}
            </Row>
        </Container>
    )
}

export default function InvestmentProviders({ data, title, supertitle }) {
    const headings = [
        {
            index: "name",
            en: "Company Name",
            ta: "நிறுவனத்தின் பெயர்"
        },
        {
            index: "services",
            en: "Services",
            ta: "சேவைகள்"
        },
        {
            index: "contact_person",
            en: "Contact Person",
            ta: "தொடர்புபேர்"
        },
        {
            index: "mobile",
            en: "Mobile",
            ta: "மொபைல்"
        },
        {
            index: "email",
            en: "Email",
            ta: "மின்னஞ்சல்"
        }
    ]
    return (<CoreTable data={data} headings={headings} title={title} supertitle={supertitle} />)

}