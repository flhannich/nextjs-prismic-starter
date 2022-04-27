
import { AppContext } from 'context/AppContext';
import { useContext, useEffect } from 'react';
import { createClient, manageLocal } from "prismicio";
import { Layout, PostList, PageTitle} from "@components/index";
import SliceZone from "next-slicezone";

export default function Home({doc, menu, config, lang, preview, posts}) {

  const { configRef } = useContext(AppContext);  
    
  useEffect(() => {
    configRef.current = config;
  },[]);

  return (
    
    <Layout
        altLangs={doc.alternate_languages}
        lang={lang}
        isPreview={preview.isActive}
        menu={menu}
      >

          <PageTitle data={doc} />

          <PostList data={posts} />

          <SliceZone sliceZone={doc.data.body} />

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

  const doc = await client.getSingle('home', ref ? { ref, lang: locale } : { lang: locale }) || {};
  const menu = await client.getSingle('menu', ref ? { ref, lang: locale } : { lang: locale }) || {};
  const config = await client.getSingle('config', ref ? { ref, lang: locale } : { lang: locale }) || {};

  const posts = await client.getAllByType("post", {
    fetch : ['post.title', 'post.image'],
    lang: locale,
    orderings: [
      { field: "my.post.publishDate", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });

  return {
    props: {
      doc,
      menu,
      config,
      posts,
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