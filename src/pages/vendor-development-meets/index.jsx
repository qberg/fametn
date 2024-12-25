import RootLayout from "../../components/layout/layout"
import { getDataFromPath } from "../../utils/api_calls";
import { CacheHeaders } from "../../utils/definitions";
import Breadcrumps from "../../components/breadcrumps";
import YellowBlobHero from "@/components/yellowblobhero";
import PartnersSection from "@/components/partners";
import ThreeChannel from "@/components/threechannel";
import YellowFancyContainer from "@/components/yellowfancycontainer";
import RegistrationForm from "@/components/registrationform";

import styles from "./vendor.module.css"
import { getUpComingNEvents, parseMetaAndData } from "../../utils/events";
import UpcomingEvents from "../../components/upcoming_events";



export default function VendorDevelopmentMeets({data, metaEvents, upcomingEvents}) {
    return (
       <RootLayout>
            <Breadcrumps items={data.breadcrumps}/>
            <YellowBlobHero hero={data.hero} hero_imgs={data.hero_images} />
            <PartnersSection heading={data.section_2_heading} data={data.partners} />
            <ThreeChannel data={data.section_3_cards} />
            <YellowFancyContainer>
                <RegistrationForm data={data.section_4}/>
            </YellowFancyContainer>
            <UpcomingEvents data={upcomingEvents} meta={metaEvents} />
       </RootLayout> 
    )
}

export async function getServerSideProps(context) {

    // add cache headers
    context.res.setHeader('Cache-Control', CacheHeaders);

    const path = "vendordevelopmentmeets?&populate=deep";
    const language = context.locale;
    const data = await getDataFromPath(path, language);
    
    const {metaEvents, upcomingEvents} = parseMetaAndData(data.data.attributes.events)


    // const metaEvents = await getDataFromPath("events-meta", language)
    // const upcomingEvents = await getUpComingNEvents(language)
    
    return {

        props: {
            metaEvents: metaEvents,
            upcomingEvents: upcomingEvents,
            data: data.data.attributes
        }
    }
};