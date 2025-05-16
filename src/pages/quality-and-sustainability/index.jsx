import RootLayout from "../../components/layout/layout";
import ContentHero from "../../components/ui/content-hero";
import ExportPagesCards from "../../components/ui/export-pages-cards";
import { getDataFromPath, getHeaderFooterData } from "../../utils/api_calls";
import { CacheHeaders } from "../../utils/definitions";

export default function Exports({ data, headerFooter }) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      <ContentHero {...data.hero} breadcrumps={data.breadcrumps} />

      {data.pagesCards && <ExportPagesCards data={data.pagesCards} />}
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const path = "quality-sus?&populate=deep";
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
