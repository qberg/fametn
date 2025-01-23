import { Container } from "react-bootstrap";
import RootLayout from "../../components/layout/layout";
import { CacheHeaders } from "@/utils/definitions";
import { getDataFromPath, getNewsletterData } from "../../utils/api_calls";
import Breadcrumps from "../../components/breadcrumps";
import YellowBlobHero from "@/components/yellowblobhero";
import PartnersSection from "@/components/partners";
import EmarketsImageGallery from "../../components/emarketsImageGallery";
import ThreeChannel from "@/components/threechannel";
import UpcomingEvents from "../../components/upcoming_events";
import RecentBlogsGrid from "../../components/recentblogsgrid";
import Testimonials from "../../components/testimonials";
import MiniResources from "../../components/miniresources";
import FaqComponent from "../../components/faqcomponent";
import Newsletterform from "../../components/newsletterform";
import YellowHero from "../../components/yellowhero";
import EnergyCard from "../../components/energycard";
import { getAllAuditors } from "../../utils/auditors";
import Auditors from "../../components/auditors";
import YellowSchemes from "../../components/yellow_schemes";
import YellowResourcesBlock from "../../components/yellowresourcesblock";
import Gallery from "../../components/gallery";

export default function EnergyEfficiency({ data, auditors, news }) {
    return (
        <RootLayout>
            <YellowHero hero={data.hero} hero_imgs={data.hero_imgs} />
            <UpcomingEvents data={data.events.events.data.map(each => each.attributes)} meta={data.events} />
            <EnergyCard data={data.section_2} />
            <Auditors data={auditors} />
            <YellowSchemes data={data.finance_schemes} header={data.schemes_header} cta={data.schemes_cta} />
            <YellowResourcesBlock data={data.resourcesblock} />
            <div className="my-5"></div>
            <PartnersSection heading={data.partner_title} data={data.partners} />
            <Gallery data={data.gallery} />
            <RecentBlogsGrid blogs={data.blogs} />
            <Newsletterform data={news} />
        </RootLayout>
    );
}

export async function getServerSideProps(context) {
    context.res.setHeader('Cache-Control', CacheHeaders);

    const path = "energy-efficiency?&populate=deep";
    const language = context.locale;
    const data = await getDataFromPath(path, language);
    const auditors = await getAllAuditors(language);
    const news = await getNewsletterData(language);

    return {

        props: {
            news: news,
            auditors: auditors,
            data: data.data.attributes
        }
    }
}