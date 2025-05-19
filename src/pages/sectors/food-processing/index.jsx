import RootLayout from "@/components/layout/layout";
import Highlights from "@/components/ui/highlights";
import NewsBox from "@/components/newsbox";
import RecentBlogsGrid from "@/components/recentblogsgrid";
import { getDataFromPath, getHeaderFooterData } from "../../../utils/api_calls";
import { CacheHeaders } from "../../../utils/definitions";
import MinimalEvents from "../../../components/ui/minimal-events";
import MinimalResourcesBlock from "../../../components/ui/minimal-resources-block";
import MinimalSchemesBlock from "../../../components/ui/minimal-schemes-block";
import NavigableHero from "../../../components/navigable-hero";
import StatsBlock from "../../../components/ui/stats-block";
import MinimalCarousel from "../../../components/ui/minimal-carousel";

export default function FoodProcessing({ data, headerFooter }) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      <NavigableHero {...data.hero} breadcrumps={data.breadcrumps} />
      <StatsBlock {...data.statsBlock} />
      <MinimalCarousel {...data.whyTamilNadu} />

      <MinimalEvents
        events={data.events.events.data.map((each) => each.attributes)}
        title={data.events.title_2}
        description={data.events.description_2}
      />

      <MinimalSchemesBlock
        header={data.schemesHeader}
        cta={data.schemesCta}
        schemes={data.finance_schemes}
      />
      <MinimalResourcesBlock {...data.resourcesBlock} />
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const path = "sectors-food?&populate=deep";
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
