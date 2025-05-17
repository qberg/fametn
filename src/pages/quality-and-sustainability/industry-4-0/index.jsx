import RootLayout from "@/components/layout/layout";
import { CacheHeaders } from "@/utils/definitions";
import {
  getDataFromPath,
  getHeaderFooterData,
  getNewsletterData,
} from "@/utils/api_calls";
import PartnersSection from "@/components/partners";
import UpcomingEvents from "@/components/upcoming_events";
import RecentBlogsGrid from "@/components/recentblogsgrid";
import Newsletterform from "@/components/newsletterform";
import ContentHero from "../../../components/ui/content-hero";

export default function Industry4PointO({ data, news, headerFooter }) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      <ContentHero {...data.hero} breadcrumps={data.breadcrumps} />
      <PartnersSection heading={data.partner_title} data={data.partners} />
      <UpcomingEvents
        data={data.events.events.data.map((each) => each.attributes)}
        meta={data.events}
      />
      <RecentBlogsGrid blogs={data.blogs} />
      <Newsletterform data={news} />
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const path = "industry-4-0?&populate=deep";
  const language = context.locale;
  const data = await getDataFromPath(path, language);
  const news = await getNewsletterData(language);
  return {
    props: {
      news: news,
      data: data.data.attributes,
      headerFooter: await getHeaderFooterData(language),
    },
  };
}
