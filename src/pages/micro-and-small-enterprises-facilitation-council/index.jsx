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

export default function MSEFC({ data, news, testimonials, testimonial_title, testimonial_subtitle, resources }) {
    return (
        <RootLayout>
            <Breadcrumps items={data.bread_crumps} />
            <YellowBlobHero hero={data.hero} hero_imgs={data.hero_img} />
            <PartnersSection heading={data.partners_title} data={data.partners} />
            <InfraBlock data={data.infrastructures} title={data.section_3_title} description={data.section_3_description} />
            <ThreeChannel data={data.threechannel} />
            <UpcomingEvents data={data.events.events.data.map(each => each.attributes)} meta={data.events} />
            <RecentBlogsGrid blogs={data.blogs} />
            <Testimonials data={testimonials} title={testimonial_title} subtitle={testimonial_subtitle} />
            <MiniResources data={resources} />
            <FaqComponent data={data.faq} />
            <Newsletterform data={news} />
        </RootLayout>
    )
}

export async function getServerSideProps(context) {

    // add cache headers
    context.res.setHeader('Cache-Control', CacheHeaders);

    const path = "micro-and-small-enterprises-facilitation-council?&populate=deep";
    const language = context.locale;
    const data = await getDataFromPath(path, language);
    const testimonial_data = await getDataFromPath("msefc-testimonial?&populate=deep", language);
    const news = await getNewsletterData(language);
    return {

        props: {
            news: news,
            data: data.data.attributes,
            testimonials: testimonial_data.data.attributes.testimonials,
            resources: testimonial_data.data.attributes.resources,
            testimonial_title: testimonial_data.data.attributes.testimonial_title,
            testimonial_subtitle: testimonial_data.data.attributes.testimonial_subtitle

        }
    }
};