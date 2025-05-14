import RootLayout from "../../components/layout/layout";
import {
  getDataFromPath,
  getHeaderFooterData,
  getNewsletterData,
} from "../../utils/api_calls";
import { CacheHeaders } from "../../utils/definitions";
import Newsletterform from "../../components/newsletterform";
import AboutUsHero from "../../components/aboutushero";
import AboutUsSection2 from "../../components/aboutussection2";
import AboutUsItems from "../../components/aboutusitems";
import MiniTeam from "../../components/miniteam";
import Breadcrumps from "@/components/breadcrumps";

export default function AboutUs({ data, headerFooter, news }) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      <Breadcrumps items={data.breadcrumps} />
      <AboutUsHero data={data.hero} />
      <AboutUsSection2
        heading={data.section_2_heading}
        data={data.section_2_items}
      />
      <AboutUsItems
        heading={data.section_4_heading}
        items={data.section_4_items}
      />
      <MiniTeam heading={data.section_5_heading} teams={data.teams} />
      <Newsletterform data={news} />
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const path = "aboutus?&populate=deep";
  const language = context.locale;
  const data = await getDataFromPath(path, language);
  const news = await getNewsletterData(language);

  return {
    props: {
      data: data.data.attributes,
      headerFooter: await getHeaderFooterData(language),
      news: news,
    },
  };
}
