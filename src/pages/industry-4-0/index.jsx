import { Container } from "react-bootstrap";
import RootLayout from "../../components/layout/layout";
import { CacheHeaders } from "@/utils/definitions";
import { getDataFromPath, getHeaderFooterData, getNewsletterData } from "../../utils/api_calls";
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

export default function Industry4PointO({ data, news, headerFooter }) {
    return (<RootLayout data={headerFooter}>
        <YellowHero hero={data.hero} hero_imgs={data.heroimages} />
        <YellowResourcesBlock data={data.resourceblock} />
        <div className="my-5"></div>
        <PartnersSection heading={data.partner_title} data={data.partners} />
        <UpcomingEvents data={data.events.events.data.map(each => each.attributes)} meta={data.events} />
        <YellowSchemes data={data.finance_schemes} header={data.scheme_header} cta={data.scheme_cta} />
        <Testimonials data={data.testimonials} title={data.testimonial_title} subtitle={data.testimonial_subtitle} />
        <RecentBlogsGrid blogs={data.blogs} />
        <Newsletterform data={news} />
    </RootLayout>)
}

export async function getServerSideProps(context) {

    // add cache headers
    context.res.setHeader('Cache-Control', CacheHeaders);

    const path = "industry-4-0?&populate=deep";
    const language = context.locale;
    const data = await getDataFromPath(path, language);
    // const investmentProviders = await getAllInvestmentProviders(language);
    // const testimonial_data = await getDataFromPath("msefc-testimonial?&populate=deep", language);
    const news = await getNewsletterData(language);
    return {

        props: {
            news: news,
            // investmentProviders: investmentProviders,
            data: data.data.attributes,
            headerFooter: await getHeaderFooterData(language)
            // testimonials: testimonial_data.data.attributes.testimonials,
            // resources: testimonial_data.data.attributes.resources
        }
    }
};