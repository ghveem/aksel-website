/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const withTM = require("next-transpile-modules")(["@navikt/ds-tokens"]);
const oldRedirects = require("./redirects.json");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
/* const { withSentryConfig } = require("@sentry/nextjs"); */

const hotjar = `http://*.hotjar.com https://*.hotjar.com http://*.hotjar.io https://*.hotjar.io`;
const ContentSecurityPolicy = `
  default-src 'self' 'unsafe-inline';
  font-src 'self' ${hotjar} data:;
  img-src 'self' ${hotjar} cdn.sanity.io data:;
  script-src 'self' 'unsafe-eval' ${hotjar};
  style-src 'self' 'unsafe-inline';
  report-uri https://sentry.gc.nav.no/api/113/envelope/?sentry_key=d35bd60e413c489ca0f2fd389b4e6e5e&sentry_version=7;
  connect-src 'self' ${hotjar} cdn.sanity.io *.api.sanity.io https://amplitude.nav.no https://sentry.gc.nav.no https://*.algolia.net https://*.algolianet.com;
  frame-ancestors localhost:3333 https://verktoykasse.sanity.studio/;
  media-src 'self' cdn.sanity.io;
  frame-src ${hotjar};
`;

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "no-referrer-when-downgrade",
  },
  {
    key: "Access-Control-Allow-Origin",
    value: "*",
  },
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
];

const config = () =>
  withBundleAnalyzer(
    withTM({
      serverRuntimeConfig: {
        // Will only be available on the server side
        azureAppClientId: process.env.AZURE_APP_CLIENT_ID,
        azureJwksUri: process.env.AZURE_OPENID_CONFIG_JWKS_URI,
        azureAppIssuer: process.env.AZURE_OPENID_CONFIG_ISSUER,
        azureAppWellKnownUrl: process.env.AZURE_APP_WELL_KNOWN_URL,
        azureAppJWK: process.env.AZURE_APP_JWK,
      },
      async headers() {
        return [
          {
            source: "/:path*",
            headers: securityHeaders,
          },
        ];
      },
      async redirects() {
        return [
          {
            source: "/studio",
            destination: "https://verktoykasse.sanity.studio",
            permanent: true,
          },
          {
            source: "/prinsipper",
            destination: "/",
            permanent: false,
          },
          {
            source: "/preview/:slug*",
            destination: "/api/preview?slug=:slug*",
            permanent: true,
          },
          ...Object.values(oldRedirects).reduce((old, value) => {
            return [
              ...old,
              ...value.sources.map((source) => ({
                source,
                destination: value.destitation,
                permanent: false,
              })),
            ];
          }, []),
        ];
      },

      webpack(config) {
        config.module.rules.push({
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        });

        return config;
      },
      images: {
        domains: ["cdn.sanity.io"],
        dangerouslyAllowSVG: true,
      },
      /* swcMinify: true,
      httpAgentOptions: {
        keepAlive: false,
      }, */
    })
  );

if (process.env.NODE_ENV === "production") {
  /* console.log("sentry is enabled");
  module.exports = withSentryConfig(config(), { silent: true }); */
  module.exports = config();
} else {
  module.exports = config();
}
