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
import FancyHero from "../../components/fancy_hero";
import FatImage from "../../components/fatimage";
import OndcBlock from "../../components/ondc_block";
import OndcTriCard from "../../components/ondctricard";
import OndcYellowBlock from "../../components/ondcyellowblock";
import OndcThreeChannel from "../../components/ondcthreechannel";

export default function Ondc({ data, news }) {
    console.log(data)
    return (
        <RootLayout>
            <Breadcrumps items={data.breadcrumps} />
            <FancyHero hero={data.hero} />
            <FatImage src={data.big_img} />
            <OndcBlock card={data.section_3} images={data.section_3_images} />
            <OndcTriCard header={data.section_4_heading} cards={data.section_4_cards} />
            <UpcomingEvents data={data.events.events.data.map(each => each.attributes)} meta={data.events} />
            <OndcYellowBlock header={data.section_5_header} items={data.section_5_cards} />
            <OndcThreeChannel header={data.section_6_header} items={data.section_6_items} />
        </RootLayout>
    )
}

export async function getServerSideProps(context) {
    // add cache headers
    context.res.setHeader('Cache-Control', CacheHeaders);
    const language = context.locale;
    const path = "ondc?&populate=deep";
    const data = await getDataFromPath(path, language);
    return {

        props: {
            // news: news,
            data: data.data.attributes,
            // testimonials: testimonial_data.data.attributes.testimonials,
            // resources: testimonial_data.data.attributes.resources
        }
    }
}