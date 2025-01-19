import { Container } from "react-bootstrap";
import RootLayout from "../../components/layout/layout";
import Breadcrumps from "@/components/breadcrumps";
import YellowBlobHero from "@/components/yellowblobhero";
import PartnersSection from "@/components/partners";
import ThreeChannel from "@/components/threechannel";
import YellowFancyContainer from "@/components/yellowfancycontainer";
import RegistrationForm from "@/components/registrationform";
import HorizCardSection from "@/components/horizcardsection";

export default function Template2({ data }) {
    return (
        <RootLayout>
            <Breadcrumps items={data.breadcrumps} />
            <YellowBlobHero hero={data.hero} hero_imgs={data.hero_images} />
            <PartnersSection heading={data.section_2_title} data={data.partners} />
            <ThreeChannel data={data.section_3_cards} />
            <YellowFancyContainer>
                <RegistrationForm data={data.section_4}/>
            </YellowFancyContainer>
            <HorizCardSection title={data.section_5_title} cards={data.section_5_cards} />
        </RootLayout>
    )
}