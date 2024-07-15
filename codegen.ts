
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://devpim.tcs-apps.de/pimcore-graphql-webservices/outdoor?apikey=c179b60860474aa335a9d82c8c985f84",
  documents: ['./**/*.vue'],
  generates: {
    "./lib/": {
      preset: 'client',
      config: {
        useTypeImports: true
      }
    },
  }
};

export default config;
