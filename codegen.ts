import { CodegenConfig } from '@graphql-codegen/cli'

import 'dotenv/config'

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL,
  documents: ['app/**/*.ts*', 'components/**/*.ts*', 'lib/**/*.ts*', 'src/**/*.ts*'],
  generates: {
    './__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
