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
import { getAllPackers } from "../../utils/packers";
import Packers from "../../components/packers";

export default function BrandingAndPackaging({ news, data, packers, headerFooter }) {
    return (
        <RootLayout seo={data.seo} data={headerFooter}>
            <Breadcrumps items={data.breadcrumps} />
            <YellowBlobHero hero={data.hero} hero_imgs={data.hero_imgs} />
            <PartnersSection heading={data.partners_title} data={data.partners} />
            <ThreeChannel data={data.threechannel} />
            <BrandingGallery data={data.section_3} download={data.section_3_download} images={data.section_3_images} />
            <Packers data={packers} title={data.sectin_4_title} />
            <UpcomingEvents data={data.events.events.data.map(each => each.attributes)} meta={data.events} />
            <RecentBlogsGrid blogs={data.blogs} />
            <Testimonials data={data.testimonials} title={data.testimonial_title.heading} subtitle={data.testimonial_title.description} />
            <MiniResources data={data.resources} />
            <FaqComponent data={data.faq} />
            <Newsletterform data={news} />
        </RootLayout>
    )
}

export async function getServerSideProps(context) {
    context.res.setHeader('Cache-Control', CacheHeaders);

    const path = "branding-and-packaging?&populate=deep";
    const language = context.locale;
    const data = await getDataFromPath(path, language);
    const news = await getNewsletterData(language);
    const packers = await getAllPackers(language);

    return {
        props: {
            news: news,
            packers: packers,
            data: data.data.attributes,
            headerFooter: await getHeaderFooterData(language)
        }
    }
}