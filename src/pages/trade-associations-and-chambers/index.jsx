import RootLayout from "../../components/layout/layout"
import MidHero from "../../components/midhero";
import { getDataFromPath, getHeaderFooterData, getNewsletterData } from "../../utils/api_calls";
import { CacheHeaders } from "../../utils/definitions";
import YellowResourcesBlock from "@/components/yellowresourcesblock";
import NewsBox from "../../components/newsbox";
import YellowSchemes from "../../components/yellow_schemes";
import UpcomingEvents from "../../components/upcoming_events";
import RecentBlogsGrid from "../../components/recentblogsgrid";
import Newsletterform from "../../components/newsletterform";
import { getAllTradeAssociations } from "../../utils/tradeassociations";
import TradersComponent from "../../components/traders";

export default function TradeAss({ data, headerFooter, allAss, news }) {
    return (
        <RootLayout seo={data.seo} data={headerFooter}>
            <MidHero data={data.hero} />
            <TradersComponent heading={data.section_2} data={allAss} />
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
    const path = "tradeasc?&populate=deep";
    const data = await getDataFromPath(path, language);



    return {

        props: {
            data: data.data.attributes,
            headerFooter: await getHeaderFooterData(language),
            allAss: await getAllTradeAssociations(language),
            news: await getNewsletterData(language)
        }
    }
}