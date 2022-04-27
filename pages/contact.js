import { createClient, manageLocal } from "prismicio";
import SliceZone from "next-slicezone";
import { Layout , PageTitle} from "@components/index";
import * as Slices from "@slices/index";
import { AppContext } from 'context/AppContext';
import { useContext, useEffect } from 'react';

const resolver = ({ sliceName }) => Slices[sliceName];

export default function Contact({doc, menu, contacts, lang, preview}) {

  const {  contactsRef } = useContext(AppContext);

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
        
        <SliceZone slices={doc.data.slices} resolver={resolver} />

    </Layout>
  )
}

export async function getStaticProps({ 
  preview, 
  previewData,
  locale,
  locales,
}) {

  const ref = previewData ? previewData.ref : null
  const isPreview = preview || false
  const client = createClient({ previewData });

  const { currentLang, isMyMainLanguage } = manageLocal(locales, locale)

  const doc = await client.getSingle('contact', ref ? { ref, lang: locale } : { lang: locale }) || {};
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
      lang: {
        currentLang,
        isMyMainLanguage,
        locales
      }
    }
  }
} 