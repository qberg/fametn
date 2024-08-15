import { JSONData } from "@/utils/definitions";
import Head from "next/head";

interface SeoProps {
    data: {
        seo_title?: string;
        seo_description?: string;
        seo_thumbnail?: {
            data?: JSONData
        };
    };
}

export default function Seo({ data }: SeoProps) {
    const image_path = process.env.NEXT_PUBLIC_IMG_ENDPOINT + (data?.seo_thumbnail?.data?.attributes?.formats?.thumbnail || data?.seo_thumbnail?.data?.attributes?.formats?.small)?.url;

    return (
        <Head>
            <title>{data?.seo_title}</title>
            <meta name="description" content={data?.seo_description}></meta>
            <meta property="og:title" content={data?.seo_title}></meta>
            <meta property="og:description" content={data?.seo_description}></meta>
            <meta property="og:type" content="website"></meta>
            <meta property="og:image" content={image_path}></meta>
            <meta name="twitter:title" content={data?.seo_title}></meta>
            <meta name="twitter:description" content={data?.seo_description}></meta>
            <meta name="twitter:image" content={image_path}></meta>
            <meta name="robots" content="index, follow"></meta>
        </Head>
    );
}
