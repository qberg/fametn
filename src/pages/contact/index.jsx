import RootLayout from "../../components/layout/layout";
import ContactHero from "../../components/ui/contact-hero";
import { getDataFromPath, getHeaderFooterData } from "../../utils/api_calls";
import { CacheHeaders } from "../../utils/definitions";

export default function Contact({ data, headerFooter }) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      <ContactHero {...data.hero} />
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const path = "contact?&populate=deep";
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
