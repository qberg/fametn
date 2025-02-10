import RootLayout from "../../components/layout/layout";
import { CacheHeaders } from "@/utils/definitions";
import { getDataFromPath, getNewsletterData } from "../../utils/api_calls";
import PartnersSection from "@/components/partners";
import RecentBlogsGrid from "../../components/recentblogsgrid";
import Testimonials from "../../components/testimonials";
import Newsletterform from "../../components/newsletterform";
import YellowResourcesBlock from "../../components/yellowresourcesblock";
import TestingLabHero from "../../components/testinglabhero";
import TestingLabGallery from "../../components/testinglab_gallery";
import { getAllTestingLabs } from "../../utils/testinglabs";
import TestinglabsTable from "../../components/testinglabstable";


export default function TestingLabs({ data, testinglabs, news }) {
    return (<RootLayout>
        <TestingLabHero data={data.hero} />
        <div className="my-5"></div>
        <PartnersSection heading={data.partners_title} data={data.partners} />
        <div className="my-5"></div>
        <YellowResourcesBlock data={data.resourcesblock} />
        <TestingLabGallery header={data.gallery_heading} images={data.gallery_images} />
        <div className="my-5"></div>
        <Testimonials data={data.testimonials} title={data.testimonial_title} subtitle={data.testimonial_subtitle} />
        <RecentBlogsGrid blogs={data.blogs} />
        <TestinglabsTable data={testinglabs} header={data.testinglabs} />
        <Newsletterform data={news} />
    </RootLayout>)
}

export async function getServerSideProps(context) {

    // add cache headers
    context.res.setHeader('Cache-Control', CacheHeaders);

    const path = "testinglabs?&populate=deep";
    const language = context.locale;
    const data = await getDataFromPath(path, language);
    const news = await getNewsletterData(language);

    const testinglabs = await getAllTestingLabs(language);
    return {
        props: {
            testinglabs: testinglabs,
            news: news,
            data: data.data.attributes,
        }
    }
};