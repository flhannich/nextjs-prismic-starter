import Prismic from '@prismicio/client'
import Link from 'next/link'

import {
  apiEndpoint,
  accessToken,
  linkResolver,
  routeResolver
} from '../prismicConfiguration'

// Helper function to convert Prismic Rich Text links to Next/Link components
// export const customLink = (type, element, content, children, index) => (
//   <Link
//     key={index}
//     href={linkResolver(element.data)}
//   >
//     <a>{content}</a>
//   </Link>
// )

// -- @prismicio/client initialisation
// Initialises the Prismic Client that's used for querying the API and passes it any query options.
export const Client = (req = null) => (
  Prismic.client(apiEndpoint, createClientOptions(req, accessToken, routeResolver))
);

// Options to be passed to the Client
const createClientOptions = (req = null, prismicAccessToken = null, routes = null) => {
  const reqOption = req ? { req } : {}
  const accessTokenOption = prismicAccessToken ? { accessToken: prismicAccessToken } : {}
  const routesOption = routes ? { routes: routeResolver.routes } : {}
  return {
    ...reqOption,
    ...accessTokenOption,
    ...routesOption,
  }
}

export default Client


export const manageLocal = (Locales, locale) => {
  // Languages from API response
  // // Setting Master language as default language option
  const mainLanguage = Locales[0];
  // // Sets current language based on the locale
  const currentLang = locale !== undefined ? locale : mainLanguage;
  const isMyMainLanguage = mainLanguage === currentLang;

  return { mainLanguage, currentLang, isMyMainLanguage }
}

