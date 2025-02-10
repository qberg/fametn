import { Row, Col, Container } from "react-bootstrap"
import styles from "./expoblock.module.css"
import YellowArrowButton from "../yellow_arrow_button"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

const strings = {
    name: {
        en: "Event Name",
        ta: "நிகழ்வு பெயர்"
    },
    country: {
        en: "Country",
        ta: "நாடு"
    },
    city: {
        en: "City",
        ta: "நகரம்"
    },
    sector: {
        en: "Sector",
        ta: "துறை"
    },
    date: {
        en: "Dates",
        ta: "தேதிகள்"
    },
    search: {
        en: "Search Event names, Country...",
        ta: "நிகழ்வு பெயர்களை, நாடு..."
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
    date: {
        en: "Date",
        ta: "தேதி"
    },
    from: {
        en: "From",
        ta: "முதல்"
    },
    to: {
        en: "To",
        ta: "வரை"
    },
    filters: {
        en: "Filters",
        ta: "பட்டியல்கள்"
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
    }
}

const formatDate = (date) => {
    // convert date from "2024-12-24" to dd MMM YYYY
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' });
}



export default function ExpoBlock({ title, description, message, expos }) {

    const { locale } = useRouter();

    const [sortField, setSortField] = useState("name");
    const [sortMode, setSortMode] = useState("asc");
    const [searchText, setSearchText] = useState("");
    const [countryFilter, setCountryFilter] = useState([]);
    const [cityFilter, setCityFilter] = useState([]);
    const [sectorFilter, setSectorFilter] = useState([]);
    const [startDateFilter, setStartDateFilter] = useState(null);
    const [endDateFilter, setEndDateFilter] = useState(null);
    const [filterOpen, setFilterOpen] = useState(false);

    const firstStartDate = new Date("2020-01-01");
    const lastEndDate = new Date();
    lastEndDate.setFullYear(lastEndDate.getFullYear() + 1);

    const filterBySearchText = (inputs, text) => {
        if (text == "") {
            return inputs;
        }
        return inputs.filter((each) => {
            return Object.values(each).some((val) => {
                return val.toLowerCase().includes(text.toLowerCase())
            })
        })
    }

    const searchedEvents = filterBySearchText(expos.allExpos, searchText);
    const filteredEvents = searchedEvents.filter((each) => {
        if (countryFilter.length > 0 && !countryFilter.includes(each.country)) {
            return false;
        }
        if (cityFilter.length > 0 && !cityFilter.includes(each.city)) {
            return false;
        }
        if (sectorFilter.length > 0 && !sectorFilter.includes(each.sector)) {
            return false;
        }
        if (startDateFilter && new Date(each.start_date) < startDateFilter) {
            return false;
        }
        if (endDateFilter && new Date(each.end_date) > endDateFilter) {
            return false;
        }
        return true;
    });

    const sortedEvents = filteredEvents.sort((a, b) => {
        const aValue = a[sortField] || "";
        const bValue = b[sortField] || "";
        if (sortMode == "asc") {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    })

    const maxPageSize = 7;
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(sortedEvents.length / maxPageSize);
    const paginatedEvents = sortedEvents.slice((page - 1) * maxPageSize, page * maxPageSize);

    const FilterBox = () => {

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
                                <Image alt="" src={isSelected ? "/expo_selected.svg" : "/expo_unselected.svg"} width={14} height={14} />
                            </div>
                            <div className="ms-1 me-2 my-auto">
                                {each}
                            </div>
                        </div>)
                    })}
                </div>
            </div>)
        }

        const clearAll = () => {
            setCountryFilter([]);
            setCityFilter([]);
            setSectorFilter([]);
            clearAllDates();
        }

        const clearAllDates = () => {
            setStartDateFilter(null);
            setEndDateFilter(null);
        }

        const processedStartDate = startDateFilter || firstStartDate;
        const processedEndDate = endDateFilter || lastEndDate


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
            (<div className={styles.filterbox}>
                <div className="d-flex">
                    <div className="small">
                        {strings.filters[locale]}
                    </div>
                    <div onClick={clearAll} className={`small ms-auto ${styles.link}`}>
                        {strings.clear[locale]}
                    </div>
                </div>
                <FilterGroup
                    title={strings.country[locale]}
                    items={expos.allExpoCountries}
                    filter={countryFilter}
                    setFilter={setCountryFilter} />
                <hr></hr>
                <FilterGroup
                    title={strings.city[locale]}
                    items={expos.allExpoCities}
                    filter={cityFilter}
                    setFilter={setCityFilter} />
                <hr></hr>
                <FilterGroup
                    title={strings.sector[locale]}
                    items={expos.allExpoSectors}
                    filter={sectorFilter}
                    setFilter={setSectorFilter} />
                <hr></hr>
                <div className="d-flex">
                    <div className="small">
                        {strings.date[locale]}
                    </div>
                    <div onClick={clearAllDates} className={`small ms-auto ${styles.link}`}>
                        {strings.clr[locale]}
                    </div>
                </div>
                <Row>
                    <Col md={6}>
                        <div className="smaller">
                            {strings.from[locale]}:
                            <div>
                                <input
                                    type="date"
                                    className={styles.datepicker}
                                    value={processedStartDate.toISOString().split('T')[0]}
                                    onChange={(e) => {
                                        const newStartDate = new Date(e.target.value);
                                        setStartDateFilter(newStartDate);
                                        if (newStartDate > processedEndDate) {
                                            setEndDateFilter(new Date(newStartDate.getTime() + 24 * 60 * 60 * 1000));
                                        }
                                    }} />
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="smaller">
                            {strings.to[locale]}:
                            <div>
                                <input
                                    type="date"
                                    className={styles.datepicker}
                                    value={processedEndDate.toISOString().split('T')[0]}
                                    min={processedStartDate.toISOString().split('T')[0]}
                                    onChange={(e) => setEndDateFilter(new Date(e.target.value))} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>)
        )
    }



    const BodyField = ({ item }) => {
        return (<tr>
            <td>
                {item.name}
            </td>
            <td>
                {item.country}
            </td>
            <td>
                {item.city}
            </td>
            <td>
                {item.sector}
            </td>
            <td>
                {formatDate(item.start_date)}{item.end_date && (<> - {formatDate(item.end_date)}
                </>)}
            </td>
        </tr>)
    }

    const max = (a, b) => {
        return a > b ? a : b;
    }

    const min = (a, b) => {
        return a < b ? a : b;
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
                    <Image alt="" src="/expo_sort_icon.svg" width={14} height={14} />
                </div>
            </div>
        </th>)
    }

    const MobileEventCard = ({ data }) => {
        return (<div className={styles.mobcard}>
            <h6>
                {data.name}
            </h6>
            <div>
                {data.city}, {data.country}
            </div>
            <div>
                {strings.date[locale]}: {formatDate(data.start_date)} - {formatDate(data.end_date)}
            </div>
        </div>)
    }

    return (<Container className="my-5">
        <div>
            <h2 data-aos="fade-up">
                {title}
            </h2>
            <p data-aos="fade-up" className="mt-3">
                {description}
            </p>
        </div>
        <div data-aos="fade-up" className={`mt-4 d-block d-lg-flex ${styles.messagebox}`}>
            <div className="my-auto">
                <h6>
                    {message.title}
                </h6>
                <p className="mb-0">
                    {message.description}
                </p>
            </div>
            <div className="ms-auto my-auto mt-3 mt-lg-auto">
                <YellowArrowButton text={message.cta_text} link={message.cta_link} />
            </div>

        </div>
        <div data-aos="fade-up" className="d-block d-lg-flex mt-4">
            <div className={`d-flex ${styles.outlinebox} mb-3`}>
                <div className="my-auto">
                    <Image alt="" src="/expo_search.svg" width={20} height={20} />
                </div>
                <div className="my-auto ms-2">
                    <input className={styles.search} placeholder={strings.search[locale]} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                </div>
            </div>
            <div className={` ${styles.filterbutton} ms-auto  position-relative mb-3`}>
                <div
                    onClick={(e) => {
                        setFilterOpen(!filterOpen);
                        e.stopPropagation();
                    }}
                    className={styles.outlinebox}>
                    <Image alt="" className="my-auto me-2" src="/expo_filter_icon.svg" width={16} height={16} />
                    {strings.filters[locale]}

                </div>

                {filterOpen && (<FilterBox />)}
            </div>
        </div>
        <div data-aos="fade-up" className="d-none d-lg-block mt-2">
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <HeaderField name="name" />
                        <HeaderField name="country" />
                        <HeaderField name="city" />
                        <HeaderField name="sector" />
                        <HeaderField name="date" />
                    </tr>
                    {paginatedEvents.map((each, index) => {
                        return (<BodyField key={index} item={each} />)
                    })}
                </tbody>
            </table>

            <div data-aos="fade-up" className={`my-4 ${styles.pagecontainer}`}>
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
            {sortedEvents.map((each, index) => {
                return (<Col data-aos="fade-up" lg={6} key={index}>
                    <MobileEventCard data={each} />
                </Col>)
            })}
        </Row>

        {sortedEvents.length == 0 && (<div className="my-3">
            <center>
                <div className="small">
                    {strings.nores[locale]}
                </div>
            </center>
        </div>)}
    </Container>)
}