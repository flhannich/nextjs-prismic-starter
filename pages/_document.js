import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {

  render() {

    return (
      <Html lang="de">
        <Head>
          <meta charSet="utf-8" />
          <script async defer src={`https://static.cdn.prismic.io/prismic.js?new=true&repo=${process.env.PRISMIC_REPOSITORY_NAME}`}></script>
        </Head>
        <body data-darkmode={false}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}