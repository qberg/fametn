import { GetServerSideProps } from 'next';
import React from 'react';
import { getData } from "@/utils/api_calls";
import { CacheHeaders, JSONData } from "../utils/definitions";
import TemplateComponent1 from '../templates/templatecomponent1';
import TemplateComponent2 from '../templates/templatecomponent2';


const ComponentMap: { [key: string]: React.FC<{ data: JSON }> } = {
  'ui-components.template-component': TemplateComponent1,
  'ui-components.template-component2': TemplateComponent2,
}

const DynamicPage: React.FC<{ componentName: string; data: any }> = ({ componentName, data }) => {
  const Component = ComponentMap[componentName] || (() => <div></div>);
  
  console.log(`Rendering component: ${componentName}`);
  console.log('Data:', data);

  return (
    <div>
      <Component data={data} />
    </div>
  );
};

export async function getServerSideProps(context: JSONData) {
  context.res.setHeader('Cache-Control', CacheHeaders);

  const path = "all-pages?filters[link]=sample_page_1&populate=deep";
  const url = "https://" + process.env.API_ENDPOINT + path;

  const language = context.locale;
  const data = await getData(url, language);

  console.log('API Response:', JSON.stringify(data, null, 2)); 

  try {
    if (!data || !data.data || data.data.length === 0) {
      return { notFound: true };
    }

    const result = data.data[0];
    const templateType = result.attributes.page_data[0]?.__component || 'unknown-component';

    return {
      props: {
        componentName: templateType,
        data: result.attributes.page_data[0] || {},
      },
    };
  } catch (error) {
    console.error('Error fetching page data:', error);
    return { redirect: { destination: '/404', permanent: false } };
  }
};

export default DynamicPage;
