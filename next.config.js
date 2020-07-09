require('dotenv').config();
const {locales} = require("./src/utils/translation/config");

module.exports = {
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  },
  experimental: {
    redirects() {
      return [
        {
          source: "/:lang/",
          destination: "/:lang",
          permanent: true
        }
      ];
    },
    rewrites() {
      return [
        {
          source: "/",
          destination: "/api/detectLanguage"
        },
        {
          source: `/:lang((?!${locales.join("|")})[^/]+)(.*)`,
          destination: "/api/detectLanguage"
        }
      ];
    }
  },
  webpack(config) {
    config.resolve.modules.push(__dirname)
    return {
      ...config,
      node: {
        ...config.node,
        fs: 'empty',
        child_process: 'empty',
        net: 'empty',
        tls: 'empty',
      }
    };
  },
  target: 'serverless',
};
