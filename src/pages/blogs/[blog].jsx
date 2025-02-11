import RootLayout from "@/components/layout/layout";
import { Col, Container, Row } from "react-bootstrap";
import { getBlog, getTopNBlogs } from "../../utils/blogs";
import { CacheHeaders } from "../../utils/definitions";
import Image from "next/image";
import Link from "next/link";
import styles from "./blogs.module.css";
import Modal from "../../components/modal";
import { useRouter } from "next/router";
import { useState } from "react";
import DynamicImage from "../../components/dynamicImage";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { getNewsletterData } from "../../utils/api_calls";
import Newsletterform from "../../components/newsletterform";
import Bluepill from "../../components/bluepill";
import YellowArrowButton from "../../components/yellow_arrow_button";
import BlogCard from "../../components/blogcard";

const strings = {
    "copied": {
        "en": "Link copied to clipboard",
        "ta": "இணையத்தில் பகிரவும்"
    },
    "recent": {
        "en": "Recent Blogs",
        "ta": "சமீபத்திய வலைப்பதிவுகள்"
    },
    "view": {
        "en": "View All",
        "ta": "அனைத்தும் பார்"
    }
}

const formatDate = (date) => {
    // convert date from "2024-12-24" to dd MMM YYYY
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' });
}

const RecentBlogs = ({ recentBlogs }) => {
    const { locale } = useRouter();
    return (
        <Container>
            <div className="d-flex mt-5">
                <div>
                    <Bluepill text={strings.recent[locale]} />
                </div>
                <div data-aos="fade-up" className="ms-auto">
                    <YellowArrowButton text={strings.view[locale]} link="/blogs" />
                </div>
            </div>
            <Row className="pt-4 pb-5">
                {recentBlogs.map((each, index) => {
                    return (<Col md={4} key={index}>
                        <BlogCard data={each} />
                    </Col>)
                })}
            </Row>
        </Container>
    )
}


export default function Blog({ recentBlogs, news, title, length, date, author, content, image, tags }) {
    const { locale } = useRouter();

    const sharePageToTwitter = () => {
        const url = window.location.href;
        const text = title;
        window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }

    const [showModal, setShowModal] = useState(false);
    const modalTimeout = 3000;
    
    const copyToClipboard = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, modalTimeout);
    }

    const shareToFacebook = () => {
        const url = window.location.href;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    }

    return (
        <RootLayout>
            <Container className="px-3 px-md-5">
                <div data-aos="fade-up" className="pt-5 pb-4">
                    <Link className={styles.movelefter} href={`/blogs`}>
                        <Image src="/blog_left_arrow.svg" height={28} width={28} />
                    </Link>
                </div>
                <div data-aos="fade-up">
                    <h1 className="text-uppercase">
                        {title}
                    </h1>
                </div>
                <hr></hr>
                <div data-aos="fade-up" className="d-flex">
                    <div className={styles.minortext}>
                        {formatDate(date)} • {length}
                    </div>
                    <div className={`d-flex ms-auto ${styles.socsec}`}>
                        <div onClick={() => sharePageToTwitter()} className="me-3">
                            <Image src="/blog_x.svg" height={20} width={20} />
                        </div>
                        <div onClick={() => copyToClipboard()} className="me-3">
                            <Image src="/blog_copy.svg" height={20} width={20} />
                        </div>
                        <div onClick={() => shareToFacebook()} className="">
                            <Image src="/blog_fb.svg" height={20} width={20} />
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div data-aos="fade-up" className="mt-5">
                    <div className={styles.blogimage}>
                        <DynamicImage src={image} />
                    </div>
                </div>
                <div data-aos="fade-up" className={`mt-4 smaller ${styles.blogcontent}`}>
                    <BlocksRenderer content={content} />
                </div>
                <Modal show={showModal} text={strings.copied[locale]} />
                <hr></hr>
            </Container>
            <RecentBlogs recentBlogs={recentBlogs} />
            <Newsletterform data={news} />
        </RootLayout>
    );
}

export async function getServerSideProps(context) {
    context.res.setHeader('Cache-Control', CacheHeaders);
    const blogurl = context.params.blog;
    const language = context.locale;
    const blogData = await getBlog(language, blogurl);
    const recentBlogs = await getTopNBlogs(3, language);
    const news = await getNewsletterData(language);

    const replaceImagePath = (contentBlock) => {
        const IMAGE = "image";
        const SPLIT_TOOL = "/uploads/";

        if (contentBlock.type === IMAGE) {
            contentBlock.image.url = process.env.NEXT_PUBLIC_IMG_ENDPOINT + SPLIT_TOOL + contentBlock.image.url.split(SPLIT_TOOL)[1];
        }

        if (contentBlock.children) {
            contentBlock.children = contentBlock.children.map(replaceImagePath);
        }

        return contentBlock
    }

    blogData.content = blogData.content.map(replaceImagePath);
    return {
        props: {
            ...blogData,
            news: news,
            recentBlogs: recentBlogs
        }
    }
}