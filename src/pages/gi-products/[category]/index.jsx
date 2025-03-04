import { getDataFromPath, getHeaderFooterData } from "../../../utils/api_calls";
import { CacheHeaders } from "../../../utils/definitions";

import RootLayout from "@/components/layout/layout";
import GICategoryHero from "@/components/ui/gi-category-hero";

export default function CategoryPage({ category, headerFooter }) {
  // TODO: handle seo more elegantly
  const seoData = category?.seo || {
    seo_title: `${category.name || "Category"} - GI Products`,
    seo_description: `Explore ${category?.name || ""} geographical indication products from Tamil Nadu.`,
    seo_thumbnail: category.category_image,
  };

  const products = category.gi_products.data || [];

  return (
    <RootLayout seo={seoData} data={headerFooter}>
      <GICategoryHero
        name={category.name}
        title={category.title}
        description={category.description}
        categoryImage={category.category_image}
      />
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const categorySlug = context.params.category;
  const language = context.locale;

  // Category data
  const categoryPath = `gi-products-categories?filters[slug][$eq]=${categorySlug}&populate=*`;
  const categoryResponse = await getDataFromPath(categoryPath, language);
  const category = categoryResponse.data[0].attributes;

  // header + footer
  const headerFooter = await getHeaderFooterData(language);

  return {
    props: {
      category: category,
      headerFooter: headerFooter,
    },
  };
}
