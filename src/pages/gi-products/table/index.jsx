import GIProductsTable from "../../../components/ui/gi-products-table";
import { getDataFromPath, getHeaderFooterData } from "../../../utils/api_calls";
import { CacheHeaders } from "../../../utils/definitions";

import GalleryHero from "@/components/galleryhero";
import RootLayout from "@/components/layout/layout";

export default function GIProductsTablePage({
  data,
  products,
  categories,
  pagination,
  activeFilters,
  headerFooter,
}) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      <GalleryHero heading={data.heading} banner={data.banner} />
      <GIProductsTable
        products={products}
        categories={categories}
        pagination={pagination}
        activeFilters={activeFilters}
      />
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const language = context.locale;
  const page = parseInt(context.query.page || "1", 10);
  const pageSize = 10;
  const cateogoryFilter = context.query.category || "";
  const searchQuery = context.query.search || "";

  const path = "gi-products-table?&populate=deep";
  const data = await getDataFromPath(path, language);

  // filter query
  let filterQuery = "";
  if (cateogoryFilter) {
    filterQuery += `&filters[gi_products_category][slug][$eq]=${cateogoryFilter}`;
  }

  if (searchQuery) {
    filterQuery += `&filters[$or][0][name][$containsi]=${searchQuery}`;
    filterQuery += `&filters[$or][1][location][$containsi]=${searchQuery}`;
  }

  const productsPath = `gi-products?populate[gi_products_category]=*${filterQuery}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=name:asc`;
  const productsResponse = await getDataFromPath(productsPath, language);

  const categoriesPath = `gi-products-categories?sort=name:asc`;
  const categoriesResponse = await getDataFromPath(categoriesPath);

  const pagination = productsResponse.meta?.pagination;

  const headerFooter = await getHeaderFooterData(language);

  return {
    props: {
      data: data.data.attributes,
      products: productsResponse.data || [],
      categories: categoriesResponse.data || [],
      pagination: pagination,
      activeFilters: {
        category: cateogoryFilter,
        search: searchQuery,
        page,
      },
      headerFooter: headerFooter,
    },
  };
}
