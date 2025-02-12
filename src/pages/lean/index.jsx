import RootLayout from "../../components/layout/layout";
import { CacheHeaders } from "@/utils/definitions";
import { getDataFromPath, getHeaderFooterData, getNewsletterData } from "../../utils/api_calls";
import Breadcrumps from "../../components/breadcrumps";
import YellowBlobHero from "@/components/yellowblobhero";
import PartnersSection from "@/components/partners";
import ThreeChannel from "@/components/threechannel";
import UpcomingEvents from "../../components/upcoming_events";
import RecentBlogsGrid from "../../components/recentblogsgrid";
import Testimonials from "../../components/testimonials";
import MiniResources from "../../components/miniresources";
import FaqComponent from "../../components/faqcomponent";
import Newsletterform from "../../components/newsletterform";
import BrandingGallery from "../../components/branding_gallery";
import { getAllPromoters } from "../../utils/export_promoters";
import Packers from "../../components/packers";
import ExportBlock from "../../components/export_block";
import InfraBlock from "../../components/infra_block";
import InvestmentHero from "../../components/investment_hero";
import InvestmentContent from "../../components/investment_content";
import YellowResourcesBlock from "../../components/yellowresourcesblock";
import YellowSchemes from "../../components/yellow_schemes";
import { getAllInvestmentProviders } from "../../utils/investment_providers";
import InvestmentProviders from "../../components/investment_providers";
import InvestmentForm from "../../components/investent_form";
import TestingLabHero from "../../components/testinglabhero";
import TestingLabGallery from "../../components/testinglab_gallery";
import { getAllTestingLabs } from "../../utils/testinglabs";
import TestinglabsTable from "../../components/testinglabstable";
import LeanHero from "../../components/leanhero";
import LeanBlock from "../../components/leanblock";
import LeanSubHero from "../../components/leansubhero";
import LeanDiet from "../../components/leandiet";
import Gallery from "../../components/gallery";


export default function Lean({ data, headerFooter }) {
    return (
        <RootLayout seo={data.seo} data={headerFooter}>
            <LeanHero hero={data.hero} hero_imgs={data.hero_images} />
            <LeanSubHero data={data.section_2} />
            <LeanBlock data={data.leanblock} />
            <LeanDiet header={data.sectin_4_header} data={data.section_4_items} />
            <UpcomingEvents data={data.events.events.data.map(each => each.attributes)} meta={data.events} />
            <YellowResourcesBlock data={data.resourceblock} />
            <Gallery data={data.gallery} />
            <Testimonials data={data.testimonials} title={data.testimonial_title} subtitle={data.testimonial_subtitle} />
        </RootLayout>)
}

export async function getServerSideProps(context) {

    // add cache headers
    context.res.setHeader('Cache-Control', CacheHeaders);

    const path = "lean?&populate=deep";
    const language = context.locale;
    const data = await getDataFromPath(path, language);
    // const news = await getNewsletterData(language);

    return {
        props: {
            // news: news,
            data: data.data.attributes,
            headerFooter: await getHeaderFooterData(language)
        }
    }
};