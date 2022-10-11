import { createClient, manageLocal } from "prismicio";
import SliceZone from "next-slicezone";
import { Layout , PageTitle} from "@components/index";
import * as Slices from "@slices/index";
import { AppContext } from 'context/AppContext';
import { useContext, useEffect } from 'react';

const resolver = ({ sliceName }) => Slices[sliceName];

export default function Contact({doc, menu, config, lang, preview, subscribe_form, contact_form}) {

  const {  configRef } = useContext(AppContext);

  useEffect(() => {
    configRef.current = config;
  },[]);
  
  return (
    
    <Layout
        altLangs={doc.alternate_languages}
        lang={lang}
        isPreview={preview.isActive}
        menu={menu}
        subscribe_form={subscribe_form}
      >

        <PageTitle data={doc} />
        
        <article>
          <SliceZone 
            slices={doc.data.slices} 
            resolver={resolver} 
            sliceProps={contact_form} 
          />
        </article>

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
  const config = await client.getSingle('config', ref ? { ref, lang: locale } : { lang: locale }) || {};
  const contact_form = await client.getSingle('contact_form', ref ? { ref, lang: locale } : { lang: locale }) || {};
  const subscribe_form = await client.getSingle('contact_form', ref ? { ref, lang: locale } : { lang: locale }) || {};

  return {
    props: {
      doc,
      menu,
      config,
      contact_form,
      subscribe_form,
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