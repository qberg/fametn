import RootLayout from "@/components/layout/layout";
import { CacheHeaders } from "@/utils/definitions";
import {
  getDataFromPath,
  getHeaderFooterData,
  getNewsletterData,
} from "@/utils/api_calls";
import PartnersSection from "@/components/partners";
import RecentBlogsGrid from "@/components/recentblogsgrid";
import Testimonials from "@/components/testimonials";
import Newsletterform from "@/components/newsletterform";
import { getAllTestingLabs } from "@/utils/testinglabs";
import TestinglabsTable from "@/components/testinglabstable";
import ContentHero from "@/components/ui/content-hero";

export default function TestingLabs({ data, testinglabs, news, headerFooter }) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      <ContentHero {...data.hero} breadcrumps={data.breadcrumps} />
      <PartnersSection heading={data.partners_title} data={data.partners} />
      <Testimonials
        data={data.testimonials}
        title={data.testimonial_title}
        subtitle={data.testimonial_subtitle}
      />
      <RecentBlogsGrid blogs={data.blogs} />
      <TestinglabsTable data={testinglabs} header={data.testinglabs} />
      <Newsletterform data={news} />
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const path = "testinglabs?&populate=deep";
  const language = context.locale;
  const data = await getDataFromPath(path, language);
  const news = await getNewsletterData(language);

  const testinglabs = await getAllTestingLabs(language);
  return {
    props: {
      testinglabs: testinglabs,
      news: news,
      headerFooter: await getHeaderFooterData(language),
      data: data.data.attributes,
    },
  };
}
