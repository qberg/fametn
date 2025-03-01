import RootLayout from "../../components/layout/layout"
import MidHero from "../../components/midhero";
import TendersComponent from "../../components/tenders";
import { getDataFromPath, getHeaderFooterData, getNewsletterData } from "../../utils/api_calls";
import { CacheHeaders } from "../../utils/definitions";
import { getAllTenders } from "../../utils/tenders";
import YellowResourcesBlock from "@/components/yellowresourcesblock";
import styles from "./styles.module.css"
import NewsBox from "../../components/newsbox";
import YellowSchemes from "../../components/yellow_schemes";
import UpcomingEvents from "../../components/upcoming_events";
import RecentBlogsGrid from "../../components/recentblogsgrid";
import Newsletterform from "../../components/newsletterform";


export default function Tenders({ data, headerFooter, allTenders, news }) {
    return (
        <RootLayout seo={data.seo} data={headerFooter}>
            <MidHero data={data.hero} />
            <TendersComponent heading={data.section_2} data={allTenders} />
            <YellowResourcesBlock data={data.resources} />
            <NewsBox data={data.newsbox} />
            <YellowSchemes data={data.finance_schemes} header={data.schemes_header} cta={data.schemes_cta} />
            <UpcomingEvents data={data.events.events.data.map(each => each.attributes)} meta={data.events} />
            <RecentBlogsGrid blogs={data.blogs} />
            <Newsletterform data={news} />
        </RootLayout>
    )
}

export async function getServerSideProps(context) {
    // add cache headers
    context.res.setHeader('Cache-Control', CacheHeaders);

    const language = context.locale;
    const path = "tenders?&populate=deep";
    const data = await getDataFromPath(path, language);



    return {

        props: {
            data: data.data.attributes,
            headerFooter: await getHeaderFooterData(language),
            allTenders: await getAllTenders(language),
            news: await getNewsletterData(language)
        }
    }
}