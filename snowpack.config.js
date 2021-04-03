// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    www: { url: '/', static: true },
    src: { url: '/' }
  },
  exclude: [
    /* https://www.snowpack.dev/reference/configuration#exclude */
  ],
  plugins: [
    '@snowpack/plugin-typescript'
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    "metaUrlPath": "snowpack"
  },
};
