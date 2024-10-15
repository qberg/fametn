import { GetServerSideProps } from 'next';
import React from 'react';
import { getDataFromPath } from "@/utils/api_calls";
import { CacheHeaders, JSONData } from "../utils/definitions";
import TemplateComponent1 from '../templates/templatecomponent1';
import TemplateComponent2 from '../templates/templatecomponent2';
import Template2 from '../templates/template2';

const ComponentMap: { [key: string]: React.FC<{ data: JSON }> } = {
  'ui-components.template-component': TemplateComponent1,
  'ui-components.template-component2': TemplateComponent2,
  'templates.template2' : Template2
}

const DynamicPage: React.FC<{ componentName: string; data: any }> = ({ componentName, data }) => {
  const Component = ComponentMap[componentName] || (() => <div></div>);
  

  return (
    <div>
      <Component data={data} />
    </div>
  );
};

export async function getServerSideProps(context: JSONData) {

  // add cache headers
  context.res.setHeader('Cache-Control', CacheHeaders);

  // get the path from context and store in a variable
  const pathKeys = context.params?.template_pages || [];
  const pathKey = pathKeys.join('/');

  const path = "all-pages?filters[link]=" + pathKey + "&populate=deep";
  const language = context.locale;
  const data = await getDataFromPath(path, language);

  const redirectPayload = { redirect: { destination: '/404', permanent: false } };


  try {

    if (!data || !data.data || data.data.length === 0) {
      return redirectPayload;
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
    return redirectPayload;
  }
};

export default DynamicPage;
