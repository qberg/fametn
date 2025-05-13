import Flathero from "../../components/flathero";
import RootLayout from "../../components/layout/layout";
import { CacheHeaders } from "../../utils/definitions";
import {
  getDataFromPath,
  getHeaderFooterData,
  getNewsletterData,
} from "../../utils/api_calls";
import Minihero from "../../components/minihero";
import Multiheading from "../../components/multiheading";
import Newsletterform from "../../components/newsletterform";
import HeroWithStats from "../../components/ui/hero-with-stats";

export default function Markets({ data, news, headerFooter }) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      <HeroWithStats {...data.hero} breadcrumps={data.breadcrumps} />
      <Minihero data={data.minihero} />
      <Multiheading
        heading={data.section_3_heading}
        cards={data.section_3_cards}
      />
      <Newsletterform data={news} />
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  // add cache headers
  context.res.setHeader("Cache-Control", CacheHeaders);

  const path = "markets?&populate=deep";
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

