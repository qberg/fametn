import { Col, Container, Row } from "react-bootstrap";
import styles from "./packers.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

const strings = {
    name: {
        en: "Name",
        ta: "பெயர்"
    },
    location: {
        en: "Location",
        ta: "இடம்"
    },
    contact: {
        en: "Contact Details",
        ta: "தொடர்பு விவரங்கள்"
    },
    rate: {
        en: "Rate Card",
        ta: "ரேட் கார்டு"
    },
    nores: {
        en: "No events found, please adjust filters",
        ta: "நிகழ்வுகள் காணப்படவில்லை, பட்டியல்களை சரிசெய்யவும்"
    },
    prev: {
        en: "Previous",
        ta: "முந்தைய"
    },
    next: {
        en: "Next",
        ta: "அடுத்தது"
    },
    filters: {
        en: "Filters",
        ta: "பட்டியல்கள்"
    },
    clear: {
        en: "Clear All",
        ta: "அழி"
    },
    clr: {
        en: "Clear",
        ta: "அழி"
    },
    intn: {
        en: "Inside Tamil Nadu",
        ta: "தமிழ்நாட்டில்"
    },
    outn: {
        en: "Outside Tamil Nadu",
        ta: "தமிழ்நாடு வெளியில்"
    },
    select: {
        en: "Select",
        ta: "தேர்ந்தெடு"
    }
}

const max = (a, b) => {
    return a > b ? a : b;
}

const min = (a, b) => {
    return a < b ? a : b;
}

const MobileItemCard = ({ data }) => {
    const { locale } = useRouter();

    return (<div className={styles.mobcard}>
        <h6>
            {data.name}
        </h6>
        <div>
            {data.location}
        </div>
        <div>
            {data.contact}
        </div>
        <Link target="_blank" className={styles.fancylink} href={data.ratecard_url}>
            {strings.rate[locale]}
        </Link>
    </div>)
}

export default function Packers({ data, title }) {
    const { locale } = useRouter();

    const allStates = [strings.intn[locale], strings.outn[locale]]

    const [sortField, setSortField] = useState("name");
    const [sortMode, setSortMode] = useState("asc");
    const [filterOpen, setFilterOpen] = useState(true);
    const [selfStateFilter, setSelfStateFilter] = useState([])
    const filteredItems = data.filter((each) => {
        if (selfStateFilter.length == 0) {
            return true;
        } else {
            const stateness = each.is_inside_tamilnadu ? strings.intn[locale] : strings.outn[locale]
            return selfStateFilter.includes(stateness)
        }
    })


    const sortedItems = filteredItems.sort((a, b) => {
        const aValue = a[sortField] || "";
        const bValue = b[sortField] || "";
        if (sortMode == "asc") {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    })

    const maxPageSize = 7
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(sortedItems.length / maxPageSize);
    const paginatedPackers = sortedItems.slice((page - 1) * maxPageSize, page * maxPageSize);

    const BodyField = ({ item }) => {
        return (<tr>
            <td>
                {item.name}
            </td>
            <td>
                {item.location}
            </td>
            <td>
                {item.contact}
            </td>
            <td>
                <Link className={styles.fancylink} href={item.ratecard_url}>
                    {item.ratecard_url}
                </Link>
            </td>
        </tr>)
    }

    const HeaderField = ({ name }) => {
        const handleSortClick = () => {
            if (sortField == name) {
                setSortMode((sortMode == "asc") ? "dsc" : "asc")
            } else {
                setSortField(name);
                setSortMode("asc")
            }
        };

        return (<th>
            <div className="d-flex">
                <div className="my-auto">
                    {strings[name][locale]}
                </div>
                <div onClick={handleSortClick} data-dsc={sortField == name && sortMode == "dsc"} className={`${styles.sortimg} ms-auto my-auto`}>
                    <Image src="/expo_sort_icon.svg" width={14} height={14} />
                </div>
            </div>
        </th>)
    }



    const FilterBox = () => {

        const clearAll = () => {
            setSelfStateFilter([])
        }

        const toggleFilter = (item) => {
            if (selfStateFilter.includes(item)) {
                setSelfStateFilter(selfStateFilter.filter((each) => each != item))
            } else {
                setSelfStateFilter([...selfStateFilter, item])
            }
        }

        const FilterGroup = ({ title, items, filter, setFilter }) => {

            const toggleFilter = (item) => {
                if (filter.includes(item)) {
                    setFilter(filter.filter((each) => each != item))
                } else {
                    setFilter([...filter, item])
                }
            }



            return (<div className="my-3">
                <div className="d-flex">
                    <div className="small">
                        {title}:
                    </div>
                    <div onClick={() => setFilter([])} className={`small ms-auto ${styles.link}`}>
                        {strings.clr[locale]}
                    </div>
                </div>
                <div className="d-flex flex-wrap mt-2">
                    {items.map((each, index) => {
                        const isSelected = filter.includes(each);
                        return (<div onClick={() => toggleFilter(each)} data-selected={filter.includes(each)} key={index} className={`d-flex smaller mb-1 ${styles.filteritem}`}>
                            <div className="my-auto">
                                <Image src={isSelected ? "/expo_selected.svg" : "/expo_unselected.svg"} width={14} height={14} />
                            </div>
                            <div className="ms-1 me-2 my-auto">
                                {each}
                            </div>
                        </div>)
                    })}
                </div>
            </div>)
        }

        useEffect(() => {
            const handleClickOutside = (event) => {
                const outsideFilterBox = !event.target.closest(`.${styles.filterbox}`);
                const outsideFilterButton = !event.target.closest(`.${styles.filterbutton}`);
                if (outsideFilterBox && outsideFilterButton) {
                    setFilterOpen(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, []);



        return (
            <div className={styles.filterbox}>
                <div className="d-flex">
                    <div className="my-auto small">
                        {strings.filters[locale]}
                    </div>
                    <div onClick={clearAll} className={`my-auto ms-auto small ${styles.link}`}>
                        {strings.clear[locale]}
                    </div>
                </div>
                <FilterGroup
                    title={strings.select[locale]}
                    items={allStates}
                    filter={selfStateFilter}
                    setFilter={setSelfStateFilter}
                />
            </div>
        )
    }

    return (
        <Container className="my-5">
            <div className="d-flex">
                <div className="my-auto">
                    <h3>
                        {title}
                    </h3>
                </div>
                <div className={`ms-auto ${styles.filterbutton} mb-3 position-relative`}>
                    <div
                        onClick={(e) => {
                            setFilterOpen(!filterOpen);
                            e.stopPropagation();
                        }}
                        className={styles.outlinebox}>
                        <Image className="my-auto me-2" src="/expo_filter_icon.svg" width={16} height={16} />
                        {strings.filters[locale]}
                    </div>
                    {filterOpen && (<FilterBox />)}
                </div>
            </div>
            <div className="d-none d-lg-block mt-2">
                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <HeaderField name="name" />
                            <HeaderField name="location" />
                            <HeaderField name="contact" />
                            <HeaderField name="rate" />
                        </tr>
                        {paginatedPackers.map((each, index) => {
                            return (<BodyField key={index} item={each} />)
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


            {sortedItems.length == 0 && (<div className="my-3">
                <center>
                    <div className="small">
                        {strings.nores[locale]}
                    </div>
                </center>
            </div>)}
        </Container>
    )
}