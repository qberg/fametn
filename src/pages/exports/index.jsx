import RootLayout from "../../components/layout/layout";
import ExportPagesCards from "../../components/ui/export-pages-cards";
import HeroWithStats from "../../components/ui/hero-with-stats";
import { getDataFromPath, getHeaderFooterData } from "../../utils/api_calls";
import { CacheHeaders } from "../../utils/definitions";

export default function Exports({ data, headerFooter }) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      {data.hero && <HeroWithStats {...data.hero} />}
      {data.export_pages_cards && (
        <ExportPagesCards data={data.export_pages_cards} />
      )}
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const path = "exports?&populate=deep";
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
