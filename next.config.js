/** @type {import('next').NextConfig} */

const nextConfig = {
  sass: true,
  modules: true,
  reactStrictMode: true,
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['de-de', 'en-us'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'de-de'
  },
  images: {
    domains: ['images.prismic.io'],
    formats: ['image/avif', 'image/webp']
  },
   webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    })
    return config
  },
};

module.exports = nextConfig;

