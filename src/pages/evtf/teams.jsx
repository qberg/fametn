import EvAbout from "../../components/evtf/evabout";
import EvBlogs from "../../components/evtf/evblogs";
import EvCollabs from "../../components/evtf/evcollabs";
import EvContact from "../../components/evtf/evcontact";
import EvEvents from "../../components/evtf/evevents";
import EvGallery from "../../components/evtf/evgallery";
import EvNews from "../../components/evtf/evnews";
import EvPartner from "../../components/evtf/evpartner";
import EvResources from "../../components/evtf/evresources";
import EvSection2 from "../../components/evtf/evsection2";
import EvServices from "../../components/evtf/evservices";
import EvTeam from "../../components/evtf/evteam";
import EvTestimony from "../../components/evtf/evtestimony";
import EvHero from "../../components/evtf/hero";
import EvTeamHero from "../../components/evtf/teamhero";
import EvOthers from "../../components/evtf/teamothers";
import { EvLayout } from "../../components/layout/layout";
import { getDataFromPath, getEvHeaderFooterData } from "../../utils/api_calls";
import { CacheHeaders } from "../../utils/definitions";

export default function Evtf({data, headerFooter}) {
    return (
        <EvLayout seo={data.seo} data={headerFooter}>
            <EvTeamHero 
                hero={data.hero} 
                mainperson={data.main_person}
                x={data.main_person_x}
                linkedin={data.main_person_linkedin} />
            <EvOthers items={data.others} />
        </EvLayout>
    )
}


export async function getServerSideProps(context) {

    // add cache headers
    context.res.setHeader('Cache-Control', CacheHeaders);

    const path = "evtf-team?&populate=deep";
    const language = context.locale;
    const data = await getDataFromPath(path, language);
    return {
        props: {
            headerFooter: await getEvHeaderFooterData(language),
            data: data.data.attributes,
        }
    }
};