import RootLayout from "../../components/layout/layout";
import { CacheHeaders } from "@/utils/definitions";
import { getDataFromPath, getNewsletterData } from "../../utils/api_calls";
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


export default function TestingLabs({ data, testinglabs, news }) {
    console.log(data)
    return (<RootLayout>
        <TestingLabHero data={data.hero} />
        <div className="my-5"></div>
        <PartnersSection heading={data.partners_title} data={data.partners} />
        <div className="my-5"></div>
        <YellowResourcesBlock data={data.resourcesblock} />
        <TestingLabGallery header={data.gallery_heading} images={data.gallery_images} />
        <div className="my-5"></div>
        <Testimonials data={data.testimonials} title={data.testimonial_title} subtitle={data.testimonial_subtitle} />
        <RecentBlogsGrid blogs={data.blogs} />
        <TestinglabsTable data={testinglabs} header={data.testinglabs} />
        <Newsletterform data={news} />
    </RootLayout>)
}

export async function getServerSideProps(context) {

    // add cache headers
    context.res.setHeader('Cache-Control', CacheHeaders);

    const path = "testinglabs?&populate=deep";
    const language = context.locale;
    const data = await getDataFromPath(path, language);
    const news = await getNewsletterData(language);

    const testinglabs = await getAllTestingLabs(language);
    return {
        props: {
            testinglabs: testinglabs,
            news: news,
            data: data.data.attributes,
        }
    }
};