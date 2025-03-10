import { getDataFromPath, getHeaderFooterData } from "../../../utils/api_calls";
import RootLayout from "@/components/layout/layout";
import { CacheHeaders } from "../../../utils/definitions";
import HeroWithCard from "../../../components/ui/hero-with-card";
import ExportsGlobalNetwork from "../../../components/ui/exports-global-network";
import NewsBox from "../../../components/newsbox";
import YellowResourcesBlock from "@/components/yellowresourcesblock";
import UpcomingEvents from "@/components/upcoming_events";

export default function Countries({ data, headerFooter }) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      <HeroWithCard {...data.hero} />
      <ExportsGlobalNetwork {...data.global_network} />
      {data.newsbox && <NewsBox data={data.newsbox} />}
      {data.resources && <YellowResourcesBlock data={data.resources} />}
      {data.events && (
        <UpcomingEvents
          data={data.events.events.data.map((each) => each.attributes)}
          meta={data.events}
        />
      )}
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const path = "countries-page?&populate=deep";
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
