import RootLayout from "../../components/layout/layout";
import { getDataFromPath, getHeaderFooterData } from "../../utils/api_calls";
import { CacheHeaders } from "../../utils/definitions";

import YellowBlobHero from "@/components/yellowblobhero";
import Multiheading from "@/components/multiheading";
import Breadcrumps from "@/components/breadcrumps";

export default function Finance({ data, headerFooter }) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      <Breadcrumps items={data.breadcrumps} />
      <YellowBlobHero hero={data.hero} hero_imgs={data.heroimage} />
      <Multiheading heading={data.offeringsHeading} cards={data.offerings} />
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const path = "finance?&populate=deep";
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
