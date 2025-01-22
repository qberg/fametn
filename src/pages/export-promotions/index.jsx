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

export default function ExportPromotions({ data, news, promoters }) {
    return (
        <RootLayout>
            <Breadcrumps items={data.breadcrumps} />
            <YellowBlobHero hero={data.hero} hero_imgs={data.heroimg} />
            <PartnersSection heading={data.partners_title} data={data.partners} />
            <ThreeChannel data={data.threechannel} />
            <ExportBlock data={promoters} header={data.section_3} />
            <UpcomingEvents data={data.events.events.data.map(each => each.attributes)} meta={data.events} />
            <RecentBlogsGrid blogs={data.blogs} />
            <Testimonials data={data.testimonials} title={data.testimonial_title} subtitle={data.testimonial_subtitle} />
            <MiniResources data={data.resources} />
            <FaqComponent data={data.faq} />
            <Newsletterform data={news} />
        </RootLayout>)
}

export async function getServerSideProps(context) {
    context.res.setHeader('Cache-Control', CacheHeaders);

    const path = "export-promotions?&populate=deep";
    const language = context.locale;
    const data = await getDataFromPath(path, language);
    const news = await getNewsletterData(language);
    const promoters = await getAllPromoters(language);
    return {
        props: {
            news: news,
            data: data.data.attributes,
            promoters: promoters
        }
    }
}