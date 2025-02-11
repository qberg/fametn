import RootLayout from "../../components/layout/layout";
import { Container, Row, Col } from "react-bootstrap";
import Gigasearch from "../../components/gigasearch";
import { CacheHeaders } from "../../utils/definitions";
import { getDataFromPath, getNewsletterData } from "../../utils/api_calls";
import { getBlogList, getTopNBlogs } from "../../utils/blogs";
import Bluepill from "../../components/bluepill";
import Topthreecarousel from "../../components/topthreecarousel";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Pagination from "../../components/pagination";

import Newsletterform from "../../components/newsletterform";
import BlogCard from "../../components/blogcard";
import styles from "./blogs.module.css";
import Image from "next/image";

const strings = {
    "blogs": {
        "en": "Blogs",
        "ta": "வலைப்பதிவுகள்"
    },
    "results": {
        "en": "Search results for",
        "ta": "தேடல் முடிவுகள்"
    },
    "sort": {
        "en": "Sort",
        "ta": "வகை"
    }
}

const sortWays = {
    "relevant": {
        "column": "",
        "display": "Relevance",
        "key": "relevant"
    },
    "dateasc": {
        "column": "date",
        "ascending": true,
        "display": "Date ↑",
        "key": "dateasc"
    },
    "datedesc": {
        "column": "date",
        "ascending": false,
        "display": "Date ↓",
        "key": "datedesc"
    },
    "titleasc": {
        "column": "title",
        "ascending": true,
        "display": "Title ↑",
        "key": "titleasc"
    },
    "titledesc": {
        "column": "title",
        "ascending": false,
        "display": "Title ↓",
        "key": "titledesc"
    }
}


const formatDate = (date) => {
    // convert date from "2024-12-24" to dd MMM YYYY
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' });
}

function BlogSort({ onChange, value }) {
    const { locale } = useRouter();

    const [open, setOpen] = useState(false);

    const handleClickOutside = (event) => {
        if (!event.target.closest(`.${styles.sortbutton}`) && !event.target.closest(`.${styles.sortdropdown}`)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="position-relative h-100">
            <div onClick={() => setOpen(!open)} className={styles.sortbutton}>
                <div className="my-auto me-2">
                    <Image src="/blog_sort.svg" height={16} width={16} />
                </div>
                <div className="my-auto">
                    <span className="d-inline d-lg-none">{strings.sort[locale]}: </span> {value.display}
                </div>
            </div>
            {open && (<div data-aos="fade-down" className={styles.sortdropdown}>
                {Object.keys(sortWays).map((each, index) => {
                    return (<div className={styles.sortitem} key={index} onClick={() => {
                        setOpen(false)
                        onChange(sortWays[each])
                    }}>
                        {sortWays[each].display}
                    </div>)
                })}
            </div>)}
        </div>
    );
}

export default function Blogs({ news, page, totalPages, blogList, search, sort, meta, recentBlogs }) {
    const { locale } = useRouter();
    const router = useRouter();

    const [searchText, setSearchText] = useState(search);
    const [currentBlogList, setCurrentBlogList] = useState(blogList);

    const top3carouselData = recentBlogs.map((each) => {
        return {
            title: each.title,
            subtitle: each.author + " • " + formatDate(each.date),
            description: each.excerpt,
            image: each.image,
            link: `/blogs/${each.url}`
        }
    })
    
    const getQueryString = (searchText, sort) => {
        var queryString = `?search=${searchText}`;
        if (sort) {
            queryString += `&sort=${sort}`;
        }
        return queryString;
    }

    const handleSearch = () => {
        window.location.search = getQueryString(searchText, router.query.sort);;
    }

    const handleSortChange = (value) => {
        if (value.key == sort.key) {
            return;
        }
        window.location.search = getQueryString(searchText, value.key);
    }

    return (
        <RootLayout>
            <Container>
                <div className="z-2 position-relative mt-4 mb-4">
                    <Row data-aos="fade-up">
                        <Col lg={10}>
                            <Gigasearch text={searchText} onSearch={(text) => setSearchText(text)} handleSearch={handleSearch} />
                        </Col>
                        <Col lg={2}>
                            <BlogSort value={sort} onChange={handleSortChange} />
                        </Col>
                    </Row>
                </div>

                {search == "" && (<div className={`mb-5 ${styles.topper}`}>
                    <div className="mt-4 mb-4">
                        <center>
                            <Bluepill text={meta?.supertitle} />
                            <h2 data-aos="fade-up" className="mt-3 text-uppercase">{meta?.title}</h2>
                            <p data-aos="fade-up">
                                {meta?.description}
                            </p>
                        </center>
                    </div>
                    <Topthreecarousel data={top3carouselData} />
                </div>)}


                <div data-aos="fade-up" className="mt-3 mb-4">
                    {currentBlogList.length !=0 && (<h4>{(search == "") ? strings.blogs[locale] : strings.results[locale] + ` "${search}"`}</h4>)}
                    {currentBlogList.length == 0 && (<h4>No results found for &quot;{search}&quot;</h4>)}
                </div>
                <Row className="gx-5 gy-5">
                    {currentBlogList.map((each, index) => {
                        return (<Col md={6} lg={4} key={index}>
                            <BlogCard data={each} />
                        </Col>)
                    })}
                </Row>
                <div className="my-5">
                    <Pagination page={page} totalPages={totalPages} />
                </div>
            </Container>
            <Newsletterform data={news} />
        </RootLayout>
    )
}


export async function getServerSideProps(context) {

    // add cache headers
    context.res.setHeader('Cache-Control', CacheHeaders);
    const language = context.locale;

    const blogmetaPath = "blogs-meta"
    const meta = await getDataFromPath(blogmetaPath, language);
    const recentBlogs = await getTopNBlogs(3, language);

    // get page from query params default 0
    // get search text from query params default ""
    const page = parseInt(context.query.page) || 1;
    const search = context.query.search || "";
    const sort = sortWays[context.query.sort] || sortWays["relevant"];

    const currentBlogList = await getBlogList(language, search, sort.column, sort.ascending, page);
    const news = await getNewsletterData(language);

    return {
        props: {
            page: currentBlogList.currentPage,
            totalPages: currentBlogList.totalPages,
            blogList: currentBlogList.blogs,
            search: search,
            sort: sort,
            meta: meta?.data?.attributes,
            recentBlogs: recentBlogs,
            news: news
        }
    }
}