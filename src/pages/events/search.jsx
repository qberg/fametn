import { Col, Container, Row } from "react-bootstrap";
import RootLayout from "../../components/layout/layout";
import { CacheHeaders } from "../../utils/definitions";
import { getAllEventLocations, getAllEventCategories, getEventSearchResults } from "../../utils/events";
import Gigasearch from "../../components/gigasearch";
import { useEffect, useRef, useState } from "react";
import { EventCard } from "../../components/upcoming_events";
import { useRouter } from "next/router";
import { relative } from "path";
import styles from "./events.module.css";
import Image from "next/image";
import YellowArrowButton from "../../components/yellow_arrow_button";
import EventPopup from "../../components/eventpopup";
const strings = {
    "results": {
        "en": "Search results for",
        "ta": "தேடல் முடிவுகள்"
    },
    "filter": {
        "en": "Filters",
        "ta": "வடிகள்"
    },
    "start": {
        "en": "Start Date",
        "ta": "தொடக்க தேதி"
    },
    "end": {
        "en": "End Date",
        "ta": "முடிவு தேதி"
    },
    "loc": {
        "en": "Location",
        "ta": "இடம்"
    },
    "cat": {
        "en": "Category",
        "ta": "வகை"
    },
    "apply": {
        "en": "Apply",
        "ta": "பிரிக்கவும்"
    }

}

function EventFilter({ onChange, startDate, endDate, locations, categories, allLocations, allCategories }) {
    const { locale } = useRouter();

    const [open, setOpen] = useState(false);

    const deltaPast = 2;
    const deltaFuture = 2;

    const startReset = startDate || new Date(new Date().setFullYear(new Date().getFullYear() - deltaPast));
    const endReset = endDate || new Date(new Date().setFullYear(new Date().getFullYear() + deltaFuture));
    const locReset = locations || [];
    const catReset = categories || [];

    const [localStartDate, setStartDate] = useState(startReset);
    const [localEndDate, setEndDate] = useState(endReset);
    const [localLocations, setLocation] = useState(locReset);
    const [localCategories, setCategories] = useState(catReset);

    const toggeleLocation = (item) => {
        if (localLocations.includes(item)) {
            setLocation(localLocations.filter((each) => each != item));
        } else {
            setLocation([...localLocations, item]);
        }
    }

    const toggleCategory = (item) => {
        if (localCategories.includes(item)) {
            setCategories(localCategories.filter((each) => each != item));
        } else {
            setCategories([...localCategories, item]);
        }
    }

    const handleApply = () => {
        onChange(localStartDate, localEndDate, localLocations, localCategories)
    }

    const resetFilters = () => {
        setStartDate(startReset);
        setEndDate(endReset);
        setLocation(locReset);
        setCategories(catReset);
    }

    const closeBox = () => {
        resetFilters();
        setOpen(false);
    }

    const openBox = () => {
        setOpen(true);
    }

    const handleToggle = () => {
        if (open) {
            closeBox();
        }
        else {
            openBox();
        }
    }

    const handleClickOutside = (event) => {
        if (!event.target.closest(`.${styles.filterbutton}`) && !event.target.closest(`.${styles.eventsfilterpopup}`)) {
            closeBox();
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    })

    return (
        <div className="position-relative">
            <div onClick={() => handleToggle()} className={styles.filterbutton}>
                <div className="me-3 my-auto">
                    <Image src="/events_filter.svg" width={20} height={20} />
                </div>
                <div className="my-auto">
                    {strings.filter[locale]}
                </div>
            </div>
            {open && (
                <div className={styles.eventsfilterpopup}>
                    <h5>{strings.filter[locale]}</h5>
                    <hr></hr>
                    <div className="mt-3">
                        <Row>
                            <Col className={styles.nomb} md={6}>
                                <div>{strings.start[locale]}:</div>
                                <input className={styles.datepicker} type="date" value={localStartDate.toISOString().split('T')[0]} onChange={(e) => {
                                    const newStartDate = new Date(e.target.value);
                                    setStartDate(newStartDate);

                                    // if start date is greater than end date, set end date to start date + 1
                                    if (newStartDate > localEndDate) {
                                        setEndDate(new Date(newStartDate.getTime() + 86400000));
                                    }
                                }} />
                            </Col>
                            <Col className={styles.nomb} md={6}>
                                <div>{strings.end[locale]}:</div>
                                <input className={styles.datepicker} type="date" value={localEndDate.toISOString().split('T')[0]} min={localStartDate.toISOString().split('T')[0]} onChange={(e) => {
                                    const newEndDate = new Date(e.target.value);
                                    setEndDate(newEndDate);
                                }} />
                            </Col>
                        </Row>
                    </div>
                    <hr></hr>
                    <Row>
                        <Col md={6} className={styles.nomb}>
                            <div>
                                {strings.loc[locale]}:
                                {allLocations.map((each, index) => {
                                    return (<div onClick={() => toggeleLocation(each)} key={index} className={styles.formcheck}>
                                        <div data-shono={localLocations.includes(each) || localLocations.length == 0} className={styles.checkmark}>
                                        </div>
                                        <div className="ms-2 small">{each}</div>
                                    </div>)
                                })}
                            </div>

                        </Col>


                        <Col className={styles.nomb} md={6}>
                            <div>
                                {strings.cat[locale]}:
                                {allCategories.map((each, index) => {
                                    return (<div onClick={() => toggleCategory(each)} key={index} className={styles.formcheck}>
                                        <div data-shono={localCategories.includes(each) || localCategories.length == 0} className={styles.checkmark}>
                                        </div>
                                        <div className="ms-2 small">{each}</div>
                                    </div>)
                                })}
                            </div>
                        </Col>
                    </Row>
                    <hr></hr>
                    <div onClick={handleApply}>
                        <YellowArrowButton text={strings.apply[locale]} />
                    </div>
                </div>)}
        </div>)
}


