import RootLayout from "../../components/layout/layout"
import MidHero from "../../components/midhero";
import TendersComponent from "../../components/tenders";
import { getDataFromPath, getHeaderFooterData, getNewsletterData } from "../../utils/api_calls";
import { CacheHeaders } from "../../utils/definitions";
import { getAllTenders } from "../../utils/tenders";
import YellowResourcesBlock from "@/components/yellowresourcesblock";
// import styles from "./styles.module.css"
import NewsBox from "../../components/newsbox";
import YellowSchemes from "../../components/yellow_schemes";
import UpcomingEvents from "../../components/upcoming_events";
import RecentBlogsGrid from "../../components/recentblogsgrid";
import Newsletterform from "../../components/newsletterform";
import AwardsBanner from "../../components/awardsbanner";
import AwardsSection from "../../components/awardssection";
import { getAllStateAwards } from "../../utils/stateawards";
import StateAwards, { OtherAwards } from "../../components/stateawards";
import { getAllOtherAwards } from "../../utils/otherawards";
import GalleryGrid from "../../components/gallerygrid";
import { Container } from "react-bootstrap";
import Bluepill from "../../components/bluepill";
import { useRouter } from "next/router";
import YellowArrowButton from "../../components/yellow_arrow_button";
import AboutUsHero from "../../components/aboutushero";
import AboutUsSection2 from "../../components/aboutussection2";
import AboutUsItems from "../../components/aboutusitems";
import MiniTeam from "../../components/miniteam";

export default function AboutUs({ data, headerFooter, news}) {
    return (
        <RootLayout seo={data.seo} data={headerFooter}>
            <AboutUsHero data={data.hero} />
            <AboutUsSection2 heading={data.section_2_heading} data={data.section_2_items} />
            <AboutUsItems heading={data.section_4_heading} items={data.section_4_items} />
            <MiniTeam heading={data.section_5_heading} teams={data.teams} />
            <Newsletterform data={news} />
        </RootLayout>)
}


export async function getServerSideProps(context) {
    context.res.setHeader('Cache-Control', CacheHeaders);

    const path = "aboutus?&populate=deep";
    const language = context.locale;
    const data = await getDataFromPath(path, language);
    const news = await getNewsletterData(language);

    return {

        props: {
            data: data.data.attributes,
            headerFooter: await getHeaderFooterData(language),
            news: news
        }
    }
}