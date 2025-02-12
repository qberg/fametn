import { Container } from "react-bootstrap";
import RootLayout from "../../components/layout/layout";
import { CacheHeaders } from "@/utils/definitions";
import { getDataFromPath, getHeaderFooterData, getNewsletterData } from "../../utils/api_calls";
import styles from "./expos.module.css"
import Breadcrumps from "../../components/breadcrumps";
import YellowBlobHero from "@/components/yellowblobhero";
import PartnersSection from "@/components/partners";
import ThreeChannel from "@/components/threechannel";
import { getAllExpos, getAllExpoCities, getAllExpoCountries, getAllExpoSectors } from "../../utils/expos";
import ExpoBlock from "../../components/expoblock";
import UpcomingEvents from "../../components/upcoming_events";
import RecentBlogsGrid from "../../components/recentblogsgrid";
import Testimonials from "../../components/testimonials";
import MiniResources from "../../components/miniresources";
import FaqComponent from "../../components/faqcomponent";
import Newsletterform from "../../components/newsletterform";

export default function ExposAndExhibitions({ data, expo, news, headerFooter }) {
    return (
        <RootLayout seo={data.seo} data={headerFooter}>
            <Breadcrumps items={data.breadcrumps} />
            <YellowBlobHero hero={data.hero} hero_imgs={data.heroimage} />
            <PartnersSection heading={data.partners_title} data={data.partners} />
            <ThreeChannel data={data.three_channel} />
            <ExpoBlock title={data.expo_title} description={data.expo_description} message={data.expo_message} expos={expo} />
            <UpcomingEvents data={data.events.events.data.map(each => each.attributes)} meta={data.events} />
            <RecentBlogsGrid blogs={data.blogs} />
            <Testimonials data={data.testimonials} title={data.testimonial_title} subtitle={data.testimonial_subtitle} />
            <MiniResources data={data.resources} />
            <FaqComponent data={data.faq} />
            <Newsletterform data={news} />
        </RootLayout>
    )
}

export async function getServerSideProps(context) {
    context.res.setHeader('Cache-Control', CacheHeaders);

    const path = "expos-and-exhibition?&populate=deep";
    const language = context.locale;
    const data = await getDataFromPath(path, language);
    const news = await getNewsletterData(language);

    const allExpos = await getAllExpos(language);
    const allExpoCountries = await getAllExpoCountries(language);
    const allExpoCities = await getAllExpoCities(language);
    const allExpoSectors = await getAllExpoSectors(language);

    return {

        props: {
            news: news,
            data: data.data.attributes,
            expo: {
                allExpos: allExpos,
                allExpoCountries: allExpoCountries,
                allExpoCities: allExpoCities,
                allExpoSectors: allExpoSectors
            },
            headerFooter: await getHeaderFooterData(language)
        }
    }
}