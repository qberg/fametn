import RootLayout from "../../components/layout/layout";
import { Container, Row, Col } from "react-bootstrap";
import Gigasearch from "../../components/gigasearch";
import { CacheHeaders } from "../../utils/definitions";
import { getDataFromPath, getNewsletterData } from "../../utils/api_calls";
import { getBlogList, getTopNBlogs } from "../../utils/blogs";
import Bluepill from "../../components/bluepill";
import Topthreecarousel from "../../components/topthreecarousel";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./blogs.module.css";
import DynamicImage from "../../components/dynamicImage";
import Image from "next/image";
import Pagination from "../../components/pagination";
import Link from "next/link";
import Newsletterform from "../../components/newsletterform";
import BlogCard from "../../components/blogcard";

const strings = {
    "blogs": {
        "en": "Blogs",
        "ta": "வலைப்பதிவுகள்"
    },
    "results": {
        "en": "Search results for",
        "ta": "தேடல் முடிவுகள்"
    }
}

const sortWays = {
    "relevant": {
        "column": "",
    },
    "dateasc": {
        "column": "date",
        "ascending": true
    },
    "datedesc": {
        "column": "date",
        "ascending": false
    },
    "titleasc": {
        "column": "title",
        "ascending": true
    },
    "titledesc": {
        "column": "title",
        "ascending": false
    }
}


const formatDate = (date) => {
    // convert date from "2024-12-24" to dd MMM YYYY
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' });
}


// function BlogCard({ data }) {

//     const maxExcerptLength = 140;
//     const truncatedExcerpt = data.excerpt.length > maxExcerptLength ? data.excerpt.slice(0, maxExcerptLength) + "..." : data.excerpt;

//     // first tag is the main tag
//     const mainTag = data.tags[0] && (<div className={styles.maintag}>
//         {data.tags[0].text}
//     </div>);

//     // remaining tags
//     const remainingTags = data.tags.slice(1).map((each, index) => {
//         return (
//             <div key={index} className={styles.tag}>
//                 {each.text}
//             </div>
//         )
//     })

//     return (
//         <Link href={`/blogs/${data.url}`}>
//             <div className={styles.blogcard}>
//                 <div className={styles.blogcardimg}>
//                     <DynamicImage src={data.image} objectFit="cover" />
//                 </div>
//                 <div className="mt-3 small">
//                     {data.author + " • " + formatDate(data.date)}
//                 </div>
//                 <div className={`${styles.titleblock} d-flex mt-1`}>
//                     <div className="my-0 me-2">
//                         <h6>
//                             {data.title}
//                         </h6>
//                     </div>
//                     <div className="ms-auto position-relative me-1">
//                         <Image src="/arrow_top_right.svg" height={12} width={12} />
//                     </div>
//                 </div>
//                 <div className={`small mb-3 ${styles.paratext}`}>
//                     {truncatedExcerpt}
//                 </div>
//                 <div className="mt-auto mb-0 d-flex flex-wrap smaller">
//                     {mainTag} {remainingTags}
//                 </div>
//             </div>
//         </Link>)
// }

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

    const onSearch = (text) => {
        setSearchText(text);
    }

    const handleSearch = () => {
        window.location.search = `?search=${searchText}&sort=${router.query.sort}`;
        
    }

    return (
        <RootLayout>
            <Container>
                <div className="mt-4">
                    <Row>
                        <Col md={11}>
                            <Gigasearch text={searchText} onSearch={onSearch} handleSearch={handleSearch} />
                        </Col>
                        <Col md={1}>
                            Filter
                        </Col>
                    </Row>
                </div>

                {search == "" && (<div className="mb-5">
                    <div className="mt-4 mb-4">
                        <center>
                            <Bluepill text={meta?.supertitle} />
                            <h2 className="mt-3 text-uppercase">{meta?.title}</h2>
                            <p>
                                {meta?.description}
                            </p>
                        </center>
                    </div>
                    <Topthreecarousel data={top3carouselData} />
                </div>)}


                <div className="mt-3 mb-4">
                    <h4>{(search == "") ? strings.blogs[locale] : strings.results[locale] + ` "${search}"`}</h4>
                </div>
                <Row>
                    {currentBlogList.map((each, index) => {
                        return (<Col md={4} key={index}>
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
            // news: news,
            // data: data.data.attributes
        }
    }
}