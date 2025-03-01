import RootLayout from "../../components/layout/layout";
import Newsletterform from "../../components/newsletterform";
import TeamsGrid from "../../components/teamsgrid";
import TeamsHero from "../../components/teamshero";
import { getDataFromPath, getHeaderFooterData, getNewsletterData } from "../../utils/api_calls";
import { CacheHeaders } from "../../utils/definitions";
import { getAllTeams } from "../../utils/teams";

export default function Teams({ data, allTeams, headerFooter, news }) {
    console.log(data)
    return (
        <RootLayout seo={data.seo} data={headerFooter}>
            <TeamsHero data={data} />
            <TeamsGrid data={allTeams} />
            <Newsletterform data={news} />
        </RootLayout>)
}

export async function getServerSideProps(context) {
    context.res.setHeader('Cache-Control', CacheHeaders);

    const language = context.locale;
    const path = "teams-page?&populate=deep";
    const data = await getDataFromPath(path, language);
    const news = await getNewsletterData(language);
    return {

        props: {
            news: news,
            data: data.data.attributes,
            headerFooter: await getHeaderFooterData(language),
            allTeams: await getAllTeams(language)
        }
    }
}