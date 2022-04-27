import * as prismicNext from "@prismicio/next";

export default async function handler(req, res) {
  prismicNext.exitPreview({ res, req });
}

// const url = require('url')

// export default async function exit(req, res) {
//   res.clearPreviewData()

//   const queryObject = url.parse(req.url, true).query
//   const redirectUrl = queryObject && queryObject.currentUrl ? queryObject.currentUrl : '/'

//   res.writeHead(307, { Location: redirectUrl })
//   res.end()
// }