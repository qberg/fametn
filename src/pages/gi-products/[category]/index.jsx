import GIProductsGrid from "../../../components/ui/gi-products-grid";
import { getDataFromPath, getHeaderFooterData } from "../../../utils/api_calls";
import { CacheHeaders } from "../../../utils/definitions";

import RootLayout from "@/components/layout/layout";
import GICategoryHero from "@/components/ui/gi-category-hero";

export default function CategoryPage({ category, products, headerFooter }) {
  // TODO: handle seo more elegantly
  const seoData = category?.seo || {
    seo_title: `${category.name || "Category"} - GI Products`,
    seo_description: `Explore ${category?.name || ""} geographical indication products from Tamil Nadu.`,
    seo_thumbnail: category.category_image,
  };

  return (
    <RootLayout seo={seoData} data={headerFooter}>
      {category && (
        <GICategoryHero
          name={category.name}
          title={category.title}
          description={category.description}
          categoryImage={category.category_image}
        />
      )}
      {products && <GIProductsGrid products={products} />}
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const categorySlug = context.params.category;
  const language = context.locale;

  // Products Category data
  const categoryPath = `gi-products-categories?filters[slug][$eq]=${categorySlug}&populate[category_image]=*&populate[gi_products][populate][featured_image]=*`;
  const categoryResponse = await getDataFromPath(categoryPath, language);

  if (!categoryResponse.data || categoryResponse.data.length === 0) {
    return { notFound: true };
  }

  const categoryData = categoryResponse.data[0].attributes;
  const products = categoryData.gi_products?.data || [];

  const headerFooter = await getHeaderFooterData(language);

  return {
    props: {
      category: {
        name: categoryData.name,
        title: categoryData.title,
        description: categoryData.description,
        category_image: categoryData.category_image,
      },
      products: products,
      headerFooter: headerFooter,
    },
  };
}
