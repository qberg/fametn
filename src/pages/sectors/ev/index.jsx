import RootLayout from "@/components/layout/layout";
import HeroWithStats from "@/components/ui/hero-with-stats";
import Highlights from "@/components/ui/highlights";
import NewsBox from "@/components/newsbox";
import RecentBlogsGrid from "@/components/recentblogsgrid";
import { getDataFromPath, getHeaderFooterData } from "../../../utils/api_calls";
import { CacheHeaders } from "../../../utils/definitions";
import ContentWithCarousel from "@/components/ui/contentwithcarousel";
import MinimalEvents from "../../../components/ui/minimal-events";
import MinimalResourcesBlock from "../../../components/ui/minimal-resources-block";
import MinimalSchemesBlock from "../../../components/ui/minimal-schemes-block";

export default function Exports({ data, headerFooter }) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      {data.hero && <HeroWithStats {...data.hero} />}
      {data.highlights && <Highlights {...data.highlights} />}
      {data.evtf_section && <ContentWithCarousel {...data.evtf_section} />}
      <NewsBox data={data.newsbox} />
      <MinimalSchemesBlock
        schemes={data.finance_schemes}
        header={data.schemes_header}
        cta={data.schemes_cta}
      />
      <MinimalEvents
        data={data.events.events.data.map((each) => each.attributes)}
        title={data.events.title_2}
        description={data.events.description_2}
      />
      <RecentBlogsGrid blogs={data.blogs} />
      <MinimalResourcesBlock {...data.resources} />
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const path = "ev?&populate=deep";
  const language = context.locale;
  const data = await getDataFromPath(path, language);
  const headerFooter = await getHeaderFooterData(language);

  return {
    props: {
      data: data.data.attributes,
      headerFooter: headerFooter,
    },
  };
}
