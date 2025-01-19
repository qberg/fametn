import styles from "./blogcard.module.css";
import DynamicImage from "../../components/dynamicImage";
import Image from "next/image";
import Link from "next/link";

const formatDate = (date) => {
    // convert date from "2024-12-24" to dd MMM YYYY
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function BlogCard({ data }) {
    const maxExcerptLength = 140;
    const truncatedExcerpt = data.excerpt.length > maxExcerptLength ? data.excerpt.slice(0, maxExcerptLength) + "..." : data.excerpt;

    // first tag is the main tag
    const mainTag = data.tags[0] && (<div className={styles.maintag}>
        {data.tags[0].text}
    </div>);

    // remaining tags
    const remainingTags = data.tags.slice(1).map((each, index) => {
        return (
            <div key={index} className={styles.tag}>
                {each.text}
            </div>
        )
    })

    return (
        <Link href={`/blogs/${data.url}`}>
            <div className={styles.blogcard}>
                <div className={styles.blogcardimg}>
                    <DynamicImage src={data.image} objectFit="cover" />
                </div>
                <div className="mt-3 small">
                    {data.author + " • " + formatDate(data.date)}
                </div>
                <div className={`${styles.titleblock} d-flex mt-1`}>
                    <div className="my-0 me-2">
                        <h6>
                            {data.title}
                        </h6>
                    </div>
                    <div className="ms-auto position-relative me-1">
                        <Image alt={`blog card image of ${data.title}`} src="/arrow_top_right.svg" height={12} width={12} />
                    </div>
                </div>
                <div className={`small mb-3 ${styles.paratext}`}>
                    {truncatedExcerpt}
                </div>
                <div className="mt-auto mb-0 d-flex flex-wrap smaller">
                    {mainTag} {remainingTags}
                </div>
            </div>
        </Link>)
}
