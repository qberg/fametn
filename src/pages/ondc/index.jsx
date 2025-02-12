import RootLayout from "../../components/layout/layout";
import { CacheHeaders } from "@/utils/definitions";
import { getDataFromPath, getHeaderFooterData, getNewsletterData } from "../../utils/api_calls";
import Breadcrumps from "../../components/breadcrumps";

import UpcomingEvents from "../../components/upcoming_events";

import FancyHero from "../../components/fancy_hero";
import FatImage from "../../components/fatimage";
import OndcBlock from "../../components/ondc_block";
import OndcTriCard from "../../components/ondctricard";
import OndcYellowBlock from "../../components/ondcyellowblock";
import OndcThreeChannel from "../../components/ondcthreechannel";

export default function Ondc({ data, headerFooter }) {
    return (
        <RootLayout seo={data.seo} data={headerFooter}>
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
            headerFooter: await getHeaderFooterData(language)
            // testimonials: testimonial_data.data.attributes.testimonials,
            // resources: testimonial_data.data.attributes.resources
        }
    }
}