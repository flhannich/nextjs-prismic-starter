import { createClient, manageLocal, linkResolver } from "prismicio";
import * as prismicH from "@prismicio/helpers";
import { Layout, PageTitle } from '@components/index';
import SliceZone from "next-slicezone";

const Post = ({ doc, menu, config, lang, preview, subscribe_form }) => {
   

  
    return (
      <Layout
        altLangs={doc.alternate_languages}
        lang={lang}
        isPreview={preview.isActive}
        menu={menu}
        subscribe_form={subscribe_form.data}
        config={config}
      >

        <PageTitle data={doc} />

        <SliceZone sliceZone={doc.data.body} />
        
      </Layout>
    );
  
};

export default Post;


export async function getStaticProps({
  params,
  preview, 
  previewData,
  locale,
  locales,
}) {
  const ref = previewData ? previewData.ref : null
  const isPreview = preview || false
  const client = createClient({ previewData });

  const { currentLang, isMyMainLanguage } = manageLocal(locales, locale)

  const doc = await client.getByUID('legal', params.uid, ref ? { ref, lang: locale } : { lang: locale }) || {};
  const menu = await client.getSingle('menu', ref ? { ref, lang: locale } : { lang: locale }) || {};
  const config = await client.getSingle('config', ref ? { ref, lang: locale } : { lang: locale }) || {};
  const subscribe_form = await client.getSingle('subscribe_form', ref ? { ref, lang: locale } : { lang: locale }) || {};

  return {
    props: {
      doc,
      menu,
      config,
      subscribe_form,
      preview: {
        isActive: isPreview,
        activeRef: ref,
      },
      lang:{
        currentLang,
        isMyMainLanguage,
        locales
      }
    },
  };
}


export async function getStaticPaths() {
  const client = createClient();

  const documents = await client.getAllByType("legal");

  return {
    paths: documents.map((page) => prismicH.asLink(page, linkResolver)),
    // paths: documents.map((doc) => {
    //   return { params: { uid: doc.uid }, locale: doc.lang };
    // }),
    fallback: false,
  };
}