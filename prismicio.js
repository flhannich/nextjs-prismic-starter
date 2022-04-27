import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import * as prismicNext from "@prismicio/next";

import sm from "./sm.json";


/**
 * The project's Prismic repository name.
 */
export const repositoryName = prismic.getRepositoryName(sm.apiEndpoint);

/**
 * The project's Prismic Link Resolver. This function determines the URL for a given Prismic document.
 *
 * @type {prismicH.LinkResolverFunction}
 */
 export const linkResolver = (doc) => {
  if(doc.lang === 'de-de') {
    if (doc.type === 'home') {
      return `/`
    }
    if (doc.type === 'contact') {
      return `/contact`
    }
    if (doc.type === 'post') {
      return `/posts/${doc.uid}`
    }
    if (doc.type === 'legal') {
      return `/legals/${doc.uid}`
    }
    return '/'
  }
  else {
      if (doc.type === 'home') {
        return `/${doc.lang}`
      }
      if (doc.type === 'contact') {
        return `/${doc.lang}/contact`
      }
      if (doc.type === 'post') {
        return `/${doc.lang}/posts/${doc.uid}`
      }
      if (doc.type === 'legal') {
        return `/${doc.lang}/legals/${doc.uid}`
      }
      return '/'
   }
}


/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - A configuration object to
 */
export const createClient = (config = {}) => {

  const accessToken = process.env.PRISMIC_ACCESS_TOKEN
  const client = prismic.createClient(sm.apiEndpoint, { accessToken });

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};



export const manageLocal = (Locales, locale) => {
  // Languages from API response
  // // Setting Master language as default language option
  const mainLanguage = Locales[0];
  // // Sets current language based on the locale
  const currentLang = locale !== undefined ? locale : mainLanguage;
  const isMyMainLanguage = mainLanguage === currentLang;

  return { mainLanguage, currentLang, isMyMainLanguage }
}


// export const getCaseAPI = async slug => {
//   try {
//     const API = await Prismic.api(PRISMIC_API_URL);
//     // we pass up the slug to request the correct post
//     const response = await API.query(
//       Prismic.Predicates.at('my.blog_post.uid', slug)
//     );
//     return response.results[0];
//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// };