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





export default function InvestmentPromotion({ data, investmentProviders }) {
    return (<RootLayout>
        <InvestmentHero
            title={data.hero_title}
            description={data.hero_description}
            cta_link_prim={data.cta_link_prim}
            cta_text_prim={data.cta_text_prim}
            cta_link_sec={data.cta_link_sec}
            cta_text_sec={data.cta_text_sec}
            cards={data.hero_cards}
        />
        <InvestmentContent data={data} />
        <YellowResourcesBlock data={data.resourcesblock} />
        <YellowSchemes data={data.finance_schemes} header={data.section_4_heading} cta={data.section_4_cta} />
        <Testimonials data={data.testimonials} title={data.testimonial_title} subtitle={data.testimonial_subtitle} />
        <RecentBlogsGrid blogs={data.blogs} />
        <InvestmentProviders data={investmentProviders} title={data.table_title} supertitle={data.table_supertitle}/>
        <InvestmentForm title={data.form_title} supertitle={data.form_supertitle} image={data.form_image} />
    </RootLayout>)
}

export async function getServerSideProps(context) {

    // add cache headers
    context.res.setHeader('Cache-Control', CacheHeaders);

    const path = "investment-promotion?&populate=deep";
    const language = context.locale;
    const data = await getDataFromPath(path, language);
    const investmentProviders = await getAllInvestmentProviders(language);
    // const testimonial_data = await getDataFromPath("msefc-testimonial?&populate=deep", language);
    // const news = await getNewsletterData(language);
    return {

        props: {
            // news: news,
            investmentProviders: investmentProviders,
            data: data.data.attributes,
            // testimonials: testimonial_data.data.attributes.testimonials,
            // resources: testimonial_data.data.attributes.resources
        }
    }
};