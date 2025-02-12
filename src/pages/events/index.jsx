import { Col, Container, Row } from "react-bootstrap";
import RootLayout from "../../components/layout/layout";
import styles from "./events.module.css";
import { useState } from "react";
import Gigasearch from "../../components/gigasearch";
import YellowPill from "../../components/yellowpill";
import { getDataFromPath, getHeaderFooterData, getNewsletterData } from "../../utils/api_calls";
import { CacheHeaders } from "../../utils/definitions";
import { getUpComingNEvents } from "../../utils/events";
import Topthreecarousel from "../../components/topthreecarousel";
import UpcomingEvents from "../../components/upcoming_events";
import Newsletterform from "../../components/newsletterform";
import EventPopup from "../../components/eventpopup";

const formatDate = (date) => {
    // convert date from "2024-12-24" to dd MMM YYYY
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function Events({ news, search, meta, upcomingEvents, headerFooter }) {

    const [searchText, setSearchText] = useState(search);
    const onSearch = (text) => {
        setSearchText(text);
    }

    const handleSearch = () => {
        const location = "/events/search?search=" + searchText;
        window.location = location;
    }

    const topNCarouselData = upcomingEvents.map((each) => {
        return {
            title: each.title,
            subtitle: formatDate(each.start_date) + " - " + formatDate(each.end_date),
            description: each.location,
            image: each.image,
            link: `/events/${each.url}`
        }
    })

    return (
        <RootLayout data={headerFooter}>
            <Container className={styles.yellowcontainer} fluid>
                <Container>
                    <div className="pt-4">
                        <Row>
                            <Col md={12}>
                                <Gigasearch text={searchText} onSearch={onSearch} handleSearch={handleSearch} />
                            </Col>
                        </Row>
                    </div>
                    {search == "" && (
                        <div className="pb-5">
                            <div className="mt-4 mb-4">
                                <center>
                                    <YellowPill text={meta?.supertitle} />
                                    <h2 data-aos="fade-up" className="mt-3 text-uppercase">{meta?.title}</h2>
                                    <p data-aos="fade-up">
                                        {meta?.subtitle}
                                    </p>
                                </center>
                            </div>
                            <div className="pb-3">
                                <Topthreecarousel data={topNCarouselData} />
                            </div>
                        </div>
                    )}
                </Container>
            </Container>
            <UpcomingEvents meta={meta} data={upcomingEvents} />
            <Newsletterform data={news} />
        </RootLayout>
    )
}

export async function getServerSideProps(context) {

    context.res.setHeader('Cache-Control', CacheHeaders);
    const language = context.locale;
    const search = context.query.search || "";
    const meta = await getDataFromPath("events-meta", language)
    const upcomingEvents = await getUpComingNEvents(language)
    const news = await getNewsletterData(language);
    return {
        props: {
            search: search,
            meta: meta?.data?.attributes,
            upcomingEvents: upcomingEvents,
            news: news,
            headerFooter: await getHeaderFooterData(language)
        }
    }
}