export default function SearchEvents({ locations, search, categories, events, filterCats, filterLocs, startDate, endDate }) {
    const { locale } = useRouter();

    const [searchText, setSearchText] = useState(search);

    const onSearch = (text) => {
        setSearchText(text);
    }



    const buildQueryString = (search, fcs, fls, startDateString, endDateString) => {
        var queryString = `?search=${search}`;
        if (fcs.length > 0) {
            queryString += `&categories=${fcs.map(each => each.replace(",", "#")).join(',')}`;
        }
        if (fls.length > 0) {
            queryString += `&location=${fls.map(each => each.replace(",", "#")).join(',')}`;
        }
        if (startDateString) {
            queryString += `&startDate=${startDateString}`;
        }
        if (endDateString) {
            queryString += `&endDate=${endDateString}`;
        }
        return queryString;
    }

    const handleSearch = () => {
        var queryString = buildQueryString(searchText, filterCats, filterLocs, startDate, endDate);
        window.location.search = queryString;
    }

    const stringToDate = (dateString) => {
        if (!dateString) {
            return null;
        }
        const [year, month, day] = dateString.split('-');
        const date = new Date(year, month - 1, day);
        const timezoneOffset = date.getTimezoneOffset() * 60000;
        return new Date(date.getTime() - timezoneOffset);
    }

    const dateToString = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleFilterChange = (startDate, endDate, locations, categories) => {
        const startDateString = dateToString(startDate);
        const endDateString = dateToString(endDate);
        const queryString = buildQueryString(searchText, categories, locations, startDateString, endDateString);
        window.location.search = queryString;
    }

    const popupRef = useRef();

    const showPopup = (data) => {
        popupRef.current.showItem(data);
    }

    return (
        <RootLayout>
            <Container>
                <EventPopup ref={popupRef} />
                <div className="mt-4">
                    <Row>
                        <Col lg={10}>
                            <Gigasearch text={searchText} onSearch={onSearch} handleSearch={handleSearch} />
                        </Col>
                        <Col lg={2}>
                            <EventFilter
                                onChange={handleFilterChange}
                                allLocations={locations}
                                allCategories={categories}
                                startDate={stringToDate(startDate)}
                                endDate={stringToDate(endDate)}
                                locations={filterLocs}
                                categories={filterCats}
                            />
                            {/* <BlogSort value={sort} onChange={handleSortChange} /> */}
                        </Col>
                    </Row>
                    {search != "" && (<div className="mt-2 mb-4">
                        <h2>
                            {strings.results[locale]} "{search}"
                        </h2>
                    </div>)}
                    <Row className="mt-4">
                        {events.map((each, index) => {
                            return (
                                <Col onClick={() => showPopup(each)} md={6} key={index}>
                                    <EventCard data={each} />
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </Container>
        </RootLayout>
    )
}

export async function getServerSideProps(context) {

    context.res.setHeader('Cache-Control', CacheHeaders);
    const language = context.locale;

    const page = parseInt(context.query.page) || 1;
    const search = context.query.search || "";
    const startDate = context.query.startDate || null;
    const endDate = context.query.endDate || null;
    const filterCategories = context.query.categories ? context.query.categories.split(',').map(each => each.replace("#", ",")) : [];
    const filterLocation = context.query.location ? context.query.location.split(',').map(each => each.replace("#", ",")) : [];

    const locations = await getAllEventLocations(language);
    const categories = await getAllEventCategories(language);

    const searchResult = await getEventSearchResults(
        language,
        search,
        filterCategories,
        filterLocation,
        startDate,
        endDate);

    return {
        props: {
            search: search,
            locations: locations,
            categories: categories,
            events: searchResult,
            startDate: startDate,
            endDate: endDate,
            filterCats: filterCategories,
            filterLocs: filterLocation
        }
    }
}