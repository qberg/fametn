import RootLayout from "@/components/layout/layout";
import HeroWithStats from "@/components/ui/hero-with-stats";
import Highlights from "@/components/ui/highlights";
import YellowResourcesBlock from "@/components/yellowresourcesblock";
import NewsBox from "@/components/newsbox";
import YellowSchemes from "@/components/yellow_schemes";
import UpcomingEvents from "@/components/upcoming_events";
import RecentBlogsGrid from "@/components/recentblogsgrid";
import Newsletterform from "@/components/newsletterform";
import {
  getDataFromPath,
  getHeaderFooterData,
  getNewsletterData,
} from "../../../utils/api_calls";
import { CacheHeaders } from "../../../utils/definitions";
import ContentWithCarousel from "@/components/ui/contentwithcarousel";

export default function Exports({ data, headerFooter, news }) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      {data.hero && <HeroWithStats {...data.hero} />}
      {data.highlights && <Highlights {...data.highlights} />}
      {data.evtf_section && <ContentWithCarousel {...data.evtf_section} />}
      <YellowResourcesBlock data={data.resources} />
      <NewsBox data={data.newsbox} />
      <YellowSchemes
        data={data.finance_schemes}
        header={data.schemes_header}
        cta={data.schemes_cta}
      />
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

  const path = "ev?&populate=deep";
  const language = context.locale;
  const data = await getDataFromPath(path, language);
  const headerFooter = await getHeaderFooterData(language);
  const news = await getNewsletterData(language);

  return {
    props: {
      data: data.data.attributes,
      headerFooter: headerFooter,
      news: news,
    },
  };
}
