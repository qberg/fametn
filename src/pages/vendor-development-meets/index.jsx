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

export default function VendorDevelopmentMeets({data}){
    return (
       <RootLayout>
            <Breadcrumps items={data.breadcrumps}/>
            <YellowBlobHero hero={data.hero} hero_imgs={data.hero_images} />
            <PartnersSection heading={data.section_2_heading} data={data.partners} />
            <ThreeChannel data={data.section_3_cards} />
            <YellowFancyContainer>
                <RegistrationForm data={data.section_4}/>
            </YellowFancyContainer>

       </RootLayout> 
    )
}

export async function getServerSideProps(context) {

    // add cache headers
    context.res.setHeader('Cache-Control', CacheHeaders);

    const path = "vendordevelopmentmeets?&populate=deep";
    const language = context.locale;
    const data = await getDataFromPath(path, language);
    
    // const news = await getNewsletterData(language);
    console.log(data.data.attributes)
    return {

        props: {
            data: data.data.attributes
        }
    }
};