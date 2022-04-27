import { createClient, manageLocal, linkResolver } from "prismicio";
import * as prismicH from "@prismicio/helpers";
import { Layout, PageTitle } from '@components/index';
import SliceZone from "next-slicezone";
import { AppContext } from 'context/AppContext';
import { useContext, useEffect } from 'react';

const Post = ({ doc, menu, contacts, lang, preview }) => {
   
  const { contactsRef } = useContext(AppContext);

  useEffect(() => {
    contactsRef.current = contacts;
  },[]);

    return (
      <Layout
        altLangs={doc.alternate_languages}
        lang={lang}
        isPreview={preview.isActive}
        menu={menu}
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

  const doc = await client.getByUID('post', params.uid, ref ? { ref, lang: locale } : { lang: locale }) || {};
  const menu = await client.getSingle('menu', ref ? { ref, lang: locale } : { lang: locale }) || {};
  const contacts = await client.getSingle('contacts', ref ? { ref, lang: locale } : { lang: locale }) || {};

  return {
    props: {
      doc,
      menu,
      contacts,
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

  const documents = await client.getAllByType("post");

  return {
    paths: documents.map((page) => prismicH.asLink(page, linkResolver)),
    fallback: false,
  };
}