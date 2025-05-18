import RootLayout from "@/components/layout/layout";
import HeroWithStats from "@/components/ui/hero-with-stats";
import Highlights from "@/components/ui/highlights";
import NewsBox from "@/components/newsbox";
import RecentBlogsGrid from "@/components/recentblogsgrid";
import { getDataFromPath, getHeaderFooterData } from "../../../utils/api_calls";
import { CacheHeaders } from "../../../utils/definitions";
import MinimalEvents from "../../../components/ui/minimal-events";
import MinimalResourcesBlock from "../../../components/ui/minimal-resources-block";
import MinimalSchemesBlock from "../../../components/ui/minimal-schemes-block";
import NavigableHero from "../../../components/navigable-hero";

export default function FoodProcessing({ data, headerFooter }) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      <NavigableHero {...data.hero} breadcrumps={data.breadcrumps} />

      <div style={{ height: "100vh" }} />
      <section id="why-tamilnadu" className="margin">
        Tamilnadu is here
      </section>
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
