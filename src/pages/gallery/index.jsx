import GalleryGrid from "../../components/gallerygrid";
import GalleryHero from "../../components/galleryhero";
import RootLayout from "../../components/layout/layout";
import Newsletterform from "../../components/newsletterform";
import { getDataFromPath, getHeaderFooterData, getNewsletterData } from "../../utils/api_calls";
import { CacheHeaders } from "../../utils/definitions";

export default function Gallery({ data, headerFooter, news }) {
    console.log(data)
    return (
        <RootLayout seo={data.seo} data={headerFooter}>
            <GalleryHero heading={data.heading} banner={data.banner} />
            <GalleryGrid items={data.categories} />
            
            <Newsletterform data={news} />
        </RootLayout>)
}

export async function getServerSideProps(context) {
    context.res.setHeader('Cache-Control', CacheHeaders);

    const path = "gallery?&populate=deep";
    const language = context.locale;
    const data = await getDataFromPath(path, language);
    const news = await getNewsletterData(language);
    return {

        props: {
            news: news,
            data: data.data.attributes,
            // councils: councils,
            headerFooter: await getHeaderFooterData(language)
        }
    }
}