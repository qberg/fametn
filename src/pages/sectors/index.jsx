import { CacheHeaders } from "@/utils/definitions";
import RootLayout from "../../components/layout/layout";

import {
  getDataFromPath,
  getHeaderFooterData,
  getNewsletterData,
} from "../../utils/api_calls";
import Newsletterform from "../../components/newsletterform";
import Breadcrumps from "../../components/breadcrumps";
import SectorsHero from "../../components/sectorshero";
import SectorsList from "../../components/ui/sectors-list";

export default function Sectors({ news, data, headerFooter }) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      {data.breadcrumps && <Breadcrumps items={data.breadcrumps} />}
      {data.hero && <SectorsHero hero={data.hero} hero_img={data.hero_image} />}
      {data.sector_cards && <SectorsList sectors={data.sector_cards} />}
      <Newsletterform data={news} />
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const path = "sectors?&populate=deep";
  const language = context.locale;
  const data = await getDataFromPath(path, language);
  const news = await getNewsletterData(language);
  const headerFooter = await getHeaderFooterData(language);

  return {
    props: {
      news: news,
      data: data.data.attributes,
      headerFooter: headerFooter,
    },
  };
}
