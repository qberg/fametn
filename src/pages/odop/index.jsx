import InvestmentForm from "../../components/investent_form";
import RootLayout from "../../components/layout/layout"
import MidHero from "../../components/midhero";
import NewsBox from "../../components/newsbox";
import OdopGrid from "../../components/odopgrid";
import OdopMap from "../../components/odopmap";
import OdopSection2 from "../../components/odopsection_2";
import RecentBlogsGrid from "../../components/recentblogsgrid";
import YellowResourcesBlock from "../../components/yellowresourcesblock";
import { getDataFromPath, getHeaderFooterData } from "../../utils/api_calls";
import { CacheHeaders } from "../../utils/definitions";


export default function Odop({ data, headerFooter }) {
    return (
        <RootLayout seo={data.seo} data={headerFooter}>
            <MidHero data={data.hero} />
            <OdopSection2 data={data.section_2} />
            <OdopGrid heading={data.section_3_heading} items={data.section_3_items} />
            <OdopMap heading={data.section_4_heading} items={data.section_4_items} />
            <YellowResourcesBlock data={data.resources} />
            <RecentBlogsGrid blogs={data.blogs} />
            <NewsBox data={data.newsbox} />
            <InvestmentForm title={data.form_title} supertitle={data.form_supertitle} image={data.form_img} />
        </RootLayout>
    )
}

export async function getServerSideProps(context) {
    context.res.setHeader('Cache-Control', CacheHeaders);

    const path = "odop?&populate=deep";
    const language = context.locale;
    const data = await getDataFromPath(path, language);
    return {
        props: {
            data: data.data.attributes,
            headerFooter: await getHeaderFooterData(language)
        }
    }
}