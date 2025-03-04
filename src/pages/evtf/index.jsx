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
import { EvLayout } from "../../components/layout/layout";
import { getDataFromPath, getEvHeaderFooterData } from "../../utils/api_calls";
import { CacheHeaders } from "../../utils/definitions";

export default function Evtf({data, headerFooter}) {
    console.log(data)
    return (
        <EvLayout seo={data.seo} data={headerFooter}>
            <EvHero
                heading_1={data.hero_heading_1}
                heading_2={data.hero_heading_2}
                heading_3={data.hero_heading_3}
                subhero={data.subhero}
                img={data.heroimg}
            />
            <EvSection2
                heading={data.section_2_heading}
                items={data.section_2_items}
            />
            <EvAbout data={data.about} />
            <EvTeam heading={data.section_3_heading} item={data.section_3_item} />
            <EvPartner data={data.section_4} />
            <EvServices heading={data.section_5_heading} items={data.section_5_items} />
            <EvEvents heading={data.events_heading} items={data.events_items} />
            <EvCollabs heading={data.partners_heading} items={data.partners_items} />
            <EvContact heading={data.contact_heading} items={data.contact_items} />
            <EvTestimony heading={data.testimonials_heading} items={data.testimonials_item} />
            <EvResources heading={data.resources_heading} items={data.resources_items} />
            <EvNews data={data.news} />
            <EvGallery heading={data.gallery_items} items={data.evgallery} />
            <EvBlogs heading={data.blogs_heading} items={data.blogs} />
        </EvLayout>
    )
}

export async function getServerSideProps(context) {

    // add cache headers
    context.res.setHeader('Cache-Control', CacheHeaders);

    const path = "evtf?&populate=deep";
    const language = context.locale;
    const data = await getDataFromPath(path, language);
    return {
        props: {
            headerFooter: await getEvHeaderFooterData(language),
            data: data.data.attributes,
        }
    }
};