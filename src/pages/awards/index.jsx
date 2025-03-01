import RootLayout from "../../components/layout/layout"
import MidHero from "../../components/midhero";
import TendersComponent from "../../components/tenders";
import { getDataFromPath, getHeaderFooterData, getNewsletterData } from "../../utils/api_calls";
import { CacheHeaders } from "../../utils/definitions";
import { getAllTenders } from "../../utils/tenders";
import YellowResourcesBlock from "@/components/yellowresourcesblock";
// import styles from "./styles.module.css"
import NewsBox from "../../components/newsbox";
import YellowSchemes from "../../components/yellow_schemes";
import UpcomingEvents from "../../components/upcoming_events";
import RecentBlogsGrid from "../../components/recentblogsgrid";
import Newsletterform from "../../components/newsletterform";
import AwardsBanner from "../../components/awardsbanner";
import AwardsSection from "../../components/awardssection";
import { getAllStateAwards } from "../../utils/stateawards";
import StateAwards, { OtherAwards } from "../../components/stateawards";
import { getAllOtherAwards } from "../../utils/otherawards";
import GalleryGrid from "../../components/gallerygrid";
import { Container } from "react-bootstrap";
import Bluepill from "../../components/bluepill";
import { useRouter } from "next/router";
import YellowArrowButton from "../../components/yellow_arrow_button";

function GalleryHeader() {
    const strings = {
        heading: {
            en: "Gallery",
            ta: "காட்சியகம்"
        }
    }

    const { locale } = useRouter();
    return (<Container className="mt-5 pt-4">
        <Bluepill text={strings.heading[locale]} />
        <hr></hr>
    </Container>)
}

function GalleryFooter() {
    const strings = {
        more: {
            en: "View More",
            ta: "மேலும் காண்க"
        }
    }

    const { locale } = useRouter();

    return (<Container className="my-5">
        <center>
            <YellowArrowButton text={strings.more[locale]} link="/gallery" />
        </center>
    </Container>)
}

export default function Awards({ data, headerFooter, stateAwards, otherAwards, galleryData }) {
    return (
        <RootLayout seo={data.seo} data={headerFooter}>
            <MidHero data={data.hero} />
            <AwardsBanner heading={data.section_2_title} items={data.section_2_items} />
            <AwardsSection data={data.section_3} />
            <StateAwards data={stateAwards} heading={data.state_awards} />
            <OtherAwards data={otherAwards} heading={data.other_awards} />
            <GalleryHeader />
            <GalleryGrid items={galleryData} />
            <GalleryFooter />
        </RootLayout>)
}

export async function getServerSideProps(context) {
    context.res.setHeader('Cache-Control', CacheHeaders);

    const path = "awards?&populate=deep";
    const language = context.locale;
    const data = await getDataFromPath(path, language);
    const galleryData = (await getDataFromPath("gallery?&populate=deep", language)).data.attributes;

    const galleryItems = galleryData.categories.map(each => {
        return {
            title: each.title,
            images: {
                data: each.images.data.slice(0, 10)
            }
        }
    })

    return {

        props: {
            data: data.data.attributes,
            stateAwards: await getAllStateAwards(language),
            otherAwards: await getAllOtherAwards(language),
            headerFooter: await getHeaderFooterData(language),
            galleryData: galleryItems
        }
    }
